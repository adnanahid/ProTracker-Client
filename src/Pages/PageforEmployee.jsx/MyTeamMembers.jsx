import React from "react";
import useMyTeamMember from "../../CustomHooks/useMyTeamMember";
import { Helmet } from "react-helmet-async";
import useCheckRole from "../../CustomHooks/useCheckRole";

const MyTeamMembers = () => {
  const { myTeamMembers, isMyTeamMembersLoading } = useMyTeamMember();
  const { clientDetails } = useCheckRole();
  return (
    <div className="max-w-screen-xl mx-auto">
      <Helmet>
        <title>My Team Members - ProTracker</title>
      </Helmet>
      <h1 className="text-4xl font-semibold text-center pb-12 tracking-widest">
        My Team Members
      </h1>

      {/* HrDetails */}
      <div className="relative flex flex-col items-center p-4 rounded-lg shadow-md w-56 mb-28 mx-auto my-12 h-[220px] bg-[#191919] ">
        <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-[#323232] overflow-hidden">
          <img
            src={clientDetails?.hrPhoto}
            alt={clientDetails?.hrName}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-gray-100 text-lg font-bold mt-16">
          {clientDetails?.hrName}
        </h2>
        <h3 className="text-gray-100 text-sm">Hr</h3>
        <p className="text-gray-100 text-xs">{clientDetails?.hrEmail}</p>
      </div>

      {/* Loading State */}
      {isMyTeamMembersLoading ? (
        <div className="text-center text-xl">Loading team members...</div>
      ) : myTeamMembers.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-12">
          {myTeamMembers.map((member) => (
            <div
              key={member._id}
              className="relative flex flex-col items-center p-4 rounded-lg shadow-md w-full h-[220px] mb-16"
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
