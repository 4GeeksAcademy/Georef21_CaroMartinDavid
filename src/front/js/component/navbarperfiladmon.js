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
			<div className="container-fluid"  >
				<a className="navbar-brand" href="/">
					<img src={LogoGeoref21} width="135" height="40" alt="Logo" />
				</a>
				<div className="collapse navbar-collapse d-flex" id="navbarNav" style={{marginLeft:"20px"}} >
					<ul className="navbar-nav" style={{ marginRight: "20px" }}>
						{store.session === true || store.sessionSpecialist === true ? <span></span> :
						<>
												<li className="nav-item">
							<a className="nav-link active navInicio" aria-current="page" href="/">Inicio</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="admonLog">Administrador</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="logSpecialist">Especialista</a>
						</li>
						</>}
						{store.session === true ?
							<>
								<div className="dropdown" style={{marginLeft:"1400px"}}>
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
								<ModalEliminarAdmon id={store.administrator.id} />
							</>
							: <span></span>}
						{store.sessionSpecialist === true ?
							<>

								<div className="dropdown" style={{marginLeft:"1400px"}}>
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

							</>
							: <span></span>
						}
					</ul>
				</div>
			</div>
		</nav>
	);
};