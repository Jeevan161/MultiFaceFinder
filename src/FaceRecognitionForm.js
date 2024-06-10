import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import defaultimg from './upload.png';

function FaceRecognitionForm() {
  useEffect(()=>
    {
        document.title="Authenticate Face";
    })
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);

  const handleImageChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
      setFile(uploadedFile);
      setSelectedFile({ file: uploadedFile, name: uploadedFile.name });
      setCapturedImage(null);
    } else {
      setFile(null);
      setSelectedFile(null);
      alert('Please select an image file.');
    }
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        setUseWebcam(false);
        setFile(null);
        setSelectedFile(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const imageData = reader.result.split(',')[1];
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
        'https://gzr9dtpdc9.execute-api.us-east-1.amazonaws.com/DEV/recognize-faces',
        { body: imageData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (Array.isArray(response.data.body)) {
        setResults(response.data.body);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while recognizing the faces.');
    } finally {
      setLoading(false);
    }
  };

  const handleWebcamToggle = () => {
    setUseWebcam(!useWebcam);
    setFile(null);
    setSelectedFile(null);
    setCapturedImage(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='main'>
          <style>{`
            .main {
              margin-top: 0px;
              background:#A8CD9F;
              height:100vh ;
              display:flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
            #drop-area {
              display:flex;
              flex-direction:column;
              justify-content: center;
              align-items: center;
              width:25vw;
              padding:30px;
              background:#fff;
              text-align:center;
              border-radius:20px;
              box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
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
              height: 50%;
              object-fit:contain;
            }
            #drop-area:hover, .subchi button:hover {
              box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
            }
            #img-view span {
              display:block;
              font-size:12px;
              color:#777;
              margin-top:15px;
            }
            .nameinp {
              padding:10px;
              margin :15px;
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
            .results-container {
              margin: 20px;
              width: 80%;
              background: #fff;
              padding: 0px 20px 20px 20px;
              border-radius: 10px;
              box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            }
            .results-container h2 {
              margin-bottom: 10px;
            }
            .result-item {
              border-bottom: 1px solid #ddd;
              padding: 10px 0;
            }
            .result-item:last-child {
              border-bottom: none;
            }
            .result-item strong {
              display: block;
              font-size: 14px;
            }
            .btns
            {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
            }
            .jjj
            {
              width:30%;
            }
            .btns button
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
            .jjjk
            {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}</style>
          <div>
            <label htmlFor="input-file" id="drop-area">
              <input
                type="file"
                accept="image/*"
                id="input-file"
                onChange={handleImageChange}
                hidden
                required={!useWebcam && !capturedImage}
              />
              <div className='pp' id="img-view">
                {selectedFile ? (
                  <img src={URL.createObjectURL(selectedFile.file)} width={"150px"} height={"150px"} alt="Uploaded preview" />
                ) : capturedImage ? (
                  <img src={capturedImage} width={"150px"} height={"150px"} alt="Captured preview" />
                ) : useWebcam ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={200}
                    height={200}
                  />
                ) : (
                  <img src={defaultimg} width={"150px"} alt="Default" />
                )}
                {selectedFile || capturedImage ? (
                  <span>Click to reupload img</span>
                ) : (
                  <>
                    <p>Drag and drop or click here <br />to upload image.</p>
                    <span>Upload any image from desktop</span>
                  </>
                )}
              </div>
            </label>
          </div>
          <div className='jjj'>
          <div  className='btns'>
            <button type="button" onClick={handleWebcamToggle}>
              {useWebcam ? "Use File Upload" : "Use Webcam"}
            </button>
            {useWebcam && <button type="button" onClick={handleCapture}>Capture Photo</button>}
            
          </div>
          <div className='subchi'>
            <button type="submit">Recognize Faces</button>
           
          </div>
         
          </div>
          <div className='jjjk'>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {results.length > 0 && (
             <div className="results-container">
             <h2>Recognition Results:</h2>
             <div className="result-row">
               {results.map((result, index) => (
                 <div key={index} className="result-item">
                   <span>Name: {result.full_name},&nbsp;Confidence: {result.confidence}</span>
                  
                 </div>
               ))}
             </div>
           </div>
           
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default FaceRecognitionForm;
