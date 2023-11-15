import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const DatasCapture = () => {
   
return (
    <div className="center-content">
        <button>Tomar datos</button>
        <button>Datos Capturados</button>
     </div>
);

};