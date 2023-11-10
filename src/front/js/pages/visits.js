import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import axios from "axios";

export const Visits = (props) => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [VisitsData, setVisitsData] = useState({
        scope: "",
        date: "",
        project_id: "",
        specialist_id: "",
    });
    const [specialists, setSpecialists] = useState([]); // Estado para almacenar la lista de especialistas

    useEffect(() => {
        // Obtener la lista de especialistas desde tu API
        fetch('https://fluffy-dollop-xj66x4gjrxgcvrww-3001.preview.app.github.dev/api/especialista')
            .then((response) => response.json())
            .then((data) => {
                setSpecialists(data);
            })
            .catch((error) => console.error(error));
    }, []);

    const handleInputChange = (e) => {
        setVisitsData({
            ...VisitsData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            const resp = await fetch('https://fluffy-dollop-xj66x4gjrxgcvrww-3001.preview.app.github.dev/api/visits', {
                method: "POST",
                body: JSON.stringify(VisitsData),
                headers: { "Content-Type": "application/json" },
            });
            if (resp.ok) {
                // Mostrar una alerta cuando la respuesta es exitosa
                alert("Visita creada con éxito");
                console.log("Visita creada con éxito");

                // Restablecer los campos a sus valores iniciales
                setVisitsData({
                    scope: "",
                    date: "",
                    project_id: "",
                    specialist_id: "",
                });
            } else {
                console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
            }
        } catch (error) {
            console.error({ error });
        }
    };

    return (
        <div className="center-content">
            <div className="content-container">
                <div className="mb-3">
                    <label htmlFor="scope" className="form-label">Alcance</label>
                    <input type="text" className="form-control" id="scope" name="scope" value={VisitsData.scope} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Fecha</label>
                    <input type="date" className="form-control" id="date" name="date" value={VisitsData.date} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="project" className="form-label">Proyecto</label>
                    <input type="email" className="form-control" id="project" name="project_id" value={VisitsData.project_id} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="specialist_id" className="form-label">Especialista</label>
                    <select
                        className="form-select"
                        id="specialist_id"
                        name="specialist_id"
                        value={VisitsData.specialist_id}
                        onChange={handleInputChange}
                    >
                        <option value="">Selecciona un especialista</option>
                        {specialists.map((specialist) => (
                            <option key={specialist.id} value={specialist.id}>
                                {specialist.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn btn-primary" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    );
};

Visits.propTypes = {
    match: PropTypes.object,
};
