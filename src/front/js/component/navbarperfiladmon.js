
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const NavbarPerfilAdmon = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-end">
				
				<div className="buttonlogOut ">
					{store.session === true ?
					<>
						<Link to="/">
						<button className="btn btn-danger" onClick={()=>{actions.logout()}}>Log Out </button>
						</Link>
					</>
					:<span></span>
					}
				</div>
			</div>
		</nav>
	);
};
