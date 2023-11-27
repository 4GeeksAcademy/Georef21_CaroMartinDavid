import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Modal } from "../component/modal";
import { ModalSuccess } from "../component/modalsuccess";

export const CrearProyecto = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({ nameProject: "", theme: "", location: "" })
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, seterror] = useState("");

    useEffect(() => {
        console.log("id:", id);
        if (id) {

            // Si adminId está presente en la URL, llena el estado adminData con los datos del administrador a editar
            const ProjectToEdit = store.AllProjects.find(ProjectToEdit => ProjectToEdit.id === parseInt(id));
            if (ProjectToEdit) {

                setData(ProjectToEdit);
            }
        }
    }, [id, store.AllProjects]);

   
    const Send = async (e) => {
        try {
            if (id) {
                const respuesta = await actions.EditProject(id, data);
                if (respuesta === "realizado") {
                    actions.GetProjects();
                    navigate("/listaproyectos");
                } else {
                    seterror(respuesta);
                    actions.openErrorlogin();
                }
            } else {
                const respuesta = await actions.CreateProject(data);
                if (respuesta === "realizado") {
                    actions.GetProjects();
                    actions.openSuccessM();
                } else {
                    seterror(respuesta);
                    actions.openErrorlogin();
                }
            }
        } catch (error) {
            seterror(respuesta);
            actions.openErrorlogin();
        }
    };
    

    const infoSetData = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
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
                            <h3 className="page-title mb-5" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", marginTop: "50px", fontWeight: "bold", marginLeft: "10px" }} >Proyectos</h3>

                        </div>
                    </div>
                </div>


                <div className="row-card">
                    <div className="col-xl-6">
                        <div className="card justify-content" style={{ width: "1175px", marginLeft: "10px", borderBlockColor: "black", border: "10px" }}>
                            <div className="card-body">
                                <h4 className="header-title mb-3" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }} >Nuevo Proyecto</h4>
                                <p>Para crear un proyecto deberás diligenciar el siguiente formulario estableciendo el nombre del proyecto, su temática (es decir, si es de infraestructura, o de energía, o ambiental o mineroenergético) y su ubicación (es decir, zona de influencia donde se llevarán a cabo las actividades por parte del especialista vinculado al proyecto) </p>


                                <div>
                                    <div className="mb-3 mt-4 row">

                                        <label htmlFor="exampleName" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Administrador</label>

                                        <div className="col-md-9">

                                            <div className="form-select" style={{ width: "900px" }}>
                                                <option>{store.administrator.name} {store.administrator.lastname}</option>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="examplePassword" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Nombre Proyecto</label>
                                        <div className="col-md-9">
                                            <input name="nameProject" id="formGroupExampleInput" placeholder="Nombre" onChange={infoSetData} required value={data.nameProject} type="text" className="form-control" style={{ width: "900px", fontFamily: "Nunito,sans-serif", fontWeight: "bold" }} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label htmlFor="examplePassword" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Temática</label>
                                        <div className="col-md-9">
                                            <input name="theme" placeholder="Temática" onChange={infoSetData} required value={data.theme} type="text" id="formGroupExampleInput2" className="form-control" style={{ width: "900px", fontFamily: "Nunito,sans-serif", fontWeight: "bold" }} />
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label htmlFor="examplePassword" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Ubicación</label>
                                        <div className="col-md-9">
                                            <input name="location" placeholder="Ubicación" onChange={infoSetData} required value={data.location} type="text" id="formGroupExampleInput2" className="form-control" style={{ width: "900px" }} />
                                        </div>
                                    </div>

                                    <ul className="list-inline wizard mb-0 d-flex justify-content-between align-items-center">
                                        <li className="list-inline-item">
                                            <Link to="/profileadmon">
                                                <button type="button" className="btn-lg buttonHomeCP-Volver">
                                                    Volver
                                                </button>
                                            </Link>
                                        </li>

                                        <li className="list-inline-item">
                                            <button type="submit" className="btn-lg m-3 buttonHomeCP" onClick={() => Send()}>
                                                {id ? "Editar Proyecto" : "Crear Proyecto"}
                                            </button>
                                        </li>
                                    </ul>
                                    
                                </div>
                                <Modal error={error} />
                                {id? <span></span>:<ModalSuccess tema="proyecto"/>}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    );
};

export default CrearProyecto;