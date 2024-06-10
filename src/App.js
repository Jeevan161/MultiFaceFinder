import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthenticateFace from './FaceRecognitionForm';
import AddNewFace from './putImg';
import Home from './home';
import FaceRecognitionForm from './FaceRecognitionForm';
import AppBar from './AppBar'
import Attendance from './Select_course_section'
function App() {
  return (
    
    <div>
      <style>{`
     @import url('https://fonts.googleapis.com/css2?family=Madimi+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')`}</style>
    <style>{`
    
      body::-webkit-scrollbar {
  width: 0.31em;
  border-radius:10px;
}
 
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius:10px;
}
 
body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius:10px;
  outline: 1px solid slategrey;
}
      
      body {
        margin: 0;
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        background-size:cover;
      }
    `}</style>
    <AppBar/>
      <div>
        {/* <h1>Face Recognition App</h1>
        <nav>
          <ul>
            <li>
              
            </li>
            <li>
              <a href="/authenticate-face">Authenticate Face</a>
            </li>
            <li>
              <a href="/add-new-face">Add New Face</a>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authenticate-face" element={<AuthenticateFace />} />
          <Route path="/add-new-face" element={<AddNewFace />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
