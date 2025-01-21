import React from "react";
import useMyTeamMember from "../../CustomHooks/useMyTeamMember";
import { Helmet } from "react-helmet-async";

const MyTeamMembers = () => {
  const { myTeamMembers, isMyTeamMembersLoading, myTeamMembersRefetch } =
    useMyTeamMember();

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
        <table className="table md:w-10/12 mx-auto">
          <thead>
            <tr>
              <th className="text-center">Photo</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Company</th>
              <th className="text-center">HR Email</th>
            </tr>
          </thead>
          <tbody>
            {myTeamMembers.map((member) => (
              <tr key={member._id}>
                <td className="text-center">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="text-center">{member.name}</td>
                <td className="text-center">{member.email}</td>
                <td className="text-center">{member.role}</td>
                <td className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={member.companyLogo}
                      alt={member.companyName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{member.companyName}</span>
                  </div>
                </td>
                <td className="text-center">{member.hrEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-xl">No team members found.</p>
      )}
    </div>
  );
};

export default MyTeamMembers;
