import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { MapData } from "./mapdata";

export const DatasCaptureCard = () => {
    const { store, actions } = useContext(Context);
    const [datacard, setDatacard]= useState({});
    const[georeferencing, setgeoreferencing]=useState({});
    const[visitdate, setvisitdate]=useState(null);
    const { id } = useParams(); 
    
    useEffect(() => {
        // console.log("id:", id);
        if (id) {

            // Si adminId está presente en la URL, llena el estado adminData con los datos del administrador a editar
            const datatocard = store.dataesp.find(data => data.id === parseInt(id));
            const georeferencingdata = datatocard.georeferencing
            const visitdate = new Date(store.allvisitsspc.filter(visit => visit.id ===datatocard.visit_id)[0]?.date).toISOString().slice(0, 10)

            if (datatocard) {
                setDatacard(datatocard);
                setgeoreferencing(georeferencingdata);
                setvisitdate(visitdate)
            }
        }
    }, [id, store.dataesp]);

    useEffect(() => {
        console.log("dataCard:", datacard);
        console.log("georeferencing", georeferencing);
        console.log("fecha visita", visitdate)
    }, [datacard, georeferencing, visitdate]);


    return (
        <>
        
            <div className = "row mt-3 d-flex justify-content-center">
            <div className="col-md-4 col-sm-12 d-flex">
                <div className="card mb-6 mb-xl-0 shadow-light-lg">
                  <a className="card-img-top" href="#!">
                    <img src={datacard.image} alt="..." className="img-fluid"/>
                  </a>
                    <h3 className="fw-medium mt-1" style={{color: "var(--bs-heading-color)", letterSpacing: "2px"}}>
                        {datacard.title}
                    </h3>
                    <p className="mb-0 text-body-secondary" style={{color: "#909497 "}}>
                    {datacard.description}
                    </p>
                    <p className="mb-0 text-body-secondary" style={{color: "#909497 "}}>
                    Latitud: {georeferencing.lat}
                       </p> 
                       <p className="mb-0 text-body-secondary" style={{color: "#909497 "}}>
                       Longitud :{georeferencing.lng}
                       </p> 
                 
                    <hr className="card-meta-divider"/>
                    <div className="avatar avatar-sm mx-2">
                      <img src={store.specialist.imageprofile} alt="..."  width="32" className="avatar-img rounded-circle"/>
                    </div>
                    <div className ="d-flex p-2">
                        <h6 className="text-uppercase text-body-secondary me-2 mb-0" style={{color: "#909497 "}}>
                            {store.specialist.nombre} {store.specialist.apellido}
                        </h6>

                        <p className="h6 text-uppercase text-body-secondary mb-0 ms-auto" style={{color: "#909497", }}>
                            {visitdate}
                        </p>
                    </div>
                </div>

              </div>
                <div className ="col-md-6 col-sm-12">
                <MapData georeferencing = {datacard.georeferencing}/>
                </div>
            </div>
            <div className ="d-flex justify-content-center mt-2">
            <Link to="/datacapture">
					<button type="button" className="btn btn-outline-dark">Volver</button>
			</Link>
            </div>
           

           
        </>
    
    );
};
