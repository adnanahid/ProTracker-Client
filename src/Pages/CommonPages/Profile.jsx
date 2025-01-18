import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
        </div>
        {/* User Details */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-gray-700">
            {user?.displayName || "Unknown User"}
          </h2>
          <p className="text-gray-600">{user?.email || "No Email Available"}</p>
        </div>
        {/* Additional Details (Optional) */}
        <div className="mt-6">
          <button className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
