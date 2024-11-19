import random
from flask import Flask, render_template, request, redirect, url_for, session
import sqlite3
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)
app.secret_key = '9e1e9fd3f46b490682bc28dc7e3a6f2d'

def get_db_connection():
    conn = sqlite3.connect('inventory.db')
    conn.row_factory = sqlite3.Row
    return conn

# Initialize the database
with get_db_connection() as conn:
    conn.execute('''CREATE TABLE IF NOT EXISTS inventory (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      item_name TEXT NOT NULL,
                      quantity INTEGER NOT NULL,
                      price REAL NOT NULL)''')
    conn.execute('''CREATE TABLE IF NOT EXISTS stock_taken (
                      id INTEGER PRIMARY KEY AUTOINCREMENT,
                      item_id INTEGER NOT NULL,
                      item_name TEXT NOT NULL,
                      quantity_taken INTEGER NOT NULL,
                      taken_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == 'admin' and password == 'admin':
            session['logged_in'] = True
            return redirect(url_for('inventory'))
        elif username == 'user' and password == 'user':
            session['logged_in_user'] = True
            return redirect(url_for('user_view'))
        else:
            return render_template('login.html', error="Invalid username or password.")
    return render_template('login.html')

@app.route('/user', methods=['GET'])
def user_view():
    if 'logged_in_user' in session:
        conn = get_db_connection()
        items = conn.execute('SELECT * FROM inventory').fetchall()
        stock_taken = conn.execute('SELECT * FROM stock_taken WHERE taken_at >= ?', 
                                   (datetime.now() - timedelta(days=30),)).fetchall()

        taken_quantities = [row['quantity_taken'] for row in stock_taken]
        dates = [row['taken_at'][:10] for row in stock_taken]

        # Convert dates to datetime objects for better plotting
        dates = [datetime.strptime(date, '%Y-%m-%d') for date in dates]

        # Generate the line plot
        plt.figure(figsize=(10, 5))
        plt.plot(dates, taken_quantities, color='blue', marker='o', linestyle='-', label='Quantity Taken')
        plt.title('Stock Taken (Last 30 Days)', fontsize=14)
        plt.xlabel('Date', fontsize=12)
        plt.ylabel('Quantity Taken', fontsize=12)
        plt.grid(True, linestyle='--', alpha=0.6)
        plt.xticks(rotation=45)
        plt.legend()

        # Set a background image for the plot
        img_background = plt.imread('background_image.jpg')  # Ensure this file exists
        plt.imshow(img_background, aspect='auto', extent=[min(dates), max(dates), 0, max(taken_quantities)],
                   alpha=0.2, zorder=0)

        # Save the graph to a BytesIO object
        img = io.BytesIO()
        plt.savefig(img, format='png', bbox_inches='tight')
        img.seek(0)
        graph_url = base64.b64encode(img.getvalue()).decode()

        conn.close()
        return render_template('user.html', items=items, graph_url=graph_url)
    else:
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    session.pop('logged_in_user', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
