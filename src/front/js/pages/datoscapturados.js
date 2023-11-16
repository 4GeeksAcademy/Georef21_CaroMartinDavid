import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const DatasCapture = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="mt-5">
            {store.dataesp.length==0 ? <h1>No haz capturado datos</h1>:
            <>
                {store.dataesp.map((dato, index) => {
                    return (
                        <div key={index} className="card" style={{width: "18rem"}}>
                            <img src={dato.image} className="card-img-top" alt="..."/>
                            <div className="card-body">
                             <h5 className="card-title">{dato.title}</h5>
                                <p className="card-text">{dato.description}</p>
                                <p>Visita id: {dato.visit_id} Captura id:{dato.id}</p>
                                <a href="#" className="btn btn-primary px-2">Editar</a>
                                <a href="#" className="btn btn-primary px-2" onClick={()=>actions.deletecapturedata(dato.id)}>Eliminar</a>
                             </div>
                            </div>
                    );

                })
                }
            </>
        }


            <Link to="/vistaDatos">
					<button type="button" className="btn btn-outline-dark">Volver</button>
			</Link>
        </div>
    );
};

export default DatasCapture;