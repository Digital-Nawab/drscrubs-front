import React from 'react';

const ProfileComponent = ({ googleData }) => {
  return (
    <>
      {googleData && (
        <div>
            <p>Name: {googleData.displayName}</p>
            <p>Email: {googleData.email}</p>
            <p>First Name: {googleData.firstName}</p>
            <p>Last Name: {googleData.lastName}</p>
            <img src={googleData.photoURL} alt="" />
          {/* Add other properties based on your user data structure */}
        </div>
      )}
    </>
  );
};

export default ProfileComponent;
