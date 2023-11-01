import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Avatar from "../../components/Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import s1 from '../../League/s1.png'
import s2 from '../../League/s2.png'
import s3 from '../../League/s3.png'
import s4 from '../../League/s4.png'
import s5 from '../../League/s5.png'
import "./UsersProfile.css";

const UserProfile = ({ slideIn, handleSlideIn }) => {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);

  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              <Avatar
                backgroundColor="purple"
                color="white"
                fontSize="50px"
                px="40px"
                py="30px"
              >
                {currentProfile?.name.charAt(0).toUpperCase()}
              </Avatar>
              <div className="user-name">
                <h1>{currentProfile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                  {moment(currentProfile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            <div>
              <div>
                {
                  currentProfile?.point >= 0 && currentProfile?.point < 50
                    ? (
                      <>
                        <img src={s1} alt="" style={{ width: '100px', height: '100px', marginBottom: '3px' }} />
                        <h5 style={{marginBottom: '10px', textAlign: 'center'}}>Beginner</h5>
                      </>
                    )
                    : currentProfile?.point >= 50 && currentProfile?.point < 100
                    ? (
                      <>
                        <img src={s2} alt="" style={{ width: '100px', height: '100px', marginBottom: '3px' }} />
                        <h5 style={{marginBottom: '10px', textAlign: 'center'}}>Intermediate</h5>
                      </>
                    )
                    : currentProfile?.point >= 100 && currentProfile?.point < 150
                    ? (
                      <>
                        <img src={s3} alt="" style={{ width: '100px', height: '100px', marginBottom: '3px' }} />
                        <h5 style={{marginBottom: '10px', textAlign: 'center'}}>Advanced</h5>
                      </>
                    )
                    : currentProfile?.point >= 150 && currentProfile?.point < 200
                    ? (
                      <>
                        <img src={s4} alt="" style={{ width: '100px', height: '100px', marginBottom: '3px' }} />
                        <h5 style={{marginBottom: '10px', textAlign: 'center'}}>Expert</h5>
                      </>
                    )
                    : currentProfile?.point >= 200
                    ? (
                      <>
                        <img src={s5} alt="" style={{ width: '100px', height: '100px', marginBottom: '3px' }} />
                        <h5 style={{marginBottom: '10px', textAlign: 'center'}}>Master</h5>
                      </>
                    )
                    : null
                }
              </div>
              {currentUser?.result._id === id && (
                <button
                  type="button"
                  onClick={() => setSwitch(true)}
                  className="edit-profile-btn"
                >
                  <FontAwesomeIcon icon={faPen} /> Edit Profile
                </button>
            )}
            </div>
          </div>
          <>
            {Switch ? (
              <EditProfileForm
                currentUser={currentUser}
                setSwitch={setSwitch}
              />
            ) : (
              <ProfileBio currentProfile={currentProfile} />
            )}
          </>
        </section>
      </div>
    </div>
  );
};

export default UserProfile;
