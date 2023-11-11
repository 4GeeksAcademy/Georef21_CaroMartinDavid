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
        <div className="col-md-6 m-auto">
            <div className="d-flex justify-content-center my-3">
                <h1>{id? "Editar Proyecto":"Registrar Nuevo Proyecto"}</h1>
            </div>
            <p>Administrador</p>
            <select className="form-select" aria-label="Default select example">
                <option value="">{store.administrator.name} {store.administrator.lastname}</option>
            </select>
            <div className="mb-3">
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
                <button type="button" className="btn btn-primary btn-lg" onClick={()=>Send()}>{id? "Editar Proyecto":"Crear Proyecto"}</button>
            </div>
            <Link to="/profileadmon">
					<button type="button" className="btn btn-outline-dark">Volver</button>
			</Link>
        </div>
    );
};

export default CrearProyecto;