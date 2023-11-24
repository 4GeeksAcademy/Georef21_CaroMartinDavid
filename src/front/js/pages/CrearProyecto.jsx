import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams, Link } from "react-router-dom";

export const CrearProyecto = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({ nameProject: "", theme: "", location: "" })
    const { id } = useParams();
    const navigate = useNavigate();

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

    const Send = (e) => {
        if (id) {
            actions.EditProject(id, data)
            actions.GetProjects()
            navigate("/profileadmon");
        }
        else {
            actions.CreateProject(data);
            navigate("/profileadmon");
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
                                    {/* <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="/">Hyper</a></li>
                        <li className="breadcrumb-item"><a href="/ui/forms/wizard">Forms</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Form Wizard</li>
                    </ol> */}
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


                                <form className>
                                    <div className="mb-3 mt-4 row">

                                        <label for="exampleName" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Administrador</label>

                                        <div className="col-md-9">

                                            <div className="form-select" style={{ width: "900px" }}>
                                                <option>{store.administrator.name} {store.administrator.lastname}</option>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label for="examplePassword" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Nombre Proyecto</label>
                                        <div className="col-md-9">
                                            <input name="examplePassword" placeholder="" type="password" id="examplePassword" className="form-control" value="" style={{ width: "900px", fontFamily: "Nunito,sans-serif", fontWeight: "bold" }} />
                                        </div>
                                    </div>
                                    <div className="mb-3 row">
                                        <label for="examplePassword" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Temática</label>
                                        <div className="col-md-9">
                                            <input name="examplePassword" placeholder="" type="text" id="examplePassword" className="form-control" value="" style={{ width: "900px", fontFamily: "Nunito,sans-serif", fontWeight: "bold" }} />
                                        </div>
                                    </div>

                                    <div className="mb-3 row">
                                        <label for="examplePassword" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Ubicación</label>
                                        <div className="col-md-9">
                                            <input name="examplePassword" placeholder="" type="password" id="examplePassword" className="form-control" value="" style={{ width: "900px" }} />
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
                                            <button type="button" className="btn-lg m-3 buttonHomeCP" onClick={() => Send()}>
                                                {id ? "Editar Proyecto" : "Crear Proyecto"}
                                            </button>
                                        </li>
                                    </ul>


                                </form>
                            </div>
                        </div>

                    </div>
                </div>

                {/* <footer className="footer footer-alt min-vh-10">
                             <div className="botonVolver">
                                 <Link to="/profileadmon">
                                     <button type="button" className="btn btn-primary">Volver</button>
                                 </Link>
                             </div>
                         </footer> */}

            </div>
        </div>

    );
};

export default CrearProyecto;