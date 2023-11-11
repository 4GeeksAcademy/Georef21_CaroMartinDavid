import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { BsPersonCircle } from "react-icons/bs";

export const NavbarPerfilAdmon = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="d-flex justify-content-center">
		<nav className="navbar navbar-light bg-light col-md-10 d-flex justify-content-end">
			<div >
				
				<div className="d-flex justify-content-center ">
					{store.session === true ?
					<>
						
						<div className="dropdown">
							<a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<BsPersonCircle/> {store.administrator.name} {store.administrator.lastname}
							</a>

							<ul className="dropdown-menu">
								<li><a className="dropdown-item" href="#">Mi Perfil</a></li>
								<li><a className="dropdown-item" href="#">Eliminar Cuenta</a></li>
								<li><a className="dropdown-item" href="#">Cerrar sesión</a></li>
							</ul>
						</div>
						<Link to="/">
						<button className="btn btn-danger mx-3 px-1" onClick={()=>{actions.logout()}}>Log Out </button>
						</Link>
					</>
					:<span></span>
					}
				</div>
			</div>
		</nav>
		</div>
	);
};
