import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const PerfilEspecialista = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function eliminaresp(id) {
        actions.eliminarEspecialista(id);
        navigate("/profileadmon");
    }

    return (
        <div className="container">
            {store.allspecialist.length === 0 ? (
                <h1>No tienes especialistas</h1>
            ) : (
                <>
                    {store.allspecialist.map((item, index) => {
                        return (
                            <div className="card-body d-flex align-items-start mb-4 border-bottom" key={index}>
                                <span className="me-4">
                                    <img
                                        src="https://as1.ftcdn.net/v2/jpg/04/56/58/14/1000_F_456581427_5XpGqNqCwLAGwaFFvxVGvnW2teOfJ0ZL.jpg"
                                        style={{ height: '140px' }}
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
                                        <button className="btn btn-primary btn-sm" style={{ marginTop: "5px" }}>Editar</button>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}

            <Link to="/perfilEspecialista">
                <button type="button" className="btn btn-outline-dark btn-sm">
                    Volver
                </button>
            </Link>
        </div>
    );
};



// {/* <div class="card-body">

// <span class="float-start m-2 me-4">

//     <img src="assets/images/users/avatar-2.jpg" style="height: 100px;" alt="avatar-2" class="rounded-circle img-thumbnail" />

// </span>

// <div class="">

//     <h4 class="mt-1 mb-1">{item.nombre}{item.apellido}</h4>

//     {/* <p class="font-13"> Authorised Brand Seller</p> */}




//     // <ul class="mb-0 list-inline">

//     //     <li class="list-inline-item me-3">

//     //         <h5 class="mb-1">{item.email}</h5>

//     //         {/* <p class="mb-0 font-13">Total Revenue</p> */}

//     //     </li>

//     //     <li class="list-inline-item">

//     //         <h5 class="mb-1">{item.area_de_desempeno}</h5>

//     //         <p class="mb-0 font-13">Number of Orders</p>

//     //     </li> */}

//     {/* </ul>

// </div>

// </div> */}