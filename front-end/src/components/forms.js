import React from "react";


export function DynamicForm (props){

    return(
        <div className="form_wrapper_overall">
            <form onSubmit={(e)=>props.handleFormSubmission(e)} autoComplete ='off'>
                <div className="form_content_wrapper_background">
                    <div className="form_content_wrapper"> 
                        <div className="form_content">
                            <label>{props.labelName} </label>
                            <input
                                type="text"
                                name={props.inputName}
                                placeholder={`Input ${props.placeholder}`}
                            />
                    
                        </div>
                        <div className="form_content_button">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
