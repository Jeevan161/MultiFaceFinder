import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import defaultimg from './upload.png';

function ImageUploader() {
  useEffect(() => {
    document.title = "Add Face";
  }, []);

  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const webcamRef = useRef(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setFile(uploadedFile); // Set file immediately
      setSelectedFile({ file: uploadedFile, name: uploadedFile.name });
      setCapturedImage(null); // Reset captured image if switching to file upload
    } else {
      setFile(null); // Reset file state
      setSelectedFile(null);
      alert('Please select an image file.');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        setUseWebcam(false); // Turn off the webcam view
        setFile(null); // Reset file if switching to captured image
        setSelectedFile(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageData = reader.result.split(',')[1]; // Extract base64 data
        recognizeFace(imageData);
      };
    } else if (capturedImage) {
      const base64Data = capturedImage.split(',')[1];
      recognizeFace(base64Data);
    }
  };

  const recognizeFace = async (imageData) => {
    try {
      const response = await axios.post(
        'https://gzr9dtpdc9.execute-api.us-east-1.amazonaws.com/DEV/add-face',
        { file: imageData, name },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setResult(response.data.body);
      setShowPopup(true); // Show popup
      setTimeout(() => {
        setShowPopup(false); // Hide popup after 3 seconds
        window.location.reload(); // Refresh the page
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred while uploading the image.');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const handleWebcamToggle = () => {
    setUseWebcam(!useWebcam);
    setFile(null);
    setSelectedFile(null);
    setCapturedImage(null);
  };

  const isSubmitDisabled = !name || (!file && !capturedImage);

  return (
    <form onSubmit={handleSubmit}>
      <div className='main'>
        <style>{`
          .main {
            margin-top: 0px;
            background:#A8CD9F;
            height: calc(100vh - 65px) ;
            display:flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }
          #drop-area {
            display:flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
            width:25vw;
            padding:20px;
            background:#fff;
            text-align:center;
            border-radius:20px;
          }
          #img-view {
            width:100%;
            height:100%;
            border-radius:20px;
            border :2px dashed #bbb5ff;
            background:#f7f8ff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          #img-view img {
            width: 80%;
            margin-top: 25px;
            max-height: 30vh;
            height: 50%;
            object-fit:contain;
          }
          #img-view span {
            display:block;
            font-size:12px;
            color:#777;
            margin-top:15px;
          }
          .nameinp {
            padding:10px 20px;
            margin :20px 0px 10px 0px;
            font-size:18px;
            border-radius:15px;
            border:none;
          }
          .nameinp:focus {
            outline:none;
          }
          .subchi {
            display:flex;
            flex-direction:column;
            align-items:center;
            width:30%;
            max-width:300px; 
            justify-content:center;
          }
          .subchi button {
            width:75%;
            padding:12px;
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
            transition: ease-in-out .2s;
            border-radius:10px;
            border:none;
          }
          .subchi button:focus {
            outline:none;
          }
          @media only screen and (max-width: 1300px) {
            #drop-area {
              width:25vw;
            }
          }
          @media only screen and (max-width: 1200px) {
            #drop-area {
              width:30vw;
            }
          }
          @media only screen and (max-width: 1100px) {
            #drop-area {
              width:35vw;
            }
          }
          @media only screen and (max-width: 1000px) {
            #drop-area {
              width:40vw;
            }
          }
          @media only screen and (max-width: 900px) {
            #drop-area {
              width:45vw;
            }
          }
          @media only screen and (max-width: 800px) {
            #drop-area {
              width:50vw;
            }
          }
          @media only screen and (max-width: 700px) {
            #drop-area {
              width:55vw;
            }
          }
          @media only screen and (max-width: 600px) {
            #drop-area {
              width:60vw;
            }
          }
          @media only screen and (max-width: 500px) {
            #drop-area {
              width:65vw;
            }
          }
          .btns
          {
            display:flex;
            flex-direction :row;
          }
            #drop-area video
            {
            width: -webkit-fill-available;
            margin :15px;
            }
          .btns button,  #drop-area button
          {
            padding:10px;
            margin:10px;
            border-radius:5px;
            box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
            transition: ease-in-out .2s;
            border:none;  
          }
          .btns button:hover,.subchi button:hover
          {
            box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
          }
            .popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.loading {

  width: 20px;
  height: 20px;
  border: 3px black #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
 
  {
          
  }
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
  z-index: 999; /* Ensure the overlay is behind the popup */
}
  .popup.active {
  background-color: #ffffff; /* Change the background color of the popup */
  /* Add any other styles you want for the active state */
}

        `}</style>
      {showPopup && (
       <div className="overlay">
       <div className={`popup ${result ? 'active' : ''}`}>
         <p>{result}</p>
<<<<<<< HEAD
=======
         <div className="loading"></div>
>>>>>>> c607a0493f406cff6196a6c2b1aa9886706a19ea
       </div>
     </div>
      )}
        
        <div id="drop-area">
          {useWebcam ? (
            <>
              <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
              <button type="button" onClick={handleCapture}>Capture Photo</button>
            </>
          ) : (
            <div id="img-view">
              <img
                src={capturedImage || (selectedFile ? URL.createObjectURL(selectedFile.file) : defaultimg)}
                alt="Uploaded"
              />
              <span>{selectedFile ? selectedFile.name : 'Drag & Drop or Click to select an image'}</span>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
              <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>Choose File</label>
            </div>
          )}
          </div>
          
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={handleNameChange}
            className="nameinp"
          />
          
          <div className="btns">
          <button type="button" onClick={handleWebcamToggle}>
  {useWebcam ? 'Upload Image' : 'Use Webcam'}
</button>
          </div>
        
        <div className="subchi">
          <button type="submit" disabled={isSubmitDisabled}>
            {loading ? <div className="loading"></div> : 'Upload Image'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ImageUploader;