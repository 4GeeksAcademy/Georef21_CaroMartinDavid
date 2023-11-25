import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../styles/admon.css";

export const ModalSuccess = ( prop) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function success(){
        navigate("/admonlog");
        actions.closeSuccessM();

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
                <p>Tu usuario ha sido creado exitosamente</p>
            </div>
            <div className="modal-footer">
            
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={()=>success()}>Close</button>
            
            </div>
            </div>
        </div>
        </div>
);
};