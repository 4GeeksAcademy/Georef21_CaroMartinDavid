import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { BsPersonCircle } from "react-icons/bs";
import { ModalEliminarAdmon } from "./modalEliminaradmon";

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
								<Link to="/admons">
									<span>Mi Perfil</span>
								</Link>
								<li><a className="dropdown-item" href="#" onClick={()=>{actions.openModaldelete()}}>Eliminar Cuenta</a></li>
								<Link to="/">
									<span onClick={()=>{actions.logout()}}> Cerrar sesión</span>
								</Link>
							</ul>
						</div>
						<Link to="/">
						<button className="btn btn-danger mx-3 px-1" onClick={()=>{actions.logout()}}>Log Out </button>
						</Link>
						<ModalEliminarAdmon id={store.administrator.id}/>
					</>
					:<span></span>
					}
				</div>
			</div>
		</nav>
		</div>
	);
};
