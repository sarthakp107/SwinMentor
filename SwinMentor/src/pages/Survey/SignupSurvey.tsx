import React, { useReducer } from "react";
import { Step1 } from "@/components/Survey/Step1";
import { Step2 } from "@/components/Survey/Step2";
import { initialState, surveyReducer } from "@/reducers/surveyReducer";

export const SignUpSurvey: React.FC = () => {
    const [state, dispatch] = useReducer(surveyReducer, initialState);

    return (
        <div className="container mx-auto p-4">
            {state.step === 1 ? (
                <Step1 dispatch={dispatch} state={state} />
            ) : ( 
                <Step2 dispatch={dispatch} state={state} />
            )}
        </div>
    );
};
