import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "../../styles/admon.css";

import { Context } from "../store/appContext";
import { FaLocationDot, FaPhoneFlip, FaEnvelope, FaTrashCan,FaPencil } from "react-icons/fa6";

export const ProfileAdmon = () => {
	const { store, actions } = useContext(Context);

		
	return (
		<div className="container">
			<h1>Bienvenido {store.administrator.name}</h1>
			<div>
                <h1>Proyectos</h1>
                <div className ="d-flex justify-content-evenly">
                    <button>
                        Crear Proyectos
                    </button>
                    <button>
                        Proyectos
                    </button>
                </div>

            </div>
            <div>
                <h1>Especialistas</h1>
                    <div className ="d-flex justify-content-evenly">
                        <button>
                            Crear Especialista
                        </button>
                        <button>
                            Especialistas
                        </button>
                    </div>
            </div>
            <div>
                <h1>Visitas</h1>
                        <div className ="d-flex justify-content-evenly">
                            <button>
                                Crear Visitas
                            </button>
                            <button>
                                Visitas
                            </button>
                        </div>
            </div>
				
		</div>
	);
};
