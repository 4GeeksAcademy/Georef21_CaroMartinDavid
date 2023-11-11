import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";

export const LoginSpecialist = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { store, actions } = useContext(Context);
    const [data, setData] = useState({ email: "", password: "" })
    
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDafault()
        console.log('SendData')
        console.log('email, password')
        const datos = {email: "",}
        actions.loginSpecialist(data)
    }
    const infoSetData = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    return (
    <nav className= "">
        <div className="container">
            <h1>Formulario</h1>
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onChange={infoSetData} name="email" required value={data.email} />
                </div>
                <div className="mb-3" >
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onChange={infoSetData} name="password" required value={data.password} />
                </div >
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>

        </div>
    </nav>
    );
};
