import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const CrearProyecto = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({ nameProject: "", theme: "", location: "" })
    const Send = (e) => {
        actions.CreateProject(data);
        e.preventDefault()
    };
    const infoSetData = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    return (
        <div className="mt-5">
            <select className="form-select" aria-label="Default select example">
                <option selected>Administrador</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            <div className="mb-3">
                <label for="formGroupExampleInput" className="form-label">Nombre Proyecto</label>
                <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input placeholder" onChange={infoSetData} name="nameProject" required value={data.nameProject} />
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" className="form-label">Temática</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" onChange={infoSetData} name="theme" required value={data.theme} />
            </div>
            <div className="mb-3">
                <label for="formGroupExampleInput2" className="form-label">Ubicación</label>
                <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input placeholder" onChange={infoSetData} name="location" required value={data.location} />
            </div>

            <button type="button" className="btn btn-primary btn-lg" onClick={Send}>Crear Proyecto</button>

        </div>
    );
};

export default CrearProyecto;