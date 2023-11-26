import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal } from "../component/modal";
import { ModalSuccess } from "../component/modalsuccess";
import { uploadFile } from "../../../firebase/config";

export const Register = props => {
    const { store, actions } = useContext(Context);
    const [especialistaData, setEspecialistaData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        area_de_desempeno: "",
        profesion: "",
        password: ""
    });
    const navigate = useNavigate();
    const [error, seterror] = useState("");
    const { id } = useParams();

    useEffect(() => {
        // console.log("id:", id);
        if (id) {

            // Si adminId está presente en la URL, llena el estado adminData con los datos del administrador a editar
            const specialistToEdit = store.allspecialist.find(specialistToEdit => specialistToEdit.id === parseInt(id));
            if (specialistToEdit) {
                setEspecialistaData(specialistToEdit);
            }
        }
    }, [id, store.allspecialist]);

    const handleInputChange = (e) => {
        const imageFile = e.target.querySelector('input[name="imageprofile"]').files[0];
        console.log(imageFile)
        setEspecialistaData({
            ...especialistaData,
            [e.target.name]: e.target.value
        });

    };

    const handlesave = async (e) => {
        e.preventDefault()
        e.persist();
        const formdata = new FormData(e.target);
        const specialistregistro = {};
        for (const entrada of formdata.entries()) {
            specialistregistro[entrada[0]] = entrada[1];
        }

        if (id) {
            if(specialistregistro.imageprofile.name != ""){
                try {
                    const urlimage = await uploadFile(specialistregistro.imageprofile, "specialist");
                    specialistregistro.imageprofile = urlimage;
                    const data = specialistregistro;
                    const respuesta = await actions.putespecialist(id, data);
                    if(respuesta==="realizado"){
                        actions.getEspecialista();
                        navigate("/perfilEspecialista");
                    }else{
                        seterror(respuesta);
                        actions.openErrorlogin();
                    }
                } catch (error) {
                    console.error(error);
                    seterror(error);
                    actions.openErrorlogin();
                }
            }
            else{
                delete specialistregistro.imageprofile;
                const data = specialistregistro;
                const respuesta = await actions.putespecialist(id, data);
                if(respuesta==="realizado"){
                    actions.getEspecialista();
                    navigate("/perfilEspecialista");
                }else{
                    seterror(respuesta);
                    actions.openErrorlogin();
                }
            }
        } else {
            try {
                const urlimage = await uploadFile(specialistregistro.imageprofile, "specialist");
                specialistregistro.imageprofile = urlimage;
                console.log(urlimage);
            } catch (error) {
                console.error(error);
                seterror(error);
                actions.openErrorlogin();
            }

            const respuesta = await actions.postespecialist(specialistregistro);
            if (respuesta === "realizado") {
                actions.getEspecialista();
                actions.openSuccessM();
                
            } else {
                seterror(respuesta);
                actions.openErrorlogin();
            }
        }
        console.log(specialistregistro)
    }


    return (
        <div className="center-content">

            <div className="Contanier-fluid" style={{ height: "100vh", marginLeft: "10px" }}>
                <div className="row">
                    <div className="col">
                        <div className="">
                            <div className="page-title-right">
                                <nav aria-label="breadcrumb">
                                </nav>
                                <div>
                                    <h3 className="page-title mb-5" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", marginTop: "50px", fontWeight: "bold", marginLeft: "10px" }} >{id ? "Editar Especialista" : "Especialista"} </h3>
                                </div>
                            </div>
                        </div>


                        <div className="row-card">
                            <div className="col-xl-6">
                                <div className="card justify-content" style={{ width: "1175px", marginLeft: "10px", borderBlockColor: "black", border: "10px" }}>
                                    <div className="card-body">
                                        <h4 className="header-title mb-3" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }} >Nuevo Especialista</h4>

                                        <form onSubmit={handlesave}>
                                            <div>
                                                <div className="mb-3 mt-4 row">
                                                    <label htmlFor="nombre" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Nombre</label>
                                                    <input type="text" className="form-control" id="nombre" name="nombre" defaultValue={especialistaData.nombre} style={{ width: "900px" }} />
                                                </div>

                                                <div className="mb-3 mt-4 row">
                                                    <label htmlFor="apellido" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Apellido</label>
                                                    <input type="text" className="form-control" id="apellido" name="apellido" defaultValue={especialistaData.apellido} style={{ width: "900px" }} />
                                                </div>


                                                <div className="mb-3 mt-4 row">
                                                    <label htmlFor="email" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Email</label>
                                                    <input type="email" className="form-control" id="email" name="email" defaultValue={especialistaData.email} style={{ width: "900px" }} />
                                                </div>

                                                <div className="mb-3 mt-4 row">
                                                    <label htmlFor="area_de_desempeno" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Area de desempeño</label>
                                                    <input type="text" className="form-control" id="area_de_desempeno" name="area_de_desempeno" defaultValue={especialistaData.area_de_desempeno} style={{ width: "900px" }} />
                                                </div>

                                                <div className="mb-3 mt-4 row">
                                                    <label htmlFor="profesion" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Profesión</label>
                                                    <input type="text" className="form-control" id="profesion" name="profesion"
                                                        defaultValue={especialistaData.profesion} style={{ width: "900px" }} />
                                                </div>
                                                {id ? <span></span> :
                                                    <>
                                                        <div className="mb-3  mt-4 row">
                                                            <label htmlFor="password" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Password</label>
                                                            <input type="password" className="form-control" id="password" name="password" defaultValue={especialistaData.password} style={{ width: "900px" }} />
                                                        </div>
                                                      
                                                    </>
                                                }
                                                  <div className="mb-3 mt-4 row">
                                                            <label htmlFor="imagen" className="form-label col-form-label col-md-2" style={{ color: '#6c757d', fontFamily: "Nunito,sans-serif", fontWeight: "bold" }}>Imagen</label>
                                                            <input type="file" className="form-control" id="imagen" name="imageprofile" defaultValue={especialistaData.imageprofile} />
                                                    </div>
                                            </div>


                                            <ul className="list-inline wizard mb-0 d-flex justify-content-between align-items-center">

                                            <li className="list-inline-item">
                                                    <Link to="/profileadmon">
                                                        <button type="button" className="btn-lg m-3 buttonHomeCP-Volver">Volver</button>
                                                    </Link>
                                                </li>

                                                <li className="list-inline-item">
                                                    <button type="submit" className="btn-lg m-3 buttonHomeCP">
                                                        {id ? "Editar" : "Crear Especialista"}
                                                    </button>

                                                    <Modal error={error} />
                                                    {id? <span></span>:<ModalSuccess tema="usuario especialista"/>}
                                                </li>

                                                


                                            </ul>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );

};

Register.propTypes = {
    match: PropTypes.object
};