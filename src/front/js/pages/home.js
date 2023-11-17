import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/admon.css";
import { GiEarthAmerica } from "react-icons/gi";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
			<section className="pt-4 pt-md-11">

				<div className="container-fluid contenedor">
					<div className="row align-items-center">
						<div className="col-12 col-md-5 col-lg-6 order-md-2">
							<img src="https://www.globalmediterranea.es/wp-content/uploads/2020/11/plano-georreferenciado-1536x768.jpg" className="img-fluid" alt="Imagen pequeña" style={{ height: "550px", width: "100%" }} />
						</div>
						<div className="col-12 col-md-7 col-lg-6 order-md-1 aos-init aos-animate">
							<div className="text-center">
								<h1 className="display-3 mb-4">
									Bienvenido a <span className="text-primary">Georef21</span>
								</h1>
								<h2 className="h4 mb-5">Gestiona tus proyectos en campo.</h2>
								<p className="lead display-6 mb-6 text-body-secondary">
									Ingresar como:
								</p>
							</div>
							<div style={{ display: "flex", justifyContent: "space-around" }}>
								<div className="card" style={{ width: "17rem", borderRadius: "8px", border: "1px solid #e0e0e0", backgroundColor: "#f8f9fa", margin: "10px", textAlign: "left", padding: "20px" }}>
									<div className="text-center">
										<Link to="/admonlog">
											<button type="button" className="btn btn-primary btn-lg m-3">
												Administrador
											</button>
										</Link>
									</div>
									<p style={{ padding: "20px", paddingTop: "5px" }}>
										Los administradores tienen la capacidad de crear, gestionar y eliminar proyectos, así como controlar la información relacionada con especialistas y visitas.
									</p>
								</div>

								<div className="card" style={{ width: "17rem", borderRadius: "8px", border: "1px solid #e0e0e0", backgroundColor: "#f8f9fa", margin: "10px", textAlign: "left", padding: "20px" }}>
									<div className="text-center">
										<Link to="/logSpecialist">
											<button type="button" className="btn btn-primary btn-lg m-3">
												Especialista
											</button>
										</Link>
									</div>
									<p style={{ padding: "20px", paddingTop: "5px" }}>
										Los especialistas cuentan con la habilidad de visualizar las visitas y proyectos asignados, así como crear, gestionar y eliminar los registros de datos
									</p>
								</div>
							</div>
						</div>
					</div>



					{/* <footer className="py-8 py-md-11 bg-gray-200 mt-25">
					<div className="container.">
						<div className="row">
							<div className="col-12 col-md-4 col-lg-3">


								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-compass-fill" viewBox="0 0 16 16">
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
			<footer className="footer footer-alt min-vh-10 ">
				<div className="container.">
					<div className="row">
						<div className="col-12 col-md-4 col-lg-3">


							<GiEarthAmerica style={{ fontSize: "100px" }} />


							<p className="text-gray-700 mb-2">
								Georef21.
							</p>


							<ul className="list-unstyled list-inline list-social mb-6 mb-md-0">
								<li className="list-inline-item list-social-item me-3">
									<a href="#!" className="text-decoration-none">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
											<path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
										</svg>
									</a>
								</li>
								<li className="list-inline-item list-social-item me-3">
									<a href="#!" className="text-decoration-none">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
											<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
										</svg>
									</a>
								</li>
								<li className="list-inline-item list-social-item me-3">
									<a href="#!" className="text-decoration-none">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
											<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
										</svg>
									</a>
								</li>
								<li className="list-inline-item list-social-item">
									<a href="#!" className="text-decoration-none">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
											<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
										</svg>
									</a>
								</li>
							</ul>

						</div>
						<div className="col-6 col-md-4 col-lg-2">


							<h6 className="fw-bold text-uppercase text-gray-700">
								Principios
							</h6>


							<ul className="list-unstyled text-body-secondary mb-6 mb-md-8 mb-lg-0">
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Calidad
									{/* </a> */}
								</li>
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Compromiso
									{/* </a> */}
								</li>
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Profesionalismo
									{/* </a> */}
								</li>
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Cumplimiento
									{/* </a> */}
								</li>
								<li>
									{/* <a href="#!" className="text-reset"> */}
									Amabilidad
									{/* </a> */}
								</li>
							</ul>

						</div>
						<div className="col-6 col-md-4 col-lg-2">


							<h6 className="fw-bold text-uppercase text-gray-700">
								Services
							</h6>


							<ul className="list-unstyled text-body-secondary mb-6 mb-md-8 mb-lg-0">
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Inventario Forestal
									{/* </a> */}
								</li>
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Censo
									{/* </a> */}
								</li>
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Geología
									{/* </a> */}
								</li>
								<li>
									{/* <a href="#!" className="text-reset"> */}
									Infraestructura
									{/* </a> */}
								</li>
							</ul>

						</div>
						<div className="col-6 col-md-4 offset-md-4 col-lg-2 offset-lg-0">


							<h6 className="fw-bold text-uppercase text-gray-700">
								Tenemos presencia en:
							</h6>


							<ul className="list-unstyled text-body-secondary mb-0">
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Colombia
									{/* </a> */}
								</li>
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Ecuador
									{/* </a> */}
								</li>
								{/* <li className="mb-3">
										<a href="#!" className="text-reset">
											Styleguide
										</a>
									</li> */}
								{/* <li className="mb-3">
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
									</li> */}
							</ul>

						</div>
						<div className="col-6 col-md-4 col-lg-2">


							<h6 className="fw-bold text-uppercase text-gray-700">
								Equipo de trabajo
							</h6>


							<ul className="list-unstyled text-body-secondary mb-0">
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Administrador
									{/* </a> */}
								</li>
								<li className="mb-3">
									{/* <a href="#!" className="text-reset"> */}
									Especialistas
									{/* </a> */}
								</li>
								{/* <li>
										<a href="#!" className="text-reset">
											Pagebuilder
										</a>
									</li> */}
							</ul>

						</div>

					</div>
				</div>

			</footer>
		</div>

	);
};