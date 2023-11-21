import React, { useState, useContext, useEffect} from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import {Map} from './map';
import { uploadFile } from "../../../firebase/config";
import { Modal } from "../component/modal";


export const DataCaptureRegister = () => {
    const { store, actions } = useContext(Context);
    const [error, seterror]= useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const [lastCoordinate, setLastCoordinate] = useState(null);

    const [dataCaptureData, setDataCaptureData] = useState({
        title: "",
        description: "",
        visit_id: "",
        specialist_id: ""
    });

    useEffect(() => {
        // console.log("id:", id);
        if (id) {

            // Si adminId está presente en la URL, llena el estado adminData con los datos del administrador a editar
            const datatoEdit = store.dataesp.find(dataEdit => dataEdit.id === parseInt(id));
            console.log(store.dataesp)
            if (datatoEdit) {
                setDataCaptureData(datatoEdit);
                
                console.log(dataCaptureData);
               
            }
        }
    }, [id, store.dataesp]);
    useEffect(() => {
        console.log("dataCaptureData actualizado:", dataCaptureData);
    }, [dataCaptureData]);

    

    const handleCoordinateChange = newCoordinate => {
        setLastCoordinate(newCoordinate);
      };

    async function  handlesubmit(e){
        e.preventDefault()
        const formdata = new FormData(e.target);
        const datos= {};
        for (const entrada of formdata.entries()){
            datos[entrada[0]]=entrada[1];
        } 
        console.log (datos);
        
        console.log(datos.image);
        if (id){
            if (datos.image.name!=""){
                console.log(" hay nombre archivo")
                try {
                    const respuesta = await uploadFile(datos.image, "visitas");
                    datos.image=respuesta;
            
                    }catch(error){
                        console.error(error);
                        seterror(error);
                        actions.openErrorlogin();
                    }
                    actions.putcapturedata(datos, id);
                    navigate("/vistaDatos");
            }else{
                console.log(datos);
                actions.putcapturedata(datos, id);
                navigate("/vistaDatos");
            }
        }else{
            if (lastCoordinate != null){
                console.log ("desde el formulario toma de datos", lastCoordinate);
            datos.georeferencing = lastCoordinate;
            }
            else{
                console.log("ubicacion del store sin modificar formulario", store.location)
                datos.georeferencing = store.location;
            }
            try {
                const respuesta = await uploadFile(datos.image, "visitas");
                datos.image=respuesta;
        
                }catch(error){
                    console.error(error);
                    seterror(error);
                    actions.openErrorlogin();
                }
            console.log(datos)
            actions.postcapturedata(datos);
            navigate("/vistaDatos");
            }
        }
    


return (
    <div className="container" >
         <h1>{id ? "Editar Datos": "Capturar Datos"}</h1>
        <div className="col-md-6">
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                        <label htmlFor="specialist_id" className="form-label">Especialista</label>
                        <select className="form-select" id="specialist_id" name="specialist_id" defaultValue={dataCaptureData.specialist_id}>                          
                            <option value={store.specialist.id}>
                                    Id: {store.specialist.id} | Nombre: {store.specialist.nombre} {store.specialist.apellido}| Email: {store.specialist.email}
                            </option>
                        </select>
                </div>

                <div className="mb-3">
                        <label htmlFor="visit_id" className="form-label">ID de la Visita</label>
                        <select className="form-select" id="visit_id" name="visit_id" defaultValue={dataCaptureData.visit_id}>                           
                            <option value="">Selecciona visita</option>
                            {store.allvisitsspc.map((visit, index) => (
                                <option key={index} value={visit.id}>
                                    Id: {visit.id} | Proyecto: {store.allprojectspc.filter(project => project.id ===visit.project_id)[0]?.nameProject}
                                </option>
                            ))}
                        </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" className="form-control" id="title" name="title" defaultValue={dataCaptureData.title} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea className="form-control" id="description" name="description" defaultValue={dataCaptureData.description} rows="2"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Imagen</label>
                    <input type="file" className="form-control" id="image" name="image"  />
                </div>
                { id ? <span> </span>:
                    <div className = "conteinerMap">
                        <p>Arrastra el marcador ó da click sobre el mapa para ajustar tu ubicación</p>
                        <Map onCoordinateChange={handleCoordinateChange}/>
                    </div>
                }
                <div>
                    <button className="btn btn-primary">Guardar</button>
                </div>
            </form>
                <Modal error={error}/>
                <Link to="/vistaDatos" className="btn btn-secondary">
                        Volver
                </Link>
            </div>
    </div>
    
);
};