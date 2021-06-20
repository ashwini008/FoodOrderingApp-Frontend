import React from "react";

const Profile = props => {
    // page is accessible only if user is logged in
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
