import React from "react";

const Profile = props => {
    if (!sessionStorage.getItem('access-token')) {
        props.history.push('/');
    }
  return (
    <>
      <p>Profile Page</p>
    </>
  );
};

export default Profile;
