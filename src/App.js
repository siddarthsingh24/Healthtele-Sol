// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PatientForm from './components/PatientForm';
import Consultation from './components/Consultation';
import Chat from './components/Chat';
import Payment from './components/Payment';
import Checkout from './components/Checkout';
import SignIn from './components/SignIn';
import SignUp from './components/Signup';
import Auth from './components/Auth'; // Assuming this handles protected routes and authentication
import AudioRecorder from './components/AudioRecorder';
import NotFound from './components/NotFound'; // Optional, for 404 handling
import { UserProvider } from './contexts/UserContext'; // User context
import { ConsultationProvider } from './contexts/ConsultationContext'; // Consultation context

const App = () => {
  return (
    <UserProvider>
      <ConsultationProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/patient-form" element={<PatientForm />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/audio-recorder" element={<AudioRecorder />} />

              {/* Protected routes */}
              <Route path="/consultation" element={<Auth><Consultation /></Auth>} />
              <Route path="/chat" element={<Auth><Chat /></Auth>} />

              {/* Fallback route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ConsultationProvider>
    </UserProvider>
  );
};

export default App;
