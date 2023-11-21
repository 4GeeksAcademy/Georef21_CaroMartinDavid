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
        <div className="account-pages1" >
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5" >
                <div className="RegistroProyecto pt-2 text-center bg-primary card-header col-md-6" style={{ color: 'white' }} width-400px>
                    <h1>{id ? "Editar Proyecto" : "Registrar Nuevo Proyecto"}</h1>
                </div>
                <div className="containerAdmon">
                    {/* <div className="RegistroProyecto pt-2 text-center bg-primary card-header col-md-6" style={{ color: 'white' }} width-400px>
                        <h1>{id ? "Editar Proyecto" : "Registrar Nuevo Proyecto"}</h1>
                    </div> */}
                    {/* <div className="col-md-6 m-auto"> */}

                    <div className="datos col-md-6 d-flex flex-column align-items-center">
                        <p>Administrador</p>
                        <select className="form-select" aria-label="Default select example">
                            <option value="">{store.administrator.name} {store.administrator.lastname}</option>
                        </select>
                        <div className="mb-3" >
                            <label htmlFor="formGroupExampleInput" className="form-label">Nombre Proyecto</label>
                            <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Nombre" onChange={infoSetData} name="nameProject" required value={data.nameProject} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Temática</label>
                            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Temática" onChange={infoSetData} name="theme" required value={data.theme} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label">Ubicación</label>
                            <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Ubicación" onChange={infoSetData} name="location" required value={data.location} />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary" onClick={() => Send()}>{id ? "Editar Proyecto" : "Crear Proyecto"}</button>
                        </div>
                        {/* <Link to="/profileadmon">
                        <button type="button" className="btn btn-primary">Volver</button>
                    </Link> */}
                        <footer className="footer footer-alt min-vh-10">
                            <div className="botonVolver">
                                <Link to="/profileadmon">
                                    <button type="button" className="btn btn-primary">Volver</button>
                                </Link>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    );
};

export default CrearProyecto;