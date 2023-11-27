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
