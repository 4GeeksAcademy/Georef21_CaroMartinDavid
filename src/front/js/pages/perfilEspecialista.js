import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const PerfilEspecialista = () => {
    const { store, actions } = useContext(Context);
    
  
    return (
        <div className="container">
            {store.allspecialist.map((item, index) => {
                return (
                    <div className="card" key={index}>
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/007/319/933/small/black-avatar-person-icons-user-profile-icon-vector.jpg" className="img-fluid w-25" alt="..." />
                        <div className="card-body">
                            <h3>nombre: {item.nombre}</h3>
                            <h3>apellido: {item.apellido}</h3>
                            <h3>email: {item.email}</h3>
                            <h3>area_de_desempeno: {item.area_de_desempeno}</h3>
                            <h3>profesion: {item.profesion}</h3>
                            <button onClick={() => actions.eliminarEspecialista(item.id)}>Eliminar</button>
                            <Link to={`/registerespicialist/${item.id}`}>
                                <button >Editar</button>
                            </Link>
                        </div>
                        <Link to="/profileadmon">
					    <button type="button" className="btn btn-outline-dark">Volver</button>
				        </Link>
                    </div>
                );
            })}
        </div>
    );
};
