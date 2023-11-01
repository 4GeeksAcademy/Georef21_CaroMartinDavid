import React , { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const RegAdmon = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    async function handlesubmit(e){
        e.preventDefault()
        const formdata = new FormData(e.target);
        const adminregistro= {};
        for (const entrada of formdata.entries()){
            adminregistro[entrada[0]]=entrada[1];
        }
        await actions.postadmin(adminregistro);
        actions.getadmins();
        navigate("/")
    }
	return (
        <div className="col-md-6">
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" name="name" aria-describedby="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="lastname" name="lastname" aria-describedby="lastname"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="dateborn" className="form-label">Fecha de nacimiento</label>
                    <input type="date" className="form-control" id="dateborn" name="birthday" aria-describedby="dateborn"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Correo electronico</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="charge" className="form-label">Cargo</label>
                    <input type="text" className="form-control" id="charge" name="position" aria-describedby="charge"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="exampleInputPassword1"/>
                </div>
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" name="aditional_info" style={{height: '100px'}}></textarea>
                    <label htmlFor="floatingTextarea2">Información adicional</label>
                </div>
                <div className="d-flex justify-content-center py-3">
                    <button type="submit" className="btn btn-primary">Crear</button>
                </div>
            </form>
        </div>
	    );
};
