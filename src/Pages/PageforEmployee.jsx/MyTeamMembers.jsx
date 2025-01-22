import React from "react";
import useMyTeamMember from "../../CustomHooks/useMyTeamMember";
import { Helmet } from "react-helmet-async";

const MyTeamMembers = () => {
  const { myTeamMembers, isMyTeamMembersLoading } = useMyTeamMember();

  return (
    <div className="max-w-screen-xl mx-auto pt-28">
      <Helmet>
        <title>My Team Members - ProTracker</title>
      </Helmet>
      <h1 className="text-4xl font-bold text-center pb-12">My Team Members</h1>

      {/* Loading State */}
      {isMyTeamMembersLoading ? (
        <div className="text-center text-xl">Loading team members...</div>
      ) : myTeamMembers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-12">
          {myTeamMembers.map((member) => (
            <div
              key={member._id}
              className="relative flex flex-col items-center p-4 rounded-lg shadow-md w-full mb-16"
            >
              <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-[#323232] overflow-hidden">
                <img
                  src={member?.photo}
                  alt={member?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-black text-lg font-bold mt-16">
                {member?.name}
              </h2>
              <h3 className="text-gray-500 text-sm">{member?.role}</h3>
              <p className="text-gray-500 text-xs">{member?.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">No team members found.</p>
      )}
    </div>
  );
};

export default MyTeamMembers;
