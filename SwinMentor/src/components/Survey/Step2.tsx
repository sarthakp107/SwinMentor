import React from "react";
import { SearchableDropdown } from "./SearchableDropdown";
import { SurveyState, Action} from "@/reducers/surveyReducer";
import { useAuthContext } from "@/Hooks/Context/useAuthContext";
import { useUpdateUnitsInProfile } from "@/Hooks/Database/update/useUpdateUnitsInProfile";
import { useAvailableUnits } from "@/Hooks/Database/useAvailableUnits";
import { useUpdateDegreeInProfile } from "@/Hooks/Database/update/useUpdateDegreeInProfile";

//Grabbing State and Dispatch from Parent Page for centralised State Management
type Step2Props = {
    state: SurveyState;
    dispatch: React.Dispatch<Action>;
}

export const Step2: React.FC<Step2Props> = ({state, dispatch}) => {
    
    const { user } = useAuthContext();
    const { updateUnits } = useUpdateUnitsInProfile();
    const {updateDegree} = useUpdateDegreeInProfile()
    const { units, loading, error } = useAvailableUnits();

    if (loading) return <div>Loading units...</div>;
    if (error) return <div>Error loading units</div>;

    //Treats each unit as a button, if it is selected for the first time, pushes it to the State's Selected Units, if its pressed again,
    //removes it from the selected units by filtering
    const handleUnitSelect = (unit: string) => {
        let updatedUnits = [...state.selectedUnits];
        if (updatedUnits.includes(unit)) {
            updatedUnits = updatedUnits.filter((id) => id !== unit);
        } else if (updatedUnits.length < 4) {
            updatedUnits.push(unit);
        }
        console.log("Choosen Unit", updatedUnits)
        dispatch({ type: "SET_UNITS", payload: updatedUnits });
    };

    //Submits to Supabase at Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user && state.selectedUnits.length === 4) {
            console.log("Updated Degree to Supabase:", state.degree, state.semester)
            await updateDegree(user.id, state.degree, state.semester); //Submit Degree and Sem to Supabase
            console.log("Selected Units:", state.selectedUnits)
            await updateUnits(user.id, state.selectedUnits); //Submit Units to Supabase
        }
    };

    return (

        //Main Div
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your 4 Units</h2>

            {/* Form For Unit Selection */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
                
                {/* Calling Searchable Component  */}
                <div className="relative">
                    <label className="block text-gray-700 font-medium mb-2">Search & Select Units</label>
                    <SearchableDropdown 
                        options={units.map((unit) => unit.unit_name)}
                        selectedOptions={state.selectedUnits}
                        onSelect={handleUnitSelect}
                        isMultiSelect={true} //This value is false by default, but can be set to true if we require multi select feature
                    />
                </div>

                {/* Previous and Next Buttons */}
                <div className="flex justify-between mt-4">
                    <button type="button" onClick={() => dispatch({ type: "PREV_STEP" })} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                        Previous
                    </button>
                    <button type="submit" disabled={state.selectedUnits.length !== 4} className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:bg-gray-300 hover:bg-red-600">
                        Submit
                    </button>
                </div>

            </form>
        </div>
    );
};
