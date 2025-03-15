import React, { useEffect, useState } from "react";
import { FaUsers, FaComments, FaSearch, FaChevronRight } from "react-icons/fa";
import { supabase } from "../../supabase-client";
import { useAuth } from "@/context/AuthContext";

interface Group {
  unitID: string;
  unitName: string;
  members: { profileID: string; displayName: string }[];
}

const YourGroups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUnitGroups = async () => {
      setLoading(true);
  
      // Fetch data from user_units, profile, and units tables with proper joins
      const { data, error } = await supabase
        .from("user_units")
        .select(`
          unit_id,
          profile_id,
          profile:profile_id(display_name),
          units:unit_id(unit_name)
        `);
  
      if (error) {
        console.error("Error fetching unit groups:", error);
        setLoading(false);
        return;
      }
  
      if (!data || data.length === 0) {
        console.log("No data found");
        setLoading(false);
        return;
      }
  
      console.log("Fetched data:", data);  // Log fetched data
  
      // Group users by unit_id, including their names
      const groupedUsers: Record<string, { unitName: string; members: { profileID: string; displayName: string }[] }> = {};
  
      // Iterate through the data and group by unit_id
      data.forEach((item: any) => {
        const { unit_id, profile_id, profile, units } = item;
  
        // Check if profile and unit are populated, otherwise skip
        if (!profile || !units) return;
  
        console.log(`Processing item: unit_id = ${unit_id}, profile_id = ${profile_id}, profile = ${profile.display_name}`);
  
        // If the unit_id group does not exist, create a new entry
        if (!groupedUsers[unit_id]) {
          groupedUsers[unit_id] = {
            unitName: units.unit_name,  // Using the unit name here
            members: [],
          };
        }
  
        // Push the user with display_name to the members array
        groupedUsers[unit_id].members.push({
          profileID: profile_id,
          displayName: profile.display_name,
        });
      });
  
      // Log the grouped data to see how it's structured
      console.log("Grouped users:", groupedUsers);
  
      // Convert grouped data into an array of groups
      const groupsArray: Group[] = Object.entries(groupedUsers).map(
        ([unitID, { unitName, members }]) => ({
          unitID,
          unitName,
          members,
        })
      );
  
      // Log the final groups array
      console.log("Final groups array:", groupsArray);
  
      setGroups(groupsArray);  // Set the grouped data to the state
      setLoading(false);
    };
  
    fetchUnitGroups();
  }, [user]);
  
  
  

  // Generate initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Create random color for member bubbles (but consistent per member)
  const getMemberColor = (id: string) => {
    // Simple hash function to get consistent color for each member ID
    const hash = id.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 360;
    return `hsla(${hue}, 70%, 55%, 0.15)`;
  };

  const getMemberTextColor = (id: string) => {
    const hash = id.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 360;
    return `hsla(${hue}, 80%, 30%, 1)`;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map(i => (
          <div key={i} className="p-6 bg-white rounded-lg shadow-md animate-pulse">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="flex flex-wrap gap-2 mb-6">
              {[1, 2, 3].map(j => (
                <div key={j} className="h-6 bg-gray-200 rounded-full w-20"></div>
              ))}
            </div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg border border-gray-100 shadow-sm">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <FaUsers className="text-red-300 text-3xl" />
        </div>
        <h3 className="text-xl font-medium text-gray-700 mb-2">No Groups Yet</h3>
        <p className="text-gray-500 text-center mb-6">Join a group to collaborate with others on projects and courses.</p>
        <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm hover:shadow">
          Browse Available Groups
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {groups.map((group) => {
        // Display max 5 members, then show +X more
        const visibleMembers = group.members.slice(0, 5);
        const hasMoreMembers = group.members.length > 5;
        const hiddenCount = group.members.length - 5;

        return (
          <div
            key={group.unitID}
            className="relative overflow-hidden group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            {/* Top accent line with gradient */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-500 to-red-600"></div>

            <div className="p-6">
              {/* Group title */}
              <div className="flex items-center mb-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-50 text-red-500 mr-4">
                  <FaUsers className="text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">{group.unitName}</h3>
                  <p className="text-xs text-gray-500">{group.members.length} member{group.members.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Member avatars in a horizontal row */}
              <div className="mb-6">
                <p className="text-xs font-medium uppercase text-gray-500 tracking-wider mb-3">Members</p>
                <div className="flex items-center">
                  {visibleMembers.map((member, index) => (
                    <div
                      key={member.profileID}
                      className="flex-shrink-0 -ml-2 first:ml-0"
                      style={{ zIndex: 50 - index }} // Higher z-index for earlier members
                    >
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium"
                        style={{
                          backgroundColor: getMemberColor(member.profileID),
                          color: getMemberTextColor(member.profileID)
                        }}
                      >
                        {user?.user_metadata.avatar ? (
                          <img src={user.user_metadata.avatar} alt="User Avatar" />
                        ) : (
                          getInitials(member.displayName)
                        )}

                      </div>
                    </div>
                  ))}

                  {/* Show +X more if needed */}
                  {hasMoreMembers && (
                    <div
                      className="flex-shrink-0 -ml-2 w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600"
                      style={{ zIndex: 45 - visibleMembers.length }}
                    >
                      +{hiddenCount}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons with icons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium">
                  <FaComments className="mr-2 text-xs" />
                  Chat
                </button>
                <button className="flex items-center justify-center px-4 py-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition text-sm font-medium">
                  <FaSearch className="mr-2 text-xs" />
                  Find Mentor
                </button>
              </div>

              {/* View details link */}
              <div className="mt-5 text-right">
                <a href={`/groups/${group.unitID}`} className="inline-flex items-center text-xs font-medium text-red-600 hover:text-red-800 transition">
                  View Unit Buddies
                  <FaChevronRight className="ml-1 text-xs" />
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default YourGroups;