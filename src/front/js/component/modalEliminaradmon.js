import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../../styles/admon.css";

export const ModalEliminarAdmon = (prop) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

function deleteadmin(id){
    actions.deleteadmon(id);
    actions.getadmins();
    actions.closeModaldelete();
    actions.logout();
    navigate("/");
}

return (
        <div className= "modal" tabIndex={1} role="dialog" style={{display:store.openModalEliminar}}>
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" style={{fontSize:"15px", color:"black"}}>Eliminar cuenta</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>actions.closeModaldelete()} >
                    <span aria-hidden="true">&times;</span>
                    </button>
                
            </div>
            <div className="modal-body">
                <p style={{fontSize:"13px", color:"black"}}>Si quieres eliminar tu cuenta podemos ayudarte a hacerlo. Ten en cuenta que no podras recuperar ningun contenido que hayas subido a tu cuenta</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={()=>deleteadmin(prop.id)}>Aceptar</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={()=>actions.closeModaldelete()}>Cancelar</button>
            
            </div>
            </div>
        </div>
        </div>
);
};