import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import useCheckRole from "../../CustomHooks/useCheckRole";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [update, setUpdate] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || "");
  const [newPhotoURL, setNewPhotoURL] = useState(user?.photoURL || "");
  const { clientDetails } = useCheckRole();

  const handleUpdate = () => {
    if (
      newDisplayName !== user?.displayName ||
      newPhotoURL !== user?.photoURL
    ) {
      updateUserProfile({ displayName: newDisplayName, photoURL: newPhotoURL })
        .then(() => {
          setUpdate(false);
        })
        .catch((error) => {
          console.error("Profile update failed:", error);
        });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Helmet>
        <title>Profile - ProTracker</title>
      </Helmet>
      <div className="shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-center">
          <img
            src={newPhotoURL}
            alt="Profile"
            referrerPolicy="no-referrer"
            className="w-24 h-24 rounded-full border-4 object-cover"
          />
        </div>
        <div className="text-center mt-4">
          {update ? (
            <>
              <input
                className="w-full px-4 border-b-2 border-black text-black focus:outline-none focus:border-black my-4 text-center"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                placeholder="Enter new display name"
              />
              <input
                className="w-full px-4 border-b-2 border-black text-black focus:outline-none focus:border-black my-4 text-center"
                value={newPhotoURL}
                onChange={(e) => setNewPhotoURL(e.target.value)}
                placeholder="Enter new profile photo URL"
              />
            </>
          ) : (
            <h2 className="text-xl font-semibold text-gray-700 my-4">
              {user?.displayName || "Unknown User"}
            </h2>
          )}

          <p className="text-gray-600">{user?.email || "No Email Available"}</p>
        </div>
        <div className="mt-6">
          {update ? (
            <button
              onClick={handleUpdate}
              className="w-full py-2 px-4 bg-[#191919] text-white rounded-md hover:bg-indigo-600"
            >
              Update Profile
            </button>
          ) : (
            <button
              onClick={() => setUpdate(true)}
              className="w-full py-2 px-4 bg-[#191919] text-white rounded-md hover:bg-indigo-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
