import React, { useState, useEffect } from 'react';
import ProfileModal from './CustomProfileModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CONSTANTS } from '../data/Constants';
import { faEnvelope, faLocationDot, faPenToSquare, faPhone } from '@fortawesome/free-solid-svg-icons';
import { PostJobCard, JobListCard } from '../job/PostJobCard';
import MyApplicantsCard from '../applicants/MyApplicantsCard';

const ProfilePage = (props) => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profile, setProfile] = useState(props.profile);

  const handleUpdateProfile = (updatedProfile) => {
    setProfile(updatedProfile); // Update local state
    props.updateProfile(updatedProfile); // Update parent state in MainContent
  };

  const getUserInitials = (fullName) => {
    if (fullName && fullName.trim().length > 0) {
      const arr = fullName.trim().split(' ');
      let initials = arr[0].substring(0, 1);
      if (arr.length > 1) {
        initials += arr[arr.length - 1].substring(0, 1);
      }
      return <span style={{ fontSize: 60, letterSpacing: 1.2 }}>{initials}</span>;
    }
    return (
      <span style={{ fontSize: 60, letterSpacing: 1.2 }}>
        <FontAwesomeIcon icon="fa-solid fa-user" style={{ color: '#fbfcfe' }} aria-label="User Icon" />
      </span>
    );
  };

  return (
    <div className="container" style={{ marginLeft: '8%', marginTop: '4%' }}>
      <div className="row gx-5">
        <div className="col-4 my-3">
          <div className="card p-4" style={{ boxShadow: '0px 5px 12px 0px rgba(0,0,0,0.1)' }}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              size="1x"
              onClick={() => setProfileModalOpen(true)}
              cursor="pointer"
              style={{ position: 'absolute', top: '15', right: '15' }}
              role="button"
              aria-label="Edit Profile"
            />
            <div className="text-center my-3">
              <div
                className="text-center mt-3 d-inline-flex justify-content-center align-items-center"
                style={{
                  height: '200px',
                  width: '200px',
                  borderRadius: '100%',
                  backgroundColor: '#296E85',
                  color: '#fff',
                  boxShadow: '0px 5px 12px 10px rgba(0,0,0,0.1)',
                }}
              >
                {getUserInitials(profile.fullName)}
              </div>
            </div>
            <div className="text-center mt-3">
              <h3 className="card-title mb-1">{profile[CONSTANTS.PROFILE.NAME]}</h3>
              <span style={{ fontSize: 20 }}>{profile[CONSTANTS.PROFILE.UNIVERSITY]}</span>
            </div>
            <hr className="my-4" />
            <div className="row gy-4">
              <div className="col-12 d-flex align-items-center">
                <FontAwesomeIcon icon={faEnvelope} size="1x" />
                <span className="mx-2">{profile[CONSTANTS.PROFILE.EMAIL]}</span>
              </div>
              <div className="col-12 d-flex align-items-center">
                <FontAwesomeIcon icon={faPhone} size="1x" />
                <span className="mx-2">{profile[CONSTANTS.PROFILE.CONTACT]}</span>
              </div>
              <div className="col-12 d-flex align-items-center">
                <FontAwesomeIcon icon={faLocationDot} size="1x" />
                <span className="mx-2">{profile[CONSTANTS.PROFILE.ADDRESS]}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <PostJobCard recruiterId={profile[CONSTANTS.PROFILE.USERNAME]} />
          <JobListCard recruiterId={profile[CONSTANTS.PROFILE.USERNAME]} />
          <MyApplicantsCard recruiterId={profile[CONSTANTS.PROFILE.USERNAME]} />
        </div>
      </div>
      {profileModalOpen && (
        <ProfileModal
          profile={profile}
          setModalOpen={setProfileModalOpen}
          updateProfile={handleUpdateProfile}
        />
      )}
    </div>
  );
};

export default ProfilePage;
