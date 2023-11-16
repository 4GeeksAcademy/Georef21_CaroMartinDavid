import React, { useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const DataCapture = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

function regdata(){
        actions.gevisitaesp();
        actions.location();
        navigate("/captdatareg");
}

function datacapt(){
    actions.getcapturedata();
    navigate("/datacapture");
}

return (
    <div className="center-content">
      
            <button onClick={()=>regdata()}>Tomar datos</button>
        
            <button onClick={()=>datacapt()}>Datos Capturados</button>
       
     </div>
);

};
