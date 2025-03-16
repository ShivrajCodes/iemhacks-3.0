import React, { useState } from 'react';
import styled from 'styled-components';
import { faker } from '@faker-js/faker';

const specialities = ['Cardiologist', 'Neurologist', 'Orthopedic', 'General Physician', 'Dentist', 'Pediatrician'];
const cities = ['Kolkata', 'Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Hyderabad'];

const malePlaceholderImage = '/male-placeholder.jpg';
const femalePlaceholderImage = '/female-placeholder.jpg';

const generateDoctors = () => {
  const doctors = [];

  specialities.forEach(speciality => {
    cities.forEach(city => {
      for (let i = 0; i < 5; i++) {
        const gender = faker.helpers.arrayElement(['male', 'female']);
        doctors.push({
          id: `${speciality}-${city}-${i}`,
          name: faker.person.fullName({ gender }),
          speciality,
          phone: faker.phone.number(),
          experience: faker.number.int({ min: 1, max: 30 }),
          rating: faker.number.float({ min: 3, max: 5 }).toFixed(1),
          city,
          gender,
          imageUrl: gender === 'male' ? malePlaceholderImage : femalePlaceholderImage,
        });
      }
    });
  });

  return doctors;
};

const doctors = generateDoctors();

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  background-color: #E4ECF6;
  text-align: center;
  padding: 10px 0;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const DoctorCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
  width: 220px;
  text-align: center;
  position: relative;
  flex: 0 0 calc(33.333% - 16px);
  box-sizing: border-box;
`;

const DoctorImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const DoctorInfo = styled.div`
  margin-top: 8px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  padding-top: 50px;
`;

const StyledSelect = styled.select`
  width: 300px;
  padding: 0.25rem 1rem;
  padding-left: 20px;
  background-color: #E7DEF0;
  font-weight: 500;
  border-radius: 9999px;
  margin: 8px 0;
`;

const InfoDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 16px;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

const DoctorsSelection = () => {
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctors, setSelectedDoctors] = useState([]);
  const [visibleInfo, setVisibleInfo] = useState(null);

  const handleViewInfo = (doctorId) => {
    setVisibleInfo(visibleInfo === doctorId ? null : doctorId);
  };

  const handleFilter = (event) => {
    event.preventDefault();
    const filtered = doctors.filter(
      doctor => doctor.speciality === selectedSpeciality && doctor.city.toLowerCase() === selectedCity.toLowerCase()
    );
    setFilteredDoctors(filtered);
  };

  const handleSelectDoctor = (doctor) => {
    if (selectedDoctors.some((d) => d.id === doctor.id)) {
      setSelectedDoctors(selectedDoctors.filter((d) => d.id !== doctor.id));
    } else {
      setSelectedDoctors([...selectedDoctors, doctor]);
    }
  };

  return (
    <PageContainer>
      <Content>
        <Form onSubmit={handleFilter}>
          <StyledSelect value={selectedSpeciality} onChange={e => setSelectedSpeciality(e.target.value)}>
            <option value="">Select Speciality</option>
            {specialities.map(speciality => (
              <option key={speciality} value={speciality}>{speciality}</option>
            ))}
          </StyledSelect>
          <StyledSelect value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </StyledSelect>
          <Button type="submit">Search</Button>
        </Form>
        
        <Container>
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor.id} onClick={() => handleSelectDoctor(doctor)} style={{
              border: selectedDoctors.some((d) => d.id === doctor.id) ? '2px solid #007bff' : '1px solid #ccc'
            }}>
              <DoctorImage src={doctor.imageUrl} alt={doctor.name} />
              <DoctorInfo>
                <h4>{doctor.name}</h4>
                <p><strong>Speciality:</strong> {doctor.speciality}</p>
                <p><strong>Experience:</strong> {doctor.experience} years</p>
                <p><strong>Rating:</strong> ⭐{doctor.rating}</p>
                <Button onClick={(e) => { e.stopPropagation(); handleViewInfo(doctor.id); }}>View Info</Button>
              </DoctorInfo>
              <InfoDropdown isVisible={visibleInfo === doctor.id}>
                <p><strong>Name:</strong> {doctor.name}</p>
                <p><strong>Phone:</strong> {doctor.phone}</p>
                <p><strong>City:</strong> {doctor.city}</p>
              </InfoDropdown>
            </DoctorCard>
          ))}
        </Container>

        {selectedDoctors.length > 0 && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h2>Selected Doctors</h2>
            {selectedDoctors.map((doctor) => (
              <p key={doctor.id}>{doctor.name} - {doctor.speciality} ({doctor.city})</p>
            ))}
          </div>
        )}
      </Content>
      <Footer className="sc-dhKdPU hsaLvP"></Footer>
    </PageContainer>
  );
};

export default DoctorsSelection;
