import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams, Link } from "react-router-dom";

export const CrearProyecto = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({ nameProject: "", theme: "", location: "" })
    const { id } = useParams();

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
            e.preventDefault()
        }
        else {
            actions.CreateProject(data);
            e.preventDefault()
        }
    };
    const infoSetData = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    return (
        <div className="mt-5">
            <select className="form-select" aria-label="Default select example">
                <option value="">Administrador</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Nombre Proyecto</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" onChange={infoSetData} name="nameProject" required value={data.nameProject} />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Temática</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" onChange={infoSetData} name="theme" required value={data.theme} />
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Ubicación</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" onChange={infoSetData} name="location" required value={data.location} />
            </div>

            <button type="button" className="btn btn-primary btn-lg" onClick={Send}>Crear Proyecto</button>

        </div>
    );
};

export default CrearProyecto;