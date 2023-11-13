import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PerfilVisitas = () => {
    const { store, actions } = useContext(Context);
    const [visitas, setVisitas] = useState([]);

    const fetchVisitas = async () => {
        let baseUrl = `https://studious-potato-ww66x4qwvg5fv4xp-3001.app.github.dev/api/visits`;
        try {
            let response = await fetch(baseUrl);
            if (!response.ok) return response.status;

            let data = await response.json();
            console.log(data);
            setVisitas(data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarVisita = async (id) => {
        let deleteUrl = `https://studious-potato-ww66x4qwvg5fv4xp-3001.app.github.dev/api/visits/${id}`;
        try {
            let response = await fetch(deleteUrl, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchVisitas();
            } else {
                console.error("Error al eliminar la visita");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchVisitas();
    }, []); // Run once on component mount

    return (
        <div className="container">
            {visitas.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        <div className="card-body">
                            <h3>Id: {item.id}</h3>
                            <h3>Fecha: {item.date}</h3>
                            <h3>Alcance: {item.scope}</h3>
                            <h3>ID Proyecto: {item.project?.id || "No asignado"}</h3>
                            <h3>ID Especialista: {item.specialist?.id || "No asignado"}</h3>
                            <button onClick={() => eliminarVisita(item.id)}>Eliminar</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
