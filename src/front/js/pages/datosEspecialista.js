import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const DatosEspecialista = () => {
    const { store, actions } = useContext(Context);
    const [especialista, setEspecialistas] = useState([]);


    return (
        <div className="container">


            <div className="card">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/007/319/933/small/black-avatar-person-icons-user-profile-icon-vector.jpg" className="img-fluid w-25" alt="..." />
                <div className="card-body">
                    <h3>nombre: {store.specialist.nombre}</h3>
                    <h3>apellido: {store.specialist.apellido}</h3>
                    <h3>email: {store.specialist.email}</h3>
                    <h3>area_de_desempeno: {store.specialist.area_de_desempeno}</h3>
                    <h3>profesion: {store.specialist.profesion}</h3>

                </div>
            </div>


        </div>
    );
};
