import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { BsPersonCircle } from "react-icons/bs";
import { ModalEliminarAdmon } from "./modalEliminaradmon";
import LogoGeoref21 from '../../img/LogoGeoref21.png';

export const NavbarPerfilAdmon = () => {
	const { store, actions } = useContext(Context);


	return (
		<nav className="navbar navbar-expand-lg Navbarhome" >
			<div className="container-fluid d-flex d-flex justify-content-between"  >
				<div className="col-3">
				<a className="navbar-brand" href="/">
					<img src={LogoGeoref21} width="135" height="40" alt="Logo" />
				</a>
				</div>
				
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      				<span className="navbar-toggler-icon"></span>
    			</button>
				
				{store.session === true || store.sessionSpecialist === true ? <span></span> :
				<div className="collapse navbar-collapse col-9" id="navbarSupportedContent" >
					<div className ="ms-auto">
					<ul className="navbar-nav" style={{ marginRight: "20px" }}>
						<li className="nav-item">
							<a className="nav-link active navInicio" aria-current="page" href="/">Inicio</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="admonLog">Administrador</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="logSpecialist">Especialista</a>
						</li>
						
					</ul>
					</div>
				</div>}
						{store.session === true ?
							<>	<div className = "d-flex justify-content-end col-9">
								<div className="dropdown">
									<a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										<BsPersonCircle /> {store.administrator.name} {store.administrator.lastname}
									</a>

									<ul className="dropdown-menu">
										<Link to="/admons" style={{ textDecoration: 'none', color: 'black' }}>
											<span>Mi Perfil</span>
										</Link>
										<li><a className="dropdown-item p-0" href="#" onClick={() => { actions.openModaldelete() }}>Eliminar Cuenta</a></li>
										<Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
											<span onClick={() => { actions.logout() }}> Cerrar sesión</span>
										</Link>
									</ul>
								</div>
								<Link to="/">
									<button className="btn btn-danger mx-3 px-1" onClick={() => { actions.logout() }}>Log Out </button>
								</Link>
								</div>
								<ModalEliminarAdmon id={store.administrator.id} />
							</>
							: <span></span>}
						{store.sessionSpecialist === true ?
							<>
							<div className = "d-flex justify-content-end col-9">
								<div className="dropdown">
									<a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										<BsPersonCircle /> {store.specialist.nombre} {store.specialist.apellido}
									</a>

									<ul className="dropdown-menu">
										<li><Link to="/datosEspecialista">
											<span>Mi Perfil</span>
										</Link></li>
										<li><Link to="/">
											<span onClick={() => { actions.logoutSpecialist() }}> Cerrar sesión</span>
										</Link></li>
									</ul>
								</div>
								<Link to="/">
									<button className="btn btn-danger mx-3 px-1" onClick={() => { actions.logoutSpecialist() }}>Log Out </button>
								</Link>
							</div>
							</>
							: <span></span>
						}
					
				</div>
			
		</nav>
	);
};