import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/admon.css";

export const Modal = ( prop) => {
    const { store, actions } = useContext(Context);
return (
        <div className= "modal" tabIndex={1} role="dialog" style={{display:store.openError}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Error</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>actions.closeErrorlogin()} >
                    <span aria-hidden="true">&times;</span>
                    </button>
                
            </div>
            <div className="modal-body">
                <p>{prop.error}</p>
            </div>
            <div className="modal-footer">
            
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={()=>actions.closeErrorlogin()}>Close</button>
            
            </div>
            </div>
        </div>
        </div>
);
};