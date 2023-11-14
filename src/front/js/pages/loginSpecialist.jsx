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


    // const infoSetData = (e) => {
    //     setData({
    //         ...data, [e.target.name]: e.target.value
    //     })
    // }
    return (


        // <div className="account-pages1" >
        //     <div className="containerAdmon">
        //         <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5" >
        //             <div className="Administrador pt-4 pb-4 text-center bg-primary card-header col-md-6" style={{ color: 'white' }}>
        //                 <h1>Hola Especialista</h1>
        //             </div>
        //             <div class="text-center w-75 m-auto"><p class="text-muted mb-4">A continuación digite su correo electronico y password</p></div>
        //             <div className="datos col-md-6 d-flex flex-column align-items-center">
        //                 <form onSubmit={handlesubmit} className="text-center">
        //                     <div className="mb-3">
        //                         <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
        //                         <input type="email" placeholder="@" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
        //                     </div>
        //                     <div className="mb-3">
        //                         <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
        //                         <input type="password" className="form-control" name="password" id="exampleInputPassword1" />
        //                     </div>
        //                     <div className="d-flex justify-content-center py-3">
        //                         <button type="submit" className="btn btn-primary">Ingresar</button>
        //                         <Modal error={error} />
        //                     </div>
        //                 </form>
        //                 <div className="text-center">

        //                     <form onSubmit={handlesubmit}>
        //                 <div className="mb-3">
        //                     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        //                     <input type="email" onChange={infoSetData} name="email" required value={data.email} />
        //                 </div>
        //                 <div className="mb-3" >
        //                     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        //                     <input type="password" onChange={infoSetData} name="password" required value={data.password} />
        //                 </div > */}
        //                     {/* <button type="submit" className="btn btn-primary">Ingresar</button>

                            // <div className="botonVolver">
                            //     <Link to="/">
                            //         <button type="button" className="btn btn-outline-dark" style={{ backgroundColor: '#6169d0' }}>
                            //             Volver a Inicio
                            //         </button>
                            //     </Link>
                            // </div>
        <div className="account-pages1" >
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5" >
                <div className="containerAdmon">
                    <div className="Administrador pt-4 pb-4 text-center bg-primary card-header col-md-6" style={{ color: 'white' }}>
                        <h1>Hola Especialista</h1>
                    </div>

                    <div class="text-center w-75 m-auto"><p class="text-muted mb-4">A continuación digite su correo electronico y password</p></div>

                    <div className="datos col-md-6 d-flex flex-column align-items-center">
                        <form onSubmit={handlesubmit} className="text-center">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                                <input type="email" placeholder="@" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name="password" id="exampleInputPassword1" />
                            </div>
                            <div className="d-flex justify-content-center py-3">
                                <button type="submit" className="btn btn-primary">Ingresar</button>
                                <Modal error={error} />
                            </div>
                        </form>
                        <div className="text-center">
                            <Link to="/registerespicialist">
                                <span>Do you want to register</span>
                            </Link>
                        </div>
                        <div className="botonVolver">
                            <Link to="/">
                                <button type="button" className="btn btn-primary">
                                    Volver a Inicio
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    //     <Modal error={error} />

    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    );
};
