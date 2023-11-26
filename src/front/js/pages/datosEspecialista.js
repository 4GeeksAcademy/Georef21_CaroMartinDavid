import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

export const DatosEspecialista = () => {
    const { store, actions } = useContext(Context);
    const [especialista, setEspecialistas] = useState([]);


    return (
        // <div className="container">


        //     <div className="card">
        //         <img src="https://static.vecteezy.com/system/resources/thumbnails/007/319/933/small/black-avatar-person-icons-user-profile-icon-vector.jpg" className="img-fluid w-25" alt="..." />
        //         <div className="card-body">
        //             <h3>nombre: {store.specialist.nombre}</h3>
        //             <h3>apellido: {store.specialist.apellido}</h3>
        //             <h3>email: {store.specialist.email}</h3>
        //             <h3>area_de_desempeno: {store.specialist.area_de_desempeno}</h3>
        //             <h3>profesion: {store.specialist.profesion}</h3>

        //         </div>
        //     </div>


        // </div>
        <div className="row">
   			<div className="col-xl-4 col-lg-5 d-flex m-auto">
       			<div className="card text-center m-3" style ={{backgroundColor:"#fff", border:"1px, solid, #dee2e6", width:"100%"}}>
           			<div className="card-body">
          				<img src={store.specialist.imageprofile} className="rounded-circle avatar-lg img-thumbnail" alt="profile-image"/>
						<h4 className="mb-0 mt-2">{store.specialist.nombre}</h4>
               	 		<p className="text-muted font-14">{store.specialist.area_de_desempeno}</p>
						 <Link to="/vInicial">
                 			<button type="button" className="btn btn-danger btn-sm mb-2">Volver</button>
						 </Link>
                  		<div className="text-start mt-3">
                   		<h4 className="font-13 text-uppercase">Sobre mi :</h4>
                  		<p className="text-muted font-13 mb-3">
							Hola soy  {store.specialist.nombre} {store.specialist.apellido}, soy {store.specialist.profesion}
                        </p>
                        <p className="text-muted mb-2 font-13">
							<strong>Nombre Completo :</strong> <span className="ms-2">{store.specialist.nombre} {store.specialist.apellido}</span>
						</p>
 						<p className="text-muted mb-2 font-13">
							<strong>Celular :</strong><span className="ms-2">(123)123 1234</span></p>

                        <p className="text-muted mb-2 font-13"><strong>Email :</strong> <span className="ms-2 ">{store.specialist.email}</span></p>

                        <p className="text-muted mb-1 font-13"><strong>Ubicación :</strong> <span className="ms-2">Colombia</span></p>
                    </div>

                    <ul className="social-list list-inline mt-3 mb-0">
                        <li className="list-inline-item">
                           <FaFacebook style={{color:"rgb(114, 124, 245)", fontSize:"30px"}} />
                        </li>
                        <li className="list-inline-item">
                           <FaGoogle style={{color: "rgb(250, 92, 124)",fontSize:"30px" }}/>
                        </li>
                        <li className="list-inline-item">
                            <AiFillTwitterCircle  style={{color: "rgb(57, 175, 209)",fontSize:"30px" }}/>
                        </li>
                        <li className="list-inline-item">
                            <FaGithub style={{color: "rgb(108, 117, 125)",fontSize:"30px" }}/>
                        </li>
                    </ul>
                </div> 
            </div> 
		</div>
		</div>
    );
};
