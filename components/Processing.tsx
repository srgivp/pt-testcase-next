import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const Processing = () => {
    const Spinner = <FontAwesomeIcon icon={faSpinner}/>
        return <div id='processing'>
            <div id='spinner'><span>{Spinner}</span></div>
        </div>
}

export default Processing;