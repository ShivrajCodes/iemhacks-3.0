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

@app.route('/inventory', methods=['GET', 'POST'])
def inventory():
    if 'logged_in' in session:
        conn = get_db_connection()
        if request.method == 'POST':
            if 'item_name' in request.form and 'quantity' in request.form and 'price' in request.form:
                item_name = request.form['item_name']
                quantity = int(request.form['quantity'])
                price = float(request.form['price'])
                conn.execute('INSERT INTO inventory (item_name, quantity, price) VALUES (?, ?, ?)', 
                             (item_name, quantity, price))
                conn.commit()
            elif 'item_id_taken' in request.form and 'quantity_taken' in request.form:
                item_id_taken = int(request.form['item_id_taken'])
                quantity_taken = int(request.form['quantity_taken'])
                conn.execute('UPDATE inventory SET quantity = quantity - ? WHERE id = ?', 
                             (quantity_taken, item_id_taken))
                item = conn.execute('SELECT item_name FROM inventory WHERE id = ?', (item_id_taken,)).fetchone()
                if item:
                    item_name = item['item_name']
                    conn.execute('INSERT INTO stock_taken (item_id, item_name, quantity_taken, taken_at) VALUES (?, ?, ?, ?)', 
                                 (item_id_taken, item_name, quantity_taken, datetime.now()))
                conn.commit()
            elif 'delete_item_id' in request.form:
                delete_item_id = int(request.form['delete_item_id'])
                conn.execute('DELETE FROM inventory WHERE id = ?', (delete_item_id,))
                conn.commit()
            elif 'delete_stock_taken_id' in request.form:
                delete_stock_taken_id = int(request.form['delete_stock_taken_id'])
                conn.execute('DELETE FROM stock_taken WHERE id = ?', (delete_stock_taken_id,))
                conn.commit()

        items = conn.execute('SELECT * FROM inventory').fetchall()
        stock_taken = conn.execute('SELECT * FROM stock_taken ORDER BY taken_at DESC').fetchall()
        total_quantity = sum([item['quantity'] for item in items])
        total_price = sum([item['quantity'] * item['price'] for item in items])
        conn.close()
        return render_template('inventory.html', items=items, total_quantity=total_quantity, total_price=total_price, stock_taken=stock_taken)
    else:
        return redirect(url_for('login'))

@app.route('/user', methods=['GET'])
def user_view():
    if 'logged_in_user' in session:
        conn = get_db_connection()
        items = conn.execute('SELECT * FROM inventory').fetchall()
        stock_taken = conn.execute('SELECT * FROM stock_taken WHERE taken_at >= ?', 
                                   (datetime.now() - timedelta(days=30),)).fetchall()

        taken_quantities = [row['quantity_taken'] for row in stock_taken]
        dates = [row['taken_at'][:10] for row in stock_taken]

        plt.figure(figsize=(10, 5))
        plt.bar(dates, taken_quantities, color='blue')
        plt.title('Taken Out vs In Stock (Last 30 Days)')
        plt.xlabel('Date')
        plt.ylabel('Quantity Taken')
        plt.xticks(rotation=45)

        img = io.BytesIO()
        plt.savefig(img, format='png')
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
