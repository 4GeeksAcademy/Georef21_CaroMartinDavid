import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import axios from "axios"; // Import Axios

export const Register = props => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [especialistaData, setEspecialistaData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        area_de_desempeno: "",
        profesion: "",
        password: ""
    });

    // useEffect(() => {
    //     axios.get("http://127.0.0.1:3001/api/especialista")
    //         .then(response => {

    //             setEspecialistaData(response.data);
    //         })
    //         .catch(error => {

    //         });
    // }, []);

    const handleInputChange = (e) => {
        setEspecialistaData({
            ...especialistaData,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async (especialistaData) => {
        console.log(especialistaData);
        try {
            const resp = await fetch('https://humble-succotash-qrwgx755w993x7p-3001.app.github.dev/admin/specialist/', {
                method: "POST",
                body: JSON.stringify(especialistaData),
                headers: { "Content-Type": "application/json" },
            });
            if (resp.ok) {
                // Mostrar una alerta cuando la respuesta es exitosa
                alert("Especialista creado con éxito");
                console.log("Especialista creado con éxito");
    
                // Restablecer los campos a sus valores iniciales
                setEspecialistaData({
                    nombre: "",
                    apellido: "",
                    email: "",
                    area_de_desempeno: "",
                    profesion: "",
                    password: ""
                });
            } else {
                console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
            }
        } catch (error) {
            console.error({ error });
            return;
        }
    };
    
    
    return (
        <div className="center-content">
            <div className="content-container">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={especialistaData.nombre} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="apellido" name="apellido" value={especialistaData.apellido} onChange={handleInputChange} />
                </div>


                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={especialistaData.email} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="area_de_desempeno" className="form-label">Area de desempeno</label>
                    <input type="text" className="form-control" id="area_de_desempeno" name="area_de_desempeno" value={especialistaData.area_de_desempeno} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="profesion" className="form-label">Profesion</label>
                    <input type="text" className="form-control" id="profesion" name="profesion" value={especialistaData.profesion} onChange={handleInputChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={especialistaData.password} onChange={handleInputChange} />
                </div>

                <button className="btn btn-primary" onClick={() => handleSave(especialistaData)}>
                    Save
                </button>

                {/* Agrega un botón que redirija a otra ruta */}
                <Link to="/perfilEspecialista" className="btn btn-secondary">
                    Especialistas
                </Link>
            </div>
        </div>
    );

};

Register.propTypes = {
    match: PropTypes.object
};