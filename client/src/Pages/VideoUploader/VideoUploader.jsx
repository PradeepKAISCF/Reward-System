/*import React, { useState } from 'react';
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

export default VideoUploader;*/

import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import 'plyr/dist/plyr.css'; // Import Plyr styles
import Plyr from 'plyr';
import { useParams } from 'react-router-dom';

function Videoplayer() {
  const {vid} = useParams();
  //console.log(vid)
  const vids = useSelector((state) => state.videoReducer);
  //console.log(vids)
  const vv = vids?.data.filter((q) => q._id === vid)[0];
  //console.log(vv)
  const player = useRef(null);

  useEffect(() => {
    if (player.current) {
        const plyr = new Plyr(player.current,{fullscreen:{ enabled: false, fallback: false, },clickToPlay:false});

        let mouse,intervalId;

        plyr.on('dblclick',(e)=>{
          if(e.clientX < 300) {plyr.rewind(5)}
          else if(e.clientX < 500 && e.clientX>300) {plyr.togglePlay()}
          else if(e.clientX < 800) {plyr.forward(10)}
        })

        plyr.on('mousedown',(e)=>{
          mouse = setTimeout(()=>{
            if (e.clientX >500){plyr.speed=2}
            if (e.clientX < 300){
              intervalId = setInterval(() => {
                if (plyr.currentTime <= 0) {
                  clearInterval(intervalId);
                } else {
                  plyr.rewind(0.05);
                }
              }, 10)
            }
          },500)
        })

        plyr.on('mouseup',()=>{clearTimeout(mouse);plyr.speed=1;clearInterval(intervalId)})

        let spacebarTimer;
        let lastKeyPressed;
        let lastKeyPressTime;

        const handleKeyDown = (e) => {
              spacebarTimer = setTimeout(() => {
                      if(e.key === 'ArrowRight'){plyr.speed = 2}
                      if(e.key === 'ArrowLeft'){plyr.speed = 1}
              }, 200);
      };

        const handleKeyUp = (e) => {
          clearTimeout(spacebarTimer);
            if(lastKeyPressed === e.key && (Date.now() - lastKeyPressTime) < 500){handleDoubleClick(e.key,plyr)}
            else{lastKeyPressTime=Date.now();lastKeyPressed=e.key}
            
        };


        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Cleanup: Remove Event Listeners
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }
}, []);

  const handleDoubleClick = (side,plyr) => {
    if (side === 'ArrowLeft') {
      plyr.rewind(5)
    } else if (side === 'ArrowRight') {
      plyr.forward(10)
    }
  };
  
  return (
    <div style={{marginTop:'50px'}}>
      <h1 onClick={(e) =>{console.log(e.clientX)}}>
        video player {/* {vv.filePath} */}
      </h1>
      <div style={{ width: '800px', height: '450px' }}>
          <video controls ref={player}  >
            <source src={`https://rewardsystem-6c1a645e0d72.herokuapp.com/${vv.filePath}`} type="video/mp4" />
          </video>
      </div>
    </div>
  );
}


export default Videoplayer;

