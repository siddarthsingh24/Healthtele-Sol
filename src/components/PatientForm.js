// src/components/PatientForm.js

import React, { useState } from 'react';
import { db } from '../Firebase';
import { collection, addDoc } from 'firebase/firestore';

const PatientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [condition, setCondition] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, 'patients'), {
        name,
        age,
        condition,
      });
      alert('Patient information submitted successfully!');
      setName('');
      setAge('');
      setCondition('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error submitting patient information.');
    }
  };

  return (
    <div>
      <h2>Patient Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <label>Condition:</label>
          <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PatientForm;
