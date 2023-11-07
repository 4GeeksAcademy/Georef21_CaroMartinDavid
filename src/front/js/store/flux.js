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
			administrators: [],
			openError:"none"
		},

		actions: {
			// Use getActions to call a function within a fuction
			postadmin: async(data)=> {
				try{
					const resp = await fetch('https://fictional-space-bassoon-q774pjv4v4f47g9-3001.app.github.dev/api/admon', {
						method:"POST",
						body: JSON.stringify(data),
						headers:{"Content-Type": "application/json",},
					});
					if (resp.ok) {
						console.log ("realizado");
						return "realizado"						
					} else {
						const errordata = JSON.parse (await  resp.text())
						if(resp.status === 400 && errordata.error === "El correo electronico ya esta registrado"){
							return errordata.error;
						}
					}
				}catch (error){
					console.log("Error en la solicitud POST:", error)
					return "Error en la solicitud"
				}
			}, getadmins: async()=> {
				try{
					const resp = await fetch('https://fictional-space-bassoon-q774pjv4v4f47g9-3001.app.github.dev/api/admon', {
						method:"GET",
						headers:{"Content-Type": "application/json",},
					});
					if (resp.ok) {
						console.log ("realizado");	
						const administrators = await resp.json();
						setStore({ administrators: administrators });
            			console.log(administrators);

					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}
					
				}catch (error){
					console.error({error})
					return
				}
			}, putadmin: async(id,data)=> {
				
				try{
					const resp = await fetch('https://fictional-space-bassoon-q774pjv4v4f47g9-3001.app.github.dev/api/admon'+"/"+ id, {
						method:"PUT",
						body: JSON.stringify(data),
						headers:{"Content-Type": "application/json",},
					});
					if (resp.ok) {
						console.log ("realizado");	
						
					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}
					
				}catch (error){
					console.error({error})
					return
				}
			},
			adminDelete:(id)=>{
				const store = getStore();
				const actions=getActions();
				const administrators = store.administrators.filter((admin)=>admin.id!=id);
				setStore({ administrators: administrators });
				actions.delete(id)
			},
			delete: async(id)=>{
				
				try{
					const resp = await fetch('https://fictional-space-bassoon-q774pjv4v4f47g9-3001.app.github.dev/api/admon'+"/"+ id, {
						method:"DELETE",
						headers:{"Content-Type": "application/json",},
					});
					if (resp.ok) {
						console.log ("realizado");	
						
					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}
					
				}catch (error){
					console.error({error})
					
			}
			},
			openErrorlogin:()=>{
				console.log ("desdeflux modal error login")
				setStore({openError: "flex"});
			},
			closeErrorlogin: () =>{
				setStore({openError:"none"});
			},
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: async () => {
			// 	try {
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	} catch (error) {
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// },

			GetProjects: (data) => {
				console.log(data)
				const requestOptions = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json'
					},

				};
				fetch('https://ideal-space-rotary-phone-9vp4x7ggvgxc75pv-3001.app.github.dev/api/Project', requestOptions)
					.then(response => {
						if (!response.ok) {
							throw new Error(`HTTP error! Status: ${response.status}`);
						}
						return response.json();
					})
					.then(responseData => {
						console.log(responseData)
						const AllProjects = responseData
						const store = getStore();
						setStore({ AllProjects: AllProjects });
					})
					.catch(error => {
						console.error("Error al realizar la petición:", error.message);
						// Puedes manejar el error de alguna manera aquí
					});
			},

			CreateProject: (data) => {
				console.log(data)

				// if (data.nameProject === data.nameProject) {
				// 	// Si el nombre ya existe, mostrar alerta y salir de la función
				// 	alert("Error: El nombre del proyecto ya existe. Por favor, elige otro nombre.");
				// 	return;
				// }

				const requestOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				};
				fetch('https://ideal-space-rotary-phone-9vp4x7ggvgxc75pv-3001.app.github.dev/api/Project', requestOptions)
					.then(response => {
						// if (!response.ok) {
						// 	throw new Error(`HTTP error! Status: ${response.status}`);
						// }
						return response.json();
					})
					.then(responseData => {

						if (responseData.msg) {
							alert("Proyecto creado con éxito");
							console.log(responseData.msg);
						} else {
							alert(responseData.Error)
							// alert("Error al crear Proyecto");
						}

					})
					.catch(error => {
						console.error("Error al realizar la petición:", error.message);
						// Puedes manejar el error de alguna manera aquí
					});
			},

			//acá empieza el DELETE
			DeleteProject: (id) => {
				console.log(id)
				const store = getStore();
				const AllProjects = store.AllProjects.filter((item) => item.id != id)
				setStore({ AllProjects: AllProjects });
				const requestOptions = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},

				};

				fetch(`https://ideal-space-rotary-phone-9vp4x7ggvgxc75pv-3001.app.github.dev/api/Project` + "/" + id, requestOptions)
					.then(response => response.json())
					.then(data => {
						console.log(data.msg);
						// Puedes hacer más cosas con la respuesta del servidor si es necesario
					})
					.catch(error => {
						console.error('Error al realizar la petición:', error);
						// Puedes manejar el error de alguna manera aquí
					});
			},
			//ACÁ TERMINA EL DELETE

			//ACÁ EMPIEZA EL PUT
			EditProject: (id, data) => {
				const requestOptions = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				};

				fetch(`https://ideal-space-rotary-phone-9vp4x7ggvgxc75pv-3001.app.github.dev/api/Project` + "/" + id, requestOptions)
					.then(response => response.json())
					.then(data => {
						console.log(data.msg);
						// Puedes hacer más cosas con la respuesta del servidor si es necesario
					})
					.catch(error => {
						console.error('Error al realizar la petición:', error);
						// Puedes manejar el error de alguna manera aquí
					});
				console.log(id)
			},
			// ACÁ TERMINA EL PUT


		}
	};
};

export default getState;
