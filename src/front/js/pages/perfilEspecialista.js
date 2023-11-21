import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const PerfilEspecialista = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function eliminaresp(id) {
        actions.eliminarEspecialista(id);
        navigate("/profileadmon")
    }

    return (
        <div className="container">
            {store.allspecialist.length == 0 ? <h1>No tienes especialistas</h1> :
                <>
                    {store.allspecialist.map((item, index) => {
                        return (
                            <div class="card-body">
                                <span class="float-start m-2 me-4">
                                    <img src="assets/images/users/avatar-2.jpg" style="height: 100px;" alt="avatar-2" class="rounded-circle img-thumbnail" />
                                </span>
                                <div class="">
                                    <h4 class="mt-1 mb-1">{item.nombre}{item.apellido}</h4>
                                    {/* <p class="font-13"> Authorised Brand Seller</p> */}

                                    <ul class="mb-0 list-inline">
                                        <li class="list-inline-item me-3">
                                            <h5 class="mb-1">{item.email}</h5>
                                            {/* <p class="mb-0 font-13">Total Revenue</p> */}
                                        </li>
                                        <li class="list-inline-item">
                                            <h5 class="mb-1">{item.area_de_desempeno}</h5>
                                            <p class="mb-0 font-13">Number of Orders</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </>
            }
            <Link to="/profileadmon">
                <button type="button" className="btn btn-outline-dark">Volver</button>
            </Link>
        </div>
    );
};
{/* <div class="card-body">
    <span class="float-start m-2 me-4">
        <img src="assets/images/users/avatar-2.jpg" style="height: 100px;" alt="avatar-2" class="rounded-circle img-thumbnail" />
    </span>
    <div class="">
        <h4 class="mt-1 mb-1">{item.nombre}{item.apellido}</h4>
        {/* <p class="font-13"> Authorised Brand Seller</p> */}

        // <ul class="mb-0 list-inline">
        //     <li class="list-inline-item me-3">
        //         <h5 class="mb-1">{item.email}</h5>
        //         {/* <p class="mb-0 font-13">Total Revenue</p> */}
        //     </li>
        //     <li class="list-inline-item">
        //         <h5 class="mb-1">{item.area_de_desempeno}</h5>
        //         <p class="mb-0 font-13">Number of Orders</p>
        //     </li> */}
        {/* </ul>
    </div>
</div> */}