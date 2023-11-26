import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../styles/admon.css";

export const ModalSuccess = ( prop) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();


    function success(tema){
        if(tema==="usuario"){
            navigate("/admonlog");
            actions.closeSuccessM();
        }else if(tema==="usuario especialista"){
            navigate("/profileadmon");
            actions.closeSuccessM();
        }
    }
return (
        <div className= "modal" tabIndex={1} role="dialog" style={{display:store.openSuccess}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Registro Exitoso</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>success()} >
                    <span aria-hidden="true">&times;</span>
                    </button>
                
            </div>
            <div className="modal-body">
                <p>Tu {prop.tema} ha sido creado exitosamente</p>
            </div>
            <div className="modal-footer">
            
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={()=>success(prop.tema)}>Close</button>
            
            </div>
            </div>
        </div>
        </div>
);
};