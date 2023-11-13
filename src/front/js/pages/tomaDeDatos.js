import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

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

    const handleInputChange = (e) => {
        setDataCaptureData({
            ...dataCaptureData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        console.log(dataCaptureData);

        try {
            const response = await fetch('https://opulent-rotary-phone-4x446rp4x493j7r7-3001.app.github.dev/api/datacapture', {
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
        <div className="center-content">
            <div className="content-container">
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
                    <label htmlFor="georeferencing" className="form-label">Georreferenciación</label>
                    <input type="text" className="form-control" id="georeferencing" name="georeferencing" value={dataCaptureData.georeferencing} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="visit_id" className="form-label">ID de la Visita</label>
                    <input type="text" className="form-control" id="visit_id" name="visit_id" value={dataCaptureData.visit_id} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="specialist_id" className="form-label">ID del Especialista</label>
                    <input type="text" className="form-control" id="specialist_id" name="specialist_id" value={dataCaptureData.specialist_id} onChange={handleInputChange} />
                </div>

                <button className="btn btn-primary" onClick={handleSave}>
                    Save
                </button>

                <Link to="/perfilVisitas" className="btn btn-secondary">
                    Visitas
                </Link>
            </div>
        </div>
    );
};
