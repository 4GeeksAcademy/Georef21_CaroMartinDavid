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



    return (
        
        <div className="d-flex justify-content-center row" >
            <div className = "col-md-4 col-sm-8 my-4" >
                    <div className="text-center bg-primary card-header col-sm-7 col-md-12 p-4" style={{ color: 'white' }}>
                        <h1>Hola Especialista</h1>
                    </div>
                <div className="col-sm-8 col-md-12 containerAdmon d-flex justify-content-center ">
                    <div className="row">
                        <div className="text-center  m-auto  col-sm-12 col-md-12 py-1">
                            <p className="text-muted my-4">A continuación digite su correo electronico y password</p>
                        </div>
                    </div>
                    <div className="row col-md-12">
                        <div className="col-md-12 col-sm-12 d-flex flex-column align-items-center">
                            <form onSubmit={handlesubmit} className="text-center col-10">
                                <div className=" mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                                    <input type="email" placeholder="@" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
                                </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name="password" id="exampleInputPassword1" />
                            </div>
                            <div className="d-flex justify-content-center py-3">
                                <button type="submit" className="btn btn-outline-secondary buttonHome">Ingresar</button>
                                <Modal error={error} />
                            </div>
                            </form>
                        </div>
                    </div>
                        <div className="botonVolver">
                            <Link to="/">
                                <button type="button" className="btn btn-outline-secondary" disabled>
                                    Volver a Inicio
                                </button>
                            </Link>
                        </div>
                    
                
            
            </div>
            <Modal error={error} />
        </div>
     </div>

   
                
    
    );
};
