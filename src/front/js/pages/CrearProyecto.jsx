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
        <div className="Contanier-fluid" style={{height: "100vh", marginLeft: "10px" }}>
            <div className="row">
                <div className="col">
                    <div class="page-title-box">
                        <div class="page-title-right">
                            <nav aria-label="breadcrumb">
                                {/* <ol class="breadcrumb m-0">
                        <li class="breadcrumb-item"><a href="/">Hyper</a></li>
                        <li class="breadcrumb-item"><a href="/ui/forms/wizard">Forms</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Form Wizard</li>
                    </ol> */}
                            </nav>
                        </div>
                        <h4 class="page-title" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", marginTop: "100px"}} >PROYECTOS</h4>
                    </div>
                </div>
            </div>


            <div className="row-card">
                <div className="col-xl-6">
                    <div className="card" style={{width: "1200px"}}>
                        <div className="card-body">
                            <h4 className="header-title mb-3" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif" }} >NUEVO PROYECTO</h4>
                            <form className>
                                <div className="mb-3 row">
                                    
                                    <label for="exampleEmail" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif" }}>Administrador</label>
                                    
                                    <div className="col-md-9">

                                        <input name="exampleEmail" placeholder="Enter email" type="email" id="exampleEmail" className="form-control" style={{width: "700px"}}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="examplePassword" class="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif" }}>Nombre Proyecto</label>
                                    <div class="col-md-9">
                                        <input name="examplePassword" placeholder="password placeholder" type="password" id="examplePassword" class="form-control" value="12345" style={{width: "700px", fontFamily: "Nunito,sans-serif"}}/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label for="examplePassword" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif" }}>Temática</label>
                                    <div className="col-md-9">
                                        <input name="examplePassword" placeholder="password placeholder" type="password" id="examplePassword" className="form-control" value="12345" style={{width: "700px", fontFamily: "Nunito,sans-serif"}}/>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label for="examplePassword" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif" }}>Ubicación</label>
                                    <div className="col-md-9">
                                        <input name="examplePassword" placeholder="password placeholder" type="password" id="examplePassword" class="form-control" value="12345" style={{width: "700px"}}/>
                                    </div>
                                </div>

                                <ul class="list-inline wizard mb-0 d-flex justify-content-center">
                                    <li class="next list-inline-item float-end">
                                    <button type="button" className="btn btn-primary" onClick={() => Send()}>{id ? "Editar Proyecto" : "Crear Proyecto"}</button>
                                    </li>
                                    
                                    <li>
                                    <Link to="/profileadmon">
                                     <button type="button" className="btn btn-primary">Volver</button>
                                 </Link>
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

    );
};

export default CrearProyecto;