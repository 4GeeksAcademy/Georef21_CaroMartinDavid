import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const PerfilEspecialista = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function eliminaresp(id) {
        actions.eliminarEspecialista(id);
    }

    return (
        <div><h1 className="text-center mt-5">Especialistas</h1>
            <div className="containerEspecialista ">
                <div className="row">
                    {store.allspecialist.length === 0 ? (
                        <h1>No tienes especialistas</h1>
                    ) : (
                        <>
                            {store.allspecialist.map((item, index) => {
                                return (
                                    <div className="col-md-6 mb-4" key={index}>
                                        <div className="card-body d-flex align-items-start border" style={{ marginBottom: "20px" }}>
                                            <span className="me-4">
                                                <img
                                                    src={item.imageprofile}
                                                    style={{ width: '140px', height: '140px', objectFit: 'cover' }}
                                                    alt="avatar-2"
                                                    className="rounded-circle img-thumbnail"
                                                />
                                            </span>
                                            <div>
                                                <h5 className="mt-1 mb-1">{`${item.nombre} ${item.apellido}`}</h5>
                                                <p className="font-13">{item.email}</p>
                                                <ul className="mb-0 list-inline">
                                                    <li className="list-inline-item me-3">
                                                        <h5 className="mb-1">Profesion</h5>
                                                        <p className="mb-0 font-13">{item.profesion}</p>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <h5 className="mb-1">Area De Desempeño</h5>
                                                        <p className="mb-0 font-13">{item.area_de_desempeno}</p>
                                                    </li>
                                                </ul>
                                                <button onClick={() => eliminaresp(item.id)} className="btn btn-danger btn-sm me-2" style={{ marginTop: "5px" }}>
                                                    Eliminar
                                                </button>
                                                <Link to={`/registerespicialist/${item.id}`}>
                                                    <button className="btn buttonHome btn-sm" style={{ marginTop: "5px" }}>Editar</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}