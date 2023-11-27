import React, { useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../styles/admon.css";

export const ModalDelete = (prop) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

function deletea(id, tema){
    if (tema === "este proyecto"){
        actions.DeleteProject(id);
        actions.GetProjects();
        actions.closedeleteSuccessM();
        navigate("/listaproyectos");
    }
}

return (
        <div className= "modal" tabIndex={1} role="dialog" style={{display:store.deleteSuccess}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" style={{fontSize:"15px", color:"black"}}>Eliminar cuenta</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>actions.closedeleteSuccessM()} >
                    <span aria-hidden="true">&times;</span>
                    </button>
                
            </div>
            <div className="modal-body">
                <p style={{fontSize:"13px", color:"black"}}>Estas seguro que deseas eliminar {prop.tema} ? </p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={()=>deletea(prop.id, prop.tema)}>Aceptar</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={()=>actions.closedeleteSuccessM()}>Cancelar</button>
            
            </div>
            </div>
        </div>
        </div>
);
};