import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/admon.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<section className="pt-4 pt-md-11">

			<div className="container">
				<div className="row align-items-center">
					<div className="col-12 col-md-5 col-lg-6 order-md-2">
						<img src="https://www.globalmediterranea.es/wp-content/uploads/2020/11/plano-georreferenciado-1536x768.jpg" className="img-fluid" alt="Imagen pequeña" />
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

				<footer className="footer footer-alt min-vh-10 ">
					<div className="container.">
						<div className="row">
							<div className="col-12 col-md-4 col-lg-3">


								<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-arrows-move" viewBox="0 0 16 16">
									<path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z" />
								</svg>


								<p className="text-gray-700 mb-2">
									Georef21.
								</p>


								<ul className="list-unstyled list-inline list-social mb-6 mb-md-0">
									<li className="list-inline-item list-social-item me-3">
										<a href="#!" className="text-decoration-none">
											<img src="./assets/img/icons/social/instagram.svg" className="list-social-icon" alt="..." />
										</a>
									</li>
									<li className="list-inline-item list-social-item me-3">
										<a href="#!" className="text-decoration-none">
											<img src="./assets/img/icons/social/facebook.svg" className="list-social-icon" alt="..." />
										</a>
									</li>
									<li className="list-inline-item list-social-item me-3">
										<a href="#!" className="text-decoration-none">
											<img src="./assets/img/icons/social/twitter.svg" className="list-social-icon" alt="..." />
										</a>
									</li>
									<li className="list-inline-item list-social-item">
										<a href="#!" className="text-decoration-none">
											<img src="./assets/img/icons/social/pinterest.svg" className="list-social-icon" alt="..." />
										</a>
									</li>
								</ul>

							</div>
							<div className="col-6 col-md-4 col-lg-2">


								<h6 className="fw-bold text-uppercase text-gray-700">
									Products
								</h6>


								<ul className="list-unstyled text-body-secondary mb-6 mb-md-8 mb-lg-0">
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Page Builder
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											UI Kit
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Styleguide
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Documentation
										</a>
									</li>
									<li>
										<a href="#!" className="text-reset">
											Changelog
										</a>
									</li>
								</ul>

							</div>
							<div className="col-6 col-md-4 col-lg-2">


								<h6 className="fw-bold text-uppercase text-gray-700">
									Services
								</h6>


								<ul className="list-unstyled text-body-secondary mb-6 mb-md-8 mb-lg-0">
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Documentation
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Changelog
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Pagebuilder
										</a>
									</li>
									<li>
										<a href="#!" className="text-reset">
											UI Kit
										</a>
									</li>
								</ul>

							</div>
							<div className="col-6 col-md-4 offset-md-4 col-lg-2 offset-lg-0">


								<h6 className="fw-bold text-uppercase text-gray-700">
									Connect
								</h6>


								<ul className="list-unstyled text-body-secondary mb-0">
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Page Builder
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											UI Kit
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Styleguide
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Documentation
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Changelog
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Documentation
										</a>
									</li>
									<li>
										<a href="#!" className="text-reset">
											Changelog
										</a>
									</li>
								</ul>

							</div>
							<div className="col-6 col-md-4 col-lg-2">


								<h6 className="fw-bold text-uppercase text-gray-700">
									Legal
								</h6>


								<ul className="list-unstyled text-body-secondary mb-0">
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Documentation
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Changelog
										</a>
									</li>
									<li>
										<a href="#!" className="text-reset">
											Pagebuilder
										</a>
									</li>
								</ul>

							</div>

						</div>
					</div>

				</footer>

				{/* <footer className="py-8 py-md-11 bg-gray-200 mt-25">
					<div className="container.">
						<div className="row">
							<div className="col-12 col-md-4 col-lg-3">


								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-compass-fill" viewBox="0 0 16 16">
									<path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.503 7.503 0 0 1 5.538 7.24zm-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z" />
								</svg>


								<p className="text-gray-700 mb-2">
									Georef21.
								</p>


								<ul className="list-unstyled list-inline list-social mb-6 mb-md-0">
									<li className="list-inline-item list-social-item me-3">
										<a href="#!" className="text-decoration-none">
											<img src="./assets/img/icons/social/instagram.svg" className="list-social-icon" alt="..." />
										</a>
									</li>
									<li className="list-inline-item list-social-item me-3">
										<a href="#!" className="text-decoration-none">
											<img src="./assets/img/icons/social/facebook.svg" className="list-social-icon" alt="..." />
										</a>
									</li>
									<li className="list-inline-item list-social-item me-3">
										<a href="#!" className="text-decoration-none">
											<img src="./assets/img/icons/social/twitter.svg" className="list-social-icon" alt="..." />
										</a>
									</li>
									<li className="list-inline-item list-social-item">
										<a href="#!" className="text-decoration-none">
											<img src="./assets/img/icons/social/pinterest.svg" className="list-social-icon" alt="..." />
										</a>
									</li>
								</ul>

							</div>
							<div className="col-6 col-md-4 col-lg-2">


								<h6 className="fw-bold text-uppercase text-gray-700">
									Products
								</h6>


								<ul className="list-unstyled text-body-secondary mb-6 mb-md-8 mb-lg-0">
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Page Builder
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											UI Kit
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Styleguide
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Documentation
										</a>
									</li>
									<li>
										<a href="#!" className="text-reset">
											Changelog
										</a>
									</li>
								</ul>

							</div>
							<div className="col-6 col-md-4 col-lg-2">


								<h6 className="fw-bold text-uppercase text-gray-700">
									Services
								</h6>


								<ul className="list-unstyled text-body-secondary mb-6 mb-md-8 mb-lg-0">
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Documentation
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Changelog
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Pagebuilder
										</a>
									</li>
									<li>
										<a href="#!" className="text-reset">
											UI Kit
										</a>
									</li>
								</ul>

							</div>
							<div className="col-6 col-md-4 offset-md-4 col-lg-2 offset-lg-0">


								<h6 className="fw-bold text-uppercase text-gray-700">
									Connect
								</h6>


								<ul className="list-unstyled text-body-secondary mb-0">
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Page Builder
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											UI Kit
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Styleguide
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Documentation
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Changelog
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Documentation
										</a>
									</li>
									<li>
										<a href="#!" className="text-reset">
											Changelog
										</a>
									</li>
								</ul>

							</div>
							<div className="col-6 col-md-4 col-lg-2">


								<h6 className="fw-bold text-uppercase text-gray-700">
									Legal
								</h6>


								<ul className="list-unstyled text-body-secondary mb-0">
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Documentation
										</a>
									</li>
									<li className="mb-3">
										<a href="#!" className="text-reset">
											Changelog
										</a>
									</li>
									<li>
										<a href="#!" className="text-reset">
											Pagebuilder
										</a>
									</li>
								</ul>

							</div>

						</div>
					</div>
				</footer> */}
			</div>
		</section >
	);
};