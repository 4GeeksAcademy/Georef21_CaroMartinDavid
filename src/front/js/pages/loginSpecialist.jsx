import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams, Link } from "react-router-dom";

export const loginSpecialist = () => {
    const { store, actions } = useContext(Context);
    const [data, setData] = useState({ email: "", password: "" })
    const { id } = useParams();

    useEffect(() => {
        console.log("id:", id);
        if (id) {

            // Si adminId está presente en la URL, llena el estado adminData con los datos del administrador a editar
            const SpecialistToLogin = store.AllSpecialist.find(SpecialistToLogin => SpecialistToLogin.id === parseInt(id));
            if (SpecialistToLogin) {

                setData(SpecialistToLogin);
            }
        }
    }, [id, store.AllSpecialist]);

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
            <div class="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={infoSetData} name="email" required value={data.email} />
            </div>   
            <div className="mb-3">
                <label for="inputPassword5" className="form-label">Password</label>
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" onChange={infoSetData} name="password" required value={data.password}/>
                <div id="passwordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </div>

            </div>

            <button type="button" className="btn btn-primary btn-lg" onClick={Send}>Ingresar</button>

        </div>
    );
};

export default loginSpecialist;

