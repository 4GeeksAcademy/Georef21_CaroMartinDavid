import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/admon.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<section className="pt-4 pt-md-11">

			<div className="container">
				<div class="row align-items-center">
					<div class="col-12 col-md-5 col-lg-6 order-md-2">
						<img src="https://www.globalmediterranea.es/wp-content/uploads/2020/11/plano-georreferenciado-1536x768.jpg" class="img-fluid" alt="Imagen pequeña" />
					</div>
					<div className="col-12 col-md-7 col-lg-6 order-md-1 aos-init aos-animate">
						<h1 className="display-3 text-center text-md-start">
							Bienvenido a
							<span className="text-primary mb-4"> Georef21</span>

							<h2>Ingeniería Forestal en el Mapa: Haz tu proyecto, Encuentra tu Trayectoria.</h2>
						</h1>
						<p className="lead display-6 text-center text-md-start text-body-secondary mb-6 mb-lg-8">
							Ingresar como:
						</p>
						<Link to="/admonlog">
							<button type="button" className="btn btn-primary btn-lg m-3">Administrador</button>
						</Link>

						<Link to="/logSpecialist">
							<button type="button" className="btn btn-primary btn-lg m-3">Especialista</button>
						</Link>
					</div>

				</div>

				<footer className="footer footer-alt min-vh-10">2023 © Georef21 - Proyecto Final</footer>
			</div>

		</section>
	);
};