// import { useAvailableDegrees } from "@/Hooks/Database/useAvailableDegrees";


// export const DegreeList = () => {
//     const { degrees, loading, error } = useAvailableDegrees();
    
//     if (loading) return <div>Loading degrees...</div>;
//     if (error) return <div>Error: {error}</div>;
//     return (
//         <>
//             {degrees.map(degree => (
//                 <option key={degree.degree_id} value={degree.degree_name} className="p-2 hover:bg-gray-100">{degree.degree_name}</option>
//             ))}
//         </>
//     );
// };
