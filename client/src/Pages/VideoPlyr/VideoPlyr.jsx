import React, { useRef, useEffect } from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
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
        const plyr = new Plyr(player.current);

        
        let spacebarTimer;
        let longPressDetected = false;

        let lastKeyPressed;
        let lastKeyPressTime;

        const handleKeyDown = (e) => {
              spacebarTimer = setTimeout(() => {
                  longPressDetected = true;
                  if (longPressDetected) {
                      if(e.key === 'ArrowRight'){plyr.speed = 2}
                      if(e.key === 'ArrowLeft'){plyr.speed = 1}
                  }
              }, 200);
      };

        const handleKeyUp = (e) => {
          clearTimeout(spacebarTimer);
            if(lastKeyPressed === e.key && (Date.now() - lastKeyPressTime) < 500){handleDoubleClick(e.key)}
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

  const handleDoubleClick = (side) => {
    const currentTime = player.current.currentTime;
    if (side === 'ArrowLeft') {
      player.current.currentTime = currentTime - 5;
    } else if (side === 'ArrowRight') {
      player.current.currentTime = currentTime + 10;
    }
  };
  
  return (
    <div style={{marginTop:'50px'}}>
      <h1>
        video player {/* {vv.filePath} */}
      </h1>
      <div style={{ width: '800px', height: '450px' }}>
          <video controls ref={player} /* onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} */ >
            <source src={`https://rewardsystem-ec650fd88bfa.herokuapp.com/${vv.filePath}`} type="video/mp4" />
          </video>
      </div>
    </div>
  );
}


export default Videoplayer;
