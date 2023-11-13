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
            const response = await fetch('https://studious-potato-ww66x4qwvg5fv4xp-3001.app.github.dev/api/datacapture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataCaptureData),
            });

            if (response.ok) {
                // Mostrar una alerta cuando la respuesta es exitosa
                alert("DataCapture creado con éxito");
                console.log("DataCapture creado con éxito");

                // Restablecer los campos a sus valores iniciales
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
                    <label for="exampleFormControlTextarea1" class="form-label">Descripción</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagen</label>
                    <input type="text" className="form-control" id="image" name="image" value={dataCaptureData.image} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="georeferencing" className="form-label">Georreferenciación</label>
                    <input type="text" className="form-control" id="georeferencing" name="georeferencing" value={dataCaptureData.georeferencing} onChange={handleInputChange} />
                </div>

                <button className="btn btn-primary" onClick={handleSave}>
                    Save
                </button>

                {/* Agrega un botón que redirija a otra ruta
                <Link to="/datacaptures" className="btn btn-secondary">
                    DataCaptures
                </Link> */}
            </div>
        </div>
    );
};
