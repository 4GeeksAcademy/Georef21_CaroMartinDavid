import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import credentials from './credentials';
import MapComponent from './map';

export const DataCaptureRegister = () => {
    const { store, actions } = useContext(Context);
    const [dataCaptureData, setDataCaptureData] = useState({
        title: "",
        description: "",
        image: "",
        georeferencing: "",
        visit_id: "",
        specialist_id: ""
    });

    const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}&libraries=places`;

    const handleInputChange = (e) => {
        setDataCaptureData({
            ...dataCaptureData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        console.log(dataCaptureData);

        try {
            const response = await fetch('https://effective-halibut-qwrr6x5w99xf965g-3001.app.github.dev/api/datacapture', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(dataCaptureData),
            });

        if (response.ok) {
            alert("DataCapture creado con éxito");
            console.log("DataCapture creado con éxito");

            setDataCaptureData({
                title: "",
                description: "",
                image: "",
                georeferencing: "",
                visit_id: "",
                specialist_id: ""
            });
        } else {
            console.error("Error al obtener datos de la API. Respuesta completa:", response);
        }
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
    }
};

return (
    <div className="container" >
        <h1>Capturar Datos</h1>
        <div className="col-md-6">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Título</label>
                <input type="text" className="form-control" id="title" name="title" value={dataCaptureData.title} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea className="form-control" id="description" name="description" value={dataCaptureData.description} onChange={handleInputChange} rows="3"></textarea>
            </div>

            <div className="mb-3">
                <label htmlFor="image" className="form-label">Imagen</label>
                <input type="text" className="form-control" id="image" name="image" value={dataCaptureData.image} onChange={handleInputChange} />
            </div>

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

            <div className="mb-3">
                    <label htmlFor="visit_id" className="form-label">ID de la Visita</label>
                    <select
                        className="form-select"
                        id="visit_id"
                        name="visit_id"
                        value={dataCaptureData.visit_id}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecciona visita</option>
                        {store.allvisitsspc.map((visit, index) => (
                            <option key={index} value={visit.id}>
                                Id: {visit.id} | Proyecto: {store.allprojectspc.filter(project => project.id ===visit.project_id)[0]?.nameProject}
                            </option>
                        ))}
                    </select>

                </div>

            <div className="mb-3">
                    <label htmlFor="specialist_id" className="form-label">Especialista</label>
                    <select
                        className="form-select"
                        id="specialist_id"
                        name="specialist_id"
                        value={dataCaptureData.specialist_id}
                        onChange={handleInputChange}
                    >
                        <option value={store.specialist.id}>Selecciona un especialista</option>
                             <option>
                                Id: {store.specialist.id} | Nombre: {store.specialist.nombre} {store.specialist.apellido}| Email: {store.specialist.email}
                            </option>
                      
                    </select>

                </div>
            <button className="btn btn-primary" onClick={handleSave}>
                Save
            </button>
            <div>
                <Link to="/vistaDatos" className="btn btn-secondary">
                    Volver
                </Link>
            </div>
        </div>
    </div>
);
};
