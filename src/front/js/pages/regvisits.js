import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from "../component/modal";

export const RegVisits = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [visitsData, setVisitsData] = useState({
        scope: "",
        date: "",
        project_id: "",
        specialist_id: ""
    });

    const [error, seterror] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {

        if (id) {
            const visitToEdit = store.allvisits.find(visit => visit.id === parseInt(id));
            if (visitToEdit) {
                visitToEdit.date = new Date(visitToEdit.date).toISOString().slice(0, 10);
                visitToEdit.specialist_id = "";
                visitToEdit.project_id = "";

                setVisitsData(visitToEdit);
            }

        }
    }, [id, store.allvisits]);

    const handleInputChange = (e) => {
        setVisitsData({
            ...visitsData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async (data, id) => {
        console.log(data)
        if (id) {
            try {
                const respuesta = await actions.putvisitaadmon(data, id);
                actions.getEspecialista();
                actions.GetProjects();
                if (respuesta === "realizado") {
                    setVisitsData({
                        scope: "",
                        date: "",
                        project_id: "",
                        specialist_id: ""
                    }
                    

                    );

                    actions.gevisitaadmon();

                    navigate("/profileadmon");
                } else {
                    seterror(respuesta);
                    actions.openErrorlogin();
                }
            } catch (error) {

                seterror(error.message || "Error desconocido");
                actions.openErrorlogin();
                console.error(error);
            }

        } else {
            try {
                const respuesta = await actions.registrovisita(data);
                if (respuesta === "realizado") {
                    setVisitsData({
                        scope: "",
                        date: "",
                        project_id: "",
                        specialist_id: ""
                    }
                    );
                    
                    actions.gevisitaadmon();

                    navigate("/profileadmon");
                } else {
                    seterror(respuesta);
                    actions.openErrorlogin();
                }
            } catch (error) {

                seterror(error.message || "Error desconocido");
                actions.openErrorlogin();
                console.error(error);
            }
        }

    };

    return (
        <div className="center-content">
            <div className="Contanier-fluid" style={{ height: "100vh", marginLeft: "10px" }}>
                <div className="row">
                    <div className="col">
                        <div className="page-title-box">
                            <div className="page-title-right">
                                <nav aria-label="breadcrumb">

                                </nav>
                            </div>
                            <h3 className="page-title mb-5" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", marginTop: "50px", fontWeight: "bold", marginLeft: "10px" }} >Visitas</h3>

                        </div>
                    </div>
                </div>

                <div className="row-card">
                    <div className="col-xl-6">
                        <div className="card justify-content" style={{ width: "1175px", marginLeft: "10px", borderBlockColor: "black", border: "10px" }}>
                            <div className="card-body">
                                <h4 className="header-title mb-3" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }} >Nueva Visita</h4>
                                <p>Para crear una visita deberás diligenciar el siguiente formulario estableciendo el alcance, la fecha en la que se realizará la visita por parte del especialista vinculado al proyecto, el nombre del proyecto y el especialista al que se le asignará la visita</p>

                                <form className>

                                    <div className="mb-3 mt-4 row">
                                        <label htmlFor="scope" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Alcance</label>
                                        <input type="text" className="form-control" id="scope" name="scope" value={visitsData.scope} onChange={handleInputChange} style={{ width: "900px" }} />
                                    </div>


                                    <div className="mb-3 mt-4 row">
                                        <label htmlFor="date" className="form-label col-form-label col-md-2" >Fecha</label>
                                        <input type="date" className="form-control" id="date" name="date" value={visitsData.date} onChange={handleInputChange} style={{ width: "900px" }} />
                                    </div>



                                    <div className="mb-3 mt-4 row">
                                        <label htmlFor="project_id" className="form-label col-form-label col-md-2">Proyecto</label>
                                        <select
                                            className="form-select"
                                            id="project_id"
                                            name="project_id"
                                            value={visitsData.project_id}
                                            onChange={handleInputChange} style={{ width: "900px" }}
                                        >
                                            <option value="">Selecciona un proyecto</option>
                                            {store.AllProjects.map((project, index) => (
                                                <option key={index} value={project.id}>
                                                    Id: {project.id} | Nombre: {project.nameProject}| ubicación: {project.location}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mb-3 mt-4 row">
                                        <label htmlFor="specialist_id" className="form-label col-form-label col-md-2">Especialista</label>
                                        <select
                                            className="form-select"
                                            id="specialist_id"
                                            name="specialist_id"
                                            value={visitsData.specialist_id}
                                            onChange={handleInputChange} style={{ width: "900px" }}
                                        >
                                            <option value="">Selecciona un especialista</option>
                                            {store.allspecialist.map((specialist, index) => (
                                                <option key={index} value={specialist.id}>
                                                    Id: {specialist.id} | Nombre: {specialist.nombre} {specialist.apellido}| Email: {specialist.email}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    <ul className="list-inline wizard mb-0 d-flex justify-content-between align-items-center">

                                        <li className="list-inline-item">
                                            <Link style={{ textDecoration: 'none' }} to="/profileadmon" className="btn-lg buttonHomeCP-Volver">
                                                Volver
                                            </Link>
                                        </li>

                                        <li className="list-inline-item">
                                            <button className="btn-lg buttonHomeCP" onClick={() => { handleSave(visitsData, id) }}>
                                                Crear Visita
                                            </button>
                                            <Modal error={error} />
                                        </li>


                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    );
};

