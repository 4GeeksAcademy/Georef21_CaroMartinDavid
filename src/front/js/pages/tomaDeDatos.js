import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import credentials from './credentials';
import MapComponent from './map';
import { uploadFile } from "../../../firebase/config";
import { Modal } from "../component/modal";


export const DataCaptureRegister = () => {
    const { store, actions } = useContext(Context);
    const [imagen, setimagen] = useState(null);
    const [error, seterror]= useState("");
    const [urlimg, seturlimg]= useState("");

    const [dataCaptureData, setDataCaptureData] = useState({
        title: "",
        description: "",
        visit_id: "",
        specialist_id: ""
    });

    const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}&libraries=places`;

    function handlesubmit(e){
        e.preventDefault()
        const formdata = new FormData(e.target);
        const datos= {};
        for (const entrada of formdata.entries()){
            datos[entrada[0]]=entrada[1];
        } 
        console.log(datos)
    }
    async function saveImage(e){
        e.preventDefault();
        try {
        const respuesta = await uploadFile(imagen);
        seturlimg(respuesta);
        console.log(urlimg);

        }catch(error){
            console.error(error);
            seterror(error);
            actions.openErrorlogin();
        }
    }

    const handleSave = async () => {
        console.log(dataCaptureData);

    //     try {
    //         const response = await fetch('https://effective-halibut-qwrr6x5w99xf965g-3001.app.github.dev/api/datacapture', {
    //             method: 'POST',
    //             headers: {
    //             'Content-Type': 'application/json',
    //         },
    //             body: JSON.stringify(dataCaptureData),
    //         });

    //     if (response.ok) {
    //         alert("DataCapture creado con éxito");
    //         console.log("DataCapture creado con éxito");

    //         setDataCaptureData({
    //             title: "",
    //             description: "",
    //             image: "",
    //             georeferencing: "",
    //             visit_id: "",
    //             specialist_id: ""
    //         });
    //     } else {
    //         console.error("Error al obtener datos de la API. Respuesta completa:", response);
    //     }
    // } catch (error) {
    //     console.error("Error al obtener datos de la API:", error);
    // }
};

return (
    <div className="container" >
        <h1>Capturar Datos</h1>
        <div className="col-md-6">
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                        <label htmlFor="specialist_id" className="form-label">Especialista</label>
                        <select className="form-select" id="specialist_id" name="specialist_id" defaultValue={dataCaptureData.specialist_id}>                          
                            <option value={store.specialist.id}>
                                    Id: {store.specialist.id} | Nombre: {store.specialist.nombre} {store.specialist.apellido}| Email: {store.specialist.email}
                            </option>
                        </select>
                </div>

                <div className="mb-3">
                        <label htmlFor="visit_id" className="form-label">ID de la Visita</label>
                        <select className="form-select" id="visit_id" name="visit_id" defaultValue={dataCaptureData.visit_id}>                           
                            <option value="">Selecciona visita</option>
                            {store.allvisitsspc.map((visit, index) => (
                                <option key={index} value={visit.id}>
                                    Id: {visit.id} | Proyecto: {store.allprojectspc.filter(project => project.id ===visit.project_id)[0]?.nameProject}
                                </option>
                            ))}
                        </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" className="form-control" id="title" name="title" defaultValue={dataCaptureData.title} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea className="form-control" id="description" name="description" defaultValue={dataCaptureData.description} rows="2"></textarea>
                </div>
                <button className="btn btn-primary">Guardar</button>
            </form>
            
            <form onSubmit={saveImage}>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagen</label>
                    <input type="file" className="form-control" id="image" name="image"  onChange={(e)=>setimagen(e.target.files[0])} />
                </div>
                <button className="btn btn-primary">Guardar imagen</button>           
            </form>
            <Modal error={error}/>
            <div className="mb-3">
                <h6>Georreferenciación</h6>
                <p>Latitud : {store.location.latitude} Longitud: {store.location.longitude } </p>
            </div>
            <div className = "conteinerMap">
				<MapComponent
					googleMapURL={mapURL}
					containerElement={<div style={{ height: '600px', width:'600px' }} />}
					mapElement={<div style={{ height: '100%' }} />}
					loadingElement={<p>Cargando</p>}
				/>
			</div>
            <button>Cargar Información</button>
            <div>
                <Link to="/vistaDatos" className="btn btn-secondary">
                    Volver
                </Link>
            </div>
        </div>
    </div>
);
};
