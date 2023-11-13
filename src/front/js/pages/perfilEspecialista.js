import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const PerfilEspecialista = () => {
    const { store, actions } = useContext(Context);
    const [especialista, setEspecialistas] = useState([]);

    const fetchEspecialista = async () => {
        let baseUrl = `https://opulent-rotary-phone-4x446rp4x493j7r7-3001.app.github.dev/api/especialista`;
        try {
            let response = await fetch(baseUrl);
            if (!response.ok) return response.status;

            let data = await response.json();
            console.log(data);
            setEspecialistas(data);
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarEspecialista = async (id) => {
        // Realizar una solicitud DELETE a la API para eliminar al especialista con el ID proporcionado.
        let deleteUrl = `https://opulent-rotary-phone-4x446rp4x493j7r7-3001.app.github.dev/api/especialista/${id}`;
        try {
            let response = await fetch(deleteUrl, {
                method: "DELETE",
            });
            if (response.ok) {
                // Es posible que desees mostrar un mensaje o actualizar la lista de especialistas después de la eliminación.
                fetchEspecialista();
            } else {
                console.error("Error al eliminar al especialista");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEspecialista();
    }, []);

    return (
        <div className="container">
            {especialista.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/007/319/933/small/black-avatar-person-icons-user-profile-icon-vector.jpg" className="img-fluid w-25" alt="..." />
                        <div className="card-body">
                            <h3>nombre: {item.nombre}</h3>
                            <h3>apellido: {item.apellido}</h3>
                            <h3>email: {item.email}</h3>
                            <h3>area_de_desempeno: {item.area_de_desempeno}</h3>
                            <h3>profesion: {item.profesion}</h3>
                            <h3>password: {item.password}</h3>
                            <button onClick={() => eliminarEspecialista(item.id)}>Eliminar</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
