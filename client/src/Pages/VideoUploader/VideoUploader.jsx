import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../../actions/video";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import './VideoUploader.css';

const VideoUploader = () => {
  const dispatch = useDispatch();
  const [videoName, setVideoName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleVideoNameChange = (event) => {
    setVideoName(event.target.value);
  };

  const fileOptions = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setProgress(percentage);
      if (percentage === 100) {
        setTimeout(function () {}, 3000);
      }
    },
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const fileData = new FormData();
    fileData.append('title', videoName);
    fileData.append('file', selectedFile);
    dispatch(
      uploadVideo({
        fileData: fileData,
        fileOptions: fileOptions,
      }))
  };

  return (
    <div className="form-container" style={{marginTop:'10px'}}>
      <h1>Upload Video</h1>
      <form>
        <label htmlFor="videoName">Video Name:</label>
        <input type="text" id="videoName" name="videoName" value={videoName} onChange={handleVideoNameChange} />

        <label htmlFor="videoFile">Choose a video:</label>
        <input type="file" id="videoFile" name="videoFile" onChange={handleFileChange} />

        <input type="button" value="Upload" className="upload-button" onClick={handleUpload} />
      </form>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{maxHeight:'500px',width:'400px'}}>
            <CircularProgressbar
              value={progress}
              text={`${progress}`}
              styles={buildStyles({
                rotation: 0.25,
                textSize: "10px",
                pathTransitionDuration: 0.5,
                pathColor: `rgba(255,255,255,${progress / 100})`,
                textColor: "#f88",
                trailColor: "#adff2f",
                backgroundColor: "#3e98c7",
              })}
            />
          </div>
        </div>
    </div>
  );
};

export default VideoUploader;
