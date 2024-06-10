import React, { useEffect } from 'react';

const Home = () => {
    useEffect(()=>
    {
        document.title="Home";
    })
  return (
    
    <div><div style={styles.container}>
        <title>Home</title>
      <header style={styles.header}>
        <h1 style={styles.h1}>Welcome to Face Recognition Application using AWS Rekognition</h1>
      </header>
      <section style={styles.section}>
        <h2 style={styles.h2}>Overview</h2>
        <p>
          Our face recognition application leverages the powerful AWS Rekognition service to provide accurate and efficient facial recognition capabilities. This application is designed to facilitate two primary operations:
        </p>
        <ul>
          <li><strong style={styles.strong}>Add Face with Name:</strong> Capture and store facial images with associated names in our database.</li>
          <li><strong style={styles.strong}>Authenticate Face:</strong> Recognize and authenticate individuals from a photo containing multiple faces by matching them with the stored faces.</li>
        </ul>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>Key Features</h2>
        <h3 style={styles.h3}>Add Face with Name</h3>
        <ul>
          <li><strong style={styles.strong}>Single Person Detection:</strong> Ensure that only one person is present in the photo during the face addition process. This guarantees the accuracy and integrity of the facial recognition database.</li>
          <li><strong style={styles.strong}>Secure and Accurate:</strong> Utilize AWS Rekognition to capture and analyze facial features, storing them securely with an associated name.</li>
        </ul>
        <h3 style={styles.h3}>Authenticate Face</h3>
        <ul>
          <li><strong style={styles.strong}>Multiple Faces Detection:</strong> Upload photos containing multiple faces for authentication. The application will identify and match each face with the stored faces in the database.</li>
          <li><strong style={styles.strong}>Efficient Matching:</strong> Leverage AWS Rekognition's advanced algorithms to quickly and accurately identify individuals.</li>
        </ul>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>How It Works</h2>
        <h3 style={styles.h3}>Step 1: Adding a Face</h3>
        <ol>
          <li>Navigate to the "Add Face" section.</li>
          <li>Capture or upload a photo of the individual. Ensure that only one person is present in the photo.</li>
          <li>Enter the individual's name.</li>
          <li>Submit the photo and name. The system will analyze the face and store it securely with the associated name.</li>
        </ol>
        <h3 style={styles.h3}>Step 2: Authenticating Faces</h3>
        <ol>
          <li>Navigate to the "Authenticate Face" section.</li>
          <li>Upload a photo containing one or more faces.</li>
          <li>The system will analyze the photo, detect all faces, and match them against the stored faces in the database.</li>
          <li>Identified faces will be displayed along with their associated names.</li>
        </ol>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>Why Choose Our Application?</h2>
        <ul>
          <li><strong style={styles.strong}>Accuracy:</strong> Powered by AWS Rekognition, our application offers high-precision facial recognition.</li>
          <li><strong style={styles.strong}>Security:</strong> All data is stored securely, ensuring privacy and protection.</li>
          <li><strong style={styles.strong}>Ease of Use:</strong> User-friendly interface designed for seamless operation.</li>
        </ul>
      </section>
      <section style={styles.section}>
        <h2 style={styles.h2}>Get Started</h2>
        <p>
          Ready to experience seamless and secure facial recognition? Start by adding faces to your database or authenticate faces from your photos.
        </p>
      </section>
    </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'inherit',
    margin: '0 auto',
    width: '95%',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#08817c'
    
  },
  section: {
    marginBottom: '30px',
    fontWeight:300
  },
  footer: {
    textAlign: 'center',
    marginTop: '40px',
  },
  h1:{
    fontWeight:'600',
  },
  h2:
  {
    color: '#08817c',
    fontWeight:'500'
  },
  strong:
  {
    fontWeight:'500'
  },h3:
  {
     color: '#08817c',
    fontWeight:'400'
  }

};

export default Home;
