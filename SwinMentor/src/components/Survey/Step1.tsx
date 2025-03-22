import React, { useState } from 'react';
import { SearchableDropdown } from './SearchableDropdown';
import { SurveyState, Action } from '@/reducers/surveyReducer';
// import { useAuthContext } from '@/Hooks/Context/useAuthContext';
// import { useUpdateDegreeInProfile } from '@/Hooks/Database/update/useUpdateDegreeInProfile';
import { useAvailableDegrees } from '@/Hooks/Database/useAvailableDegrees';

//Grabbing State and Dispatch from Parent Page for centralised State Management
type Step1Props = {
    state: SurveyState
    dispatch: React.Dispatch<Action>
}

export const Step1: React.FC<Step1Props> = ({state, dispatch}) => {
    
    // const { user } = useAuthContext();
    // const { updateDegree } = useUpdateDegreeInProfile();
    const { degrees, loading, error } = useAvailableDegrees();
    
    //Required for list
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSemester, setSelectedSemester] = useState("");

    const handleDegreeChange = (degreeId: string) => {
        dispatch({ type: 'SET_DEGREE', payload: degreeId });
    };

    const handleSemesterChange = (semester: string) => {    
        setSelectedSemester(semester);
        setIsOpen(false);
        dispatch({ type: 'SET_SEMESTER', payload: semester });
    };

    const handleNext = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (user && state.degree && state.semester) {
        //     console.log("Updated Degree to Supabase:", state.degree, state.semester)
        //     await updateDegree(user.id, state.degree, state.semester);
        // }
        dispatch({type: "NEXT_STEP"})
    };

    return (

        //Main Div
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Degree & Semester</h2>

            {/* Form for Degree and Sem Selection */}
            <form onSubmit={handleNext} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">

                {/* Div for Degree Selection */}
                <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Degree</label>

                    {/* Calling Searchable Component  */}
                    {loading ? <div>Loading degrees...</div> : error ? <div>Error loading degrees</div> : (
                        <SearchableDropdown 
                            options={degrees.map((degree) => degree.degree_name)}
                            selectedOptions={state.degree ? [state.degree] : []}
                            onSelect={handleDegreeChange}
                            isMultiSelect={false}
                        />
                    )}

                    {/* After a degree has been selected */}
                    {state.degree && (
                        <p className="mt-2 text-green-600">Selected Degree: {state.degree}</p>
                    )}
                </div>



                {/* Div For Semester Selection */}
                <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Semester</label>

                    {/* Simple List for Sem 1-8, similar design to Degree List */}
                    <div className="w-full p-3 border rounded-lg cursor-pointer bg-gray-100" onClick={() => setIsOpen(!isOpen)}>
                        {/* Label for semester field, no input required here */}
                        {selectedSemester ? `Semester ${selectedSemester}` : "Select Semester"}
                    </div>
                    {/* When the form is open, display list of 8 sems */}
                    {isOpen && (
                        <ul className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
                            {["1", "2", "3", "4", "5", "6", "7", "8"].map((sem) => (
                                <li
                                    key={sem}
                                    className="p-3 cursor-pointer hover:bg-red-100 transition"
                                    onClick={() => handleSemesterChange(sem)} 
                                >
                                    Semester {sem}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Next Button, submits to Supabase and sends to Step 2 */}
                <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Next</button>
            </form>
        </div>
    );
};
