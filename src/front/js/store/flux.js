const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			AllProjects: [],
			allspecialist: [],
			allvisits: [],
			administrator: {},
			openError: "none",
			openSuccess:"none",
			openModalEliminar: "none",
			session: false,
			specialist: {},
			sessionSpecialist: false,
			allvisitsspc: [],
			allprojectspc: [],
			location: {},
			dataesp: [], 
			ajustedlocation:{},
			markers:[],
			numproyesp: null,
			deleteSuccess:"none"

		},

		actions: {
			// Use getActions to call a function within a fuction
			postadmin: async (data) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL+'/api/admonreg', {
						method: "POST",
						body: JSON.stringify(data),
						headers: { "Content-Type": "application/json", },
					});
					if (resp.ok) {
						console.log("realizado");
						return "realizado"
					} else {
						const errordata = JSON.parse(await resp.text())
						if (resp.status === 400 && errordata.error === "El correo electronico ya esta registrado") {
							return errordata.error;
						}
					}
				} catch (error) {
					console.log("Error en la solicitud POST:", error)
					return "Error en la solicitud"
				}
			}, loginadmin: async (data) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/admonlogin', {
						method: "POST",
						body: JSON.stringify(data),
						headers: { "Content-Type": "application/json", },
					});
					if (resp.ok) {
						console.log("realizado");

						const dataresp = await resp.json();
						if (resp.status === 201) {
							const token = dataresp.token;

							localStorage.setItem("tokenadmin", token);
							const { getadmins } = getActions();
							getadmins(token);
							const { getEspecialista } = getActions();
							getEspecialista();
							const { GetProjects } = getActions();
							GetProjects();
							const { gevisitaadmon } = getActions();
							gevisitaadmon();
							setStore({ session: true });
							return "autorizado";
						}
					} else {
						const resperror = await resp.json();
						console.error("Error al obtener datos de la API. Respuesta completa:", resperror);
						return resperror
					}

				} catch (error) {
					console.error({ error })

				}
			},
			getadmins: async (tokenadmin) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/admon', {
						method: "GET",
						headers: { 'Authorization': 'Bearer ' + tokenadmin }
					});
					if (resp.ok) {
						console.log("realizado");
						const administrator = await resp.json();
						setStore({ administrator: administrator });
						console.log(administrator);

					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}

				} catch (error) {
					console.error({ error })
					return
				}
			}, putadmin: async (id, data) => {
				const token = localStorage.getItem('tokenadmin');
				try {
					const resp = await fetch(process.env.BACKEND_URL+'/api/admon' + "/" + id, {
						method: "PUT",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					if (resp.ok) {
						console.log("realizado");
						const { getadmins } = getActions();
						getadmins(token);

					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}

				} catch (error) {
					console.error({ error })
					return
				}
			},
			deleteadmon: async (id) => {
				console.log("desde flux", id)
				const token = localStorage.getItem('tokenadmin');
				try {
					const resp = await fetch(process.env.BACKEND_URL+'/api/admon' + "/" + id, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					if (resp.ok) {
						console.log("realizado");

					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}

				} catch (error) {
					console.error({ error })

				}
			},
			openErrorlogin: () => {
				console.log("desdeflux modal error login")
				setStore({ openError: "flex" });
			},
			closeErrorlogin: () => {
				setStore({ openError: "none" });
			}, openModaldelete: () => {
				console.log("desdeflux modal error login")
				setStore({ openModalEliminar: "flex" });
			}, closeModaldelete: () => {
				setStore({ openModalEliminar: "none" });
			},openSuccessM: () => {
				console.log("desdeflux exito login")
				setStore({ openSuccess: "flex" });
			},closeSuccessM: () => {
				setStore({ openSuccess: "none" });
			},deleteSuccessM: () => {
				console.log("desdeflux exito login")
				setStore({ deleteSuccess: "flex" });
			},closedeleteSuccessM: () => {
				setStore({ deleteSuccess: "none" });
			},
			GetProjects: () => {

				const token = localStorage.getItem('tokenadmin');
				const requestOptions = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}

				};
				fetch(process.env.BACKEND_URL+'/api/Project', requestOptions)
					.then(response => {
						if (!response.ok) {
							throw new Error(`HTTP error! Status: ${response.status}`);
						}
						return response.json();
					})
					.then(responseData => {
						
						const AllProjects = responseData
						const store = getStore();
						setStore({ AllProjects: AllProjects });
						const {setmarkersadmon} = getActions();
						setmarkersadmon(store.AllProjects);
					})
					.catch(error => {
						console.error("Error al realizar la petición:", error.message);
						// Puedes manejar el error de alguna manera aquí
					});
			},

			CreateProject: async (data) => {
				console.log(data)
				const token = localStorage.getItem('tokenadmin');
				const requestOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(data)
				};
				try{
					const resp = await fetch (process.env.BACKEND_URL+'/api/Project', requestOptions);
					if (resp.ok) {

						console.log("realizado")
						return "realizado"
					} else {
						const errordata = JSON.parse(await resp.text())
						if (resp.status === 400 || resp.status === 402) {
							return errordata.Error;

						}
					}
				}catch (error) {
					console.error({ error });
					return "Error en el servidor";
				}

			},
			//acá empieza el DELETE
			DeleteProject: async (id) => {
				console.log(id)
				const token = localStorage.getItem('tokenadmin');
				console.log(token);
				const store = getStore();
				const AllProjects = store.AllProjects.filter((item) => item.id != id)
				setStore({ AllProjects: AllProjects });
				const url = process.env.BACKEND_URL + '/api/Project/'  + id;
				console.log('URL de la solicitud:', url);
				const requestOptions = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};
				try{
					const resp = await fetch (url, requestOptions);
					if (resp.ok) {
						const {gevisitaadmon} = getActions();
						gevisitaadmon();	
						const {GetProjects} = getActions();
						GetProjects();	
						console.log("realizado eliminar proyecto")
						return "realizado"
					} else {
						const errordata = JSON.parse(await resp.text())
						if (resp.status === 404 || resp.status === 403) {
							return errordata.Error;

						}
					}
				}catch (error) {
					console.error({ error });
					return "Error en el servidor";
				}
			},
			//ACÁ TERMINA EL DELETE

			//ACÁ EMPIEZA EL PUT
			EditProject: async (id, data) => {
				const token = localStorage.getItem('tokenadmin');
				const requestOptions = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(data)
				};
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/Project' + "/" + id, requestOptions);
					if (resp.ok) {

						console.log("realizado")
						return "realizado"
					} else {
						const errordata = JSON.parse(await resp.text())
						if (resp.status === 404 || resp.status === 403) {
							return errordata.error;

						}
					}
				} catch (error) {
					console.error({ error });
					return "Error servidor";
				}

			},
			// ACÁ TERMINA EL PUT
			postespecialist: async (data) => {
				const token = localStorage.getItem('tokenadmin');
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/especialista', {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					if (resp.ok) {

						console.log("realizado")
						return "realizado"
					} else {
						const errordata = JSON.parse(await resp.text())
						if (resp.status === 401 || resp.status === 402) {
							return errordata.error;

						}
					}
				} catch (error) {
					console.error({ error });
					return;
				}

			},
			// ACÁ TERMINA EL post especialista
			getEspecialista: async () => {
				const baseUrl = process.env.BACKEND_URL + '/api/especialista';
				const token = localStorage.getItem('tokenadmin');
				try {
					const response = await fetch(baseUrl, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					if (response.ok) {
						console.log("realizado");
						const allspecialist = await response.json();
						setStore({ allspecialist: allspecialist });
						console.log("get especialista", allspecialist);
					}


				} catch (error) {
					console.error(error);
				}
			},
			// ACÁ TERMINA EL get especialista
			logout: () => {
				localStorage.removeItem("token");
				setStore({ session: false });

			},
			logoutSpecialist: () => {
				localStorage.removeItem("tokenspecialist");
				setStore({ sessionSpecialist: false });

			},
			// ACÁ TERMINA EL logout
			eliminarEspecialista: async (id) => {
				// Realizar una solicitud DELETE a la API para eliminar al especialista con el ID proporcionado.
				let deleteUrl = process.env.BACKEND_URL+`/api/especialista/${id}`;
				const token = localStorage.getItem('tokenadmin');
				const store = getStore();
				const allspecialist = store.allspecialist.filter((item) => item.id != id)
				setStore({ allspecialist: allspecialist });
				console.log (allspecialist, "eliminar especialista")

				try {
					let response = await fetch(deleteUrl, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});

					if (response.ok) {
						console.log("realizado");
						const {getEspecialista} = getActions();
						getEspecialista();
					} else {
						console.error("Error al eliminar al especialista");
					}
				} catch (error) {
					console.error(error);
				}
			},

			//ACÁ TERMINA EL delete especialista
			putespecialist: async (id, data) => {
				const token = localStorage.getItem('tokenadmin');
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/especialista' + "/" + id, {
						method: "PUT",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					if (resp.ok) {
						console.log("realizado");
						return "realizado";

					} else {
						const errordata = JSON.parse(await resp.text())
						if (resp.status === 400 || resp.status === 403|| resp.status === 404) {
							return errordata.msg;

						}
						

					}

				} catch (error) {
					console.error({ error })
					return
				}
			},
			//ACÁ TERMINA EL put especialista
			//acá empieza loginspecialist
			loginSpecialist: async (data) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/loginSpecialist', {
						method: "POST",
						body: JSON.stringify(data),
						headers: { "Content-Type": "application/json", },
					});
					if (resp.ok) {
						console.log("realizado");

						const dataresp = await resp.json();
						if (resp.status === 200) {
							const token = dataresp.access_token;
							console.log(token)
							localStorage.setItem("tokenspecialist", token);
							const { getspecialist } = getActions();
							getspecialist(token);
							setStore({ sessionSpecialist: true });
							const { gevisitaesp } = getActions();
							gevisitaesp();
							const { getcapturedata } = getActions();
							getcapturedata();
							
							return "autorizado";

						}
					} else {
						const resperror = await resp.json();
						console.error("Error al obtener datos de la API. Respuesta completa:", resperror);
						return resperror
					}

				} catch (error) {
					console.error({ error })

				}

			},
			//acá termina loginspecialist
			//acá empieza la función
			getspecialist: async (tokenspecialist) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/especialistalog', {
						method: "GET",
						headers: { 'Authorization': 'Bearer ' + tokenspecialist }
					});
					if (resp.ok) {
						console.log("realizado get specialist");
						const specialist = await resp.json();
						setStore({ specialist: specialist });
						console.log(specialist);

					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}

				} catch (error) {
					console.error({ error })
					return
				}
			},
			//acá termina la función
			//crearvisita
			registrovisita: async (data) => {
				const token = localStorage.getItem('tokenadmin');
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/admonvisits', {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					if (resp.ok) {
						// Mostrar una alerta cuando la respuesta es exitosa
						return "realizado";

					} else {
						const errordata = JSON.parse(await resp.text())
						console.log(errordata);
						if (resp.status === 401 || resp.status === 400 || resp.status === 402) {
							return errordata.error;
							// console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
						}
					}
				} catch (error) {
					console.error("Error al realizar la solicitud:", error);
				}
			},
			//termina crearvisita
			//obtener visitas de admon
			gevisitaadmon: async () => {
				const token = localStorage.getItem('tokenadmin');
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/visits', {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					if (resp.ok) {
						console.log("realizado");
						const allvisits = await resp.json();
						setStore({ allvisits: allvisits });
						console.log(allvisits);

					} else {
						const errordata = JSON.parse(await resp.text())
						console.log(errordata);
						if (resp.status === 404) {
							const allvisits = [];
							setStore({ allvisits: allvisits });
							console.log(allvisits);
							return errordata.error;
							// console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
						}
					}
				} catch (error) {
					console.error("Error al realizar la solicitud:", error);
				}
			},
			//termina obtener visitas de admon
			// editar visita admon
			putvisitaadmon: async (data, id) => {
				const token = localStorage.getItem('tokenadmin');
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/visits' + '/' + id, {
						method: "PUT",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					if (resp.ok) {
						console.log("realizado");
						return "realizado"

					} else {
						const errordata = JSON.parse(await resp.text())
						console.log(errordata);
						if (resp.status === 404) {
							return errordata.error;
							// console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
						}
					}
				} catch (error) {
					console.error("Error al realizar la solicitud:", error);
				}
			},
			//termina editar visita admon
			//eliminar visita

			eliminarVisita: async (id) => {
				const token = localStorage.getItem('tokenadmin');
				let deleteUrl = process.env.BACKEND_URL + `/api/visits/${id}`;
				try {
					let response = await fetch(deleteUrl, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					if (response.ok) {
						console.log("realizado");
						const { gevisitaadmon} = getActions();
						gevisitaadmon();
						
						return "realizado"
					} else {
						const errordata = JSON.parse(await response.text())
						console.log(errordata);
						if (response.status === 404) {
							return errordata.error;
						}
					}
				} catch (error) {
					console.error(error);
				}
			},
			//termina eliminar visita
			//visitaesp
			gevisitaesp: async () => {
				const token = localStorage.getItem("tokenspecialist");
				try {
					const resp = await fetch(process.env.BACKEND_URL + '/api/visitsEsp', {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
					});
					if (resp.ok) {
						console.log("realizado");
						const respuesta = await resp.json()
						const allvisitsspc = respuesta.visitAsig
						setStore({ allvisitsspc: allvisitsspc });
						console.log(allvisitsspc);
						const allprojectspc = respuesta.projectAsig
						setStore({ allprojectspc: allprojectspc });
						console.log(allprojectspc);
						const { numproyesp } = getActions();
						numproyesp(allprojectspc);
						const {setmarkersesp} = getActions();
						setmarkersesp(allvisitsspc, allprojectspc);
					} else {
						const errordata = JSON.parse(await resp.text())
						console.log(errordata);
						if (resp.status === 404) {
							return errordata.error;
							// console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
						}
					}
				} catch (error) {
					console.error("Error al realizar la solicitud:", error);
				}
			},
			//termina visita esp
			// postgeolocalizacion
			location: async () => {
				try {
				  if ("geolocation" in navigator) {
					const position = await new Promise((resolve, reject) => {
					  navigator.geolocation.getCurrentPosition(resolve, reject);
					});
			  
					console.log("Coordenadas completas:", position.coords);
			  
					const lat = position.coords.latitude;
					const lng = position.coords.longitude;
			  
			  
					if (typeof lat === "number" && typeof lng === "number" && !isNaN(lat) && !isNaN(lng)) {
					  const location = { lat, lng };
					  setStore({ location });
					  console.log("Ubicación:", location);
			  
					  // Resto del código
					} else {
					  console.error("Las coordenadas no son números válidos.");
					}
				  } else {
					console.error("Geolocalización no está disponible");
				  }
				} catch (error) {
				  console.error("Error al obtener la ubicación:", error);
				}
			  },
			  
			  

			// aqui termina el post geolocalizacion

			// aqui comienza el post de captura de datos 
			postcapturedata: async (data) => {
				const token = localStorage.getItem("tokenspecialist");
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/datacapture', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify(data),
					});

					if (response.ok) {
						
						console.log("DataCapture creado con éxito");
						const { getcapturedata } = getActions();
						getcapturedata();
						const { gevisitaesp} = getActions();
						gevisitaesp();
						return "realizado"

					} else {
						const errordata = JSON.parse(await response.text())
						console.log(errordata);
						if (resp.status === 400) {
							return errordata.message;
							// console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
						}
					}
				} catch (error) {
					console.error("Error al obtener datos de la API:", error);
					return "Error en el servidor"
				}
			},
			// aqui termina el post de captura de datos
			//aqui comienza el get captura de datos
			getcapturedata: async () => {
				const token = localStorage.getItem("tokenspecialist");
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/datacapture', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						}
					});

					if (response.ok) {
						console.log("DataCapture creado con éxito");
						const respuesta = await response.json()
						const dataesp = respuesta
						setStore({ dataesp: dataesp });
						const { gevisitaesp} = getActions();
						gevisitaesp();

					} else {
						if (response.status === 404) {
							const dataesp = [];
							setStore({ dataesp: dataesp });
							console.log(dataesp);
						console.error("Error al obtener datos de la API. Respuesta completa:", response);
						}
					}
				} catch (error) {
					console.error("Error al obtener datos de la API:", error);
				}
			},
			//aqui termina el get captura de datos
			// aqui empieza el delete captura de datos
			deletecapturedata: async (id) => {
				const token = localStorage.getItem("tokenspecialist");
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/datacapture' + "/" + id, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						}
					});

					if (response.ok) {
						console.log("Eliminado Dato visita");
						const { getcapturedata } = getActions();
						getcapturedata();
						const { gevisitaesp} = getActions();
						gevisitaesp();

					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", response);
					}
				} catch (error) {
					console.error("Error al obtener datos de la API:", error);
				}
			},

			// aqui termina el delete captura de datos 
			//aqui comienza el put de captura de datos
			putcapturedata: async (data, id) => {
				const token = localStorage.getItem("tokenspecialist");
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/datacapture' + "/" + id, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify(data),
					});

					if (response.ok) {
						console.log("actualizado Dato visita");
						const { getcapturedata } = getActions();
						getcapturedata();
						const { gevisitaesp} = getActions();
						gevisitaesp();
						
						return "realizado"

					}  else {
						const errordata = JSON.parse(await response.text())
						console.log(errordata);
							return errordata.message;
						}
					}
				 catch (error) {
					console.error("Error al obtener datos de la API:", error);
					return "Error en el servidor"
				}
			},
			
			setmarkersadmon:(data)=>{
				console.log("desde setmarkeradmon:", data);
				const markers = [];
				for (let i=0; i<data.length; i++){
					if(data[i].visits.length!=0){
						const visitaproyec = data[i].visits;
						for (let j=0; j<visitaproyec.length; j++){
							if (visitaproyec[j].datacaptures.length > 0){
								console.log (visitaproyec[j]);
								const datoscoord = visitaproyec[j].datacaptures;
								for(let k=0; k<datoscoord.length; k++){
									const coord = datoscoord[k].georeferencing;
									console.log(coord.lat);
									console.log(coord.lng)
									const datosproyecto = {};
									datosproyecto["Proyecto"] = data[i].nameProject;
									datosproyecto["fecha"]=visitaproyec[j].date;
									datosproyecto["lat"]=coord.lat;
									datosproyecto["lng"]= coord.lng;
									console.log("datosmarker", datosproyecto);
									markers.push(datosproyecto)
								}

							}}}}
					console.log("datomarcadores",markers);
					setStore({ markers: markers });
			},
			//termina infor marker
			numproyesp:(data)=>{
				let idsUnicos = new Set(data.map(objeto => objeto.id));
				const numproyesp = idsUnicos.size;
				setStore({ numproyesp: numproyesp });
			},
			//termina numero de proy
			setmarkersesp:(data, proyectos)=>{
				console.log("desde setmarkerespecialista:", data);
				const markers = [];
				for (let i=0; i<data.length; i++){
					console.log("desde setmarkerespecialista captures:", data[i].datacaptures);
					if(data[i].datacaptures.length!=0){
						const capturas = data[i].datacaptures;
						for (let j=0; j<capturas.length; j++){
									const coord = capturas[j].georeferencing;
									console.log(coord.lat);
									console.log(coord.lng)
									const datosproyecto = {};
									datosproyecto["Proyecto"] = proyectos.filter(project => project.id ===data[i].project_id)[0]?.nameProject
									datosproyecto["fecha"]=new Date(data[i].date).toISOString().slice(0, 10)
									datosproyecto["lat"]=coord.lat;
									datosproyecto["lng"]= coord.lng;
									console.log("datosmarker", datosproyecto);
									markers.push(datosproyecto)
								}}}
					console.log("datomarcadores",markers);
					setStore({ markers: markers });
			},
			//termina infor marker

		}
	};
};

export default getState;