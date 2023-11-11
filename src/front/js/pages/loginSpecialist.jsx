import React, { useState, useEffect, useContext } from "react";

import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Modal } from "../component/modal";

export const LoginSpecialist = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { store, actions } = useContext(Context);
    const [data, setData] = useState({ email: "", password: "" })

    const navigate = useNavigate();
    const [error, seterror] = useState("");
    // function sendData(e) {
    //     e.preventDafault()
    //     console.log('data')
    // console.log('email, password')
    // const datos = {email: "",}
    // actions.loginSpecialist(data)

    // navigate("//perfilEspecialista")
    // }

    async function handlesubmit(e) {
        e.preventDefault()
        const formdata = new FormData(e.target);
        const specialistlogin = {};
        for (const entrada of formdata.entries()) {
            specialistlogin[entrada[0]] = entrada[1];
        }
        const response = await actions.loginSpecialist(specialistlogin);
        if (response === "autorizado") {
            navigate("/vInicial")
        } else {
            console.log("error desde front " + response.msg);
            seterror(response.msg);
            actions.openErrorlogin();
        }
        console.log(specialistlogin)
    }


    const infoSetData = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        })
    }
    return (
        <nav className="">
            <div className="container">
                <h1>Formulario</h1>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={infoSetData} name="email" required value={data.email} />
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" onChange={infoSetData} name="password" required value={data.password} />
                    </div >
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                    <Modal error={error} />
                </form>

            </div>
        </nav>
    );
};
