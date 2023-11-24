import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const DatasCapture = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid p-0">
        <div className="row">
            {store.dataesp.length==0 ? <h1>No haz capturado datos</h1>:
            <>
                {store.dataesp.map((dato, index) => {
                    return (
                    
                        <div className="col-12 col-sm-12 col-xxl-3 d-flex pt-3" key={index}>
                            <div className="card illustration flex-fill">
                                <div className="card-body p-0 d-flex flex-fill">
                                    <div className="row g-0 w-100">
                                        <div className="col-8">
                                            <div className="illustration-text p-3 m-1">
                                                <h6 className="illustration-text">{dato.title} id:{dato.id}</h6>
                                                <p className="mb-0 positionesp">{new Date(store.allvisitsspc.filter(visit => visit.id ===dato.visit_id)[0]?.date).toISOString().slice(0, 10)}</p>
                                                <p className="mb-0 positionesp">Latitud: {dato.georeferencing.lat}</p>
                                                <p className="mb-0 positionesp">Longitud: {dato.georeferencing.lng}</p>
                                            </div>
                                        </div>
                                        <div className="col-4 text-center m-auto " style = {{alignItems:"center"}}>
                                            <div clasName="row ">
                                                <button type="button" class="btn btn-outline-light"><FaArrowAltCircleRight style={{ fontSize:"30px"}} /></button>
                                            </div>     
                                            <div clasName="row ">
                                                 <Link to={`/captdatareg/${dato.id}`}>
                                                    <button type="button" class="btn btn-outline-light mt-2"><FaPencilAlt  style={{ fontSize:"30px"}} /></button>
                                                </Link>
                                            </div>
                                            <div clasName="row ">
                                                <button type="button" class="btn btn-outline-light mt-2" onClick={()=>actions.deletecapturedata(dato.id)}><MdDelete  style={{ fontSize:"30px"}} /></button>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                    );

                })
                }
            </>
        }
        </div>
        <div className ="row">
        <div className ="d-flex justify-content-center">
            <Link to="/vInicial">
					<button type="button" className="btn btn-outline-dark">Volver</button>
			</Link>
            </div>
        </div>
        </div>
    );
};

export default DatasCapture;