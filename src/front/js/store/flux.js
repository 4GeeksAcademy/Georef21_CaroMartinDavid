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
			allspecialist:[],
			administrator: {},
			openError:"none",
			session:false
		},

		actions: {
			// Use getActions to call a function within a fuction
			postadmin: async(data)=> {
				try{
					const resp = await fetch('https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/admon', {
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
			}, loginadmin:async(data) =>{
				try{
					const resp = await fetch('https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/admonlogin', {
						method:"POST",
						body: JSON.stringify(data),
						headers:{"Content-Type": "application/json",},
					});
					if (resp.ok) {
						console.log ("realizado");
					
						const dataresp = await resp.json();
						if(resp.status === 201){
							const token =dataresp.token;
						
							localStorage.setItem("tokenadmin",token);
							const {getadmins}=getActions();
							getadmins(token);
							setStore({ session:true });
							return "autorizado";
						}
					} else {
						const resperror =  await resp.json();
						console.error("Error al obtener datos de la API. Respuesta completa:",resperror);
						 return resperror
					}
					
				}catch (error){
					console.error({error})
					
				}
			},
			 getadmins: async(tokenadmin)=> {
				try{
					const resp = await fetch('https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/admon', {
						method:"GET",
						headers:{'Authorization': 'Bearer ' + tokenadmin}
					});
					if (resp.ok) {
						console.log ("realizado");	
						const administrator = await resp.json();
						setStore({ administrator: administrator });
            			console.log(administrator);

					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}
					
				}catch (error){
					console.error({error})
					return
				}
			}, putadmin: async(id,data)=> {
				const token = localStorage.getItem('tokenadmin');
				try{
					const resp = await fetch('https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/admon'+"/"+ id, {
						method:"PUT",
						body: JSON.stringify(data),
						headers:{
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
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
				const token = localStorage.getItem('tokenadmin');
				try{
					const resp = await fetch('https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/admon'+"/"+ id, {
						method:"DELETE",
						headers:{
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
						}
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

			GetProjects: () => {
				
				const token = localStorage.getItem('tokenadmin');
				const requestOptions = {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}

				};
				fetch('https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/Project', requestOptions)
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
				const token = localStorage.getItem('tokenadmin');
				const requestOptions = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(data)
				};
				fetch('https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/Project', requestOptions)
					.then(response => {
						// if (!response.ok) {
						// 	throw new Error(`HTTP error! Status: ${response.status}`);
						// }
						return response.json();
					})
					.then(responseData => {

						if (responseData.msg) {
							console.log(responseData.msg);
						} else {
							alert(responseData.Error)
							
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
				const token = localStorage.getItem('tokenadmin');
				const store = getStore();
				const AllProjects = store.AllProjects.filter((item) => item.id != id)
				setStore({ AllProjects: AllProjects });
				const requestOptions = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					}
				};

				fetch('https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/Project' + "/" + id, requestOptions)
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
				const token = localStorage.getItem('tokenadmin');
				const requestOptions = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
					body: JSON.stringify(data)
				};

				fetch('https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/Project' + "/" + id, requestOptions)
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
			postespecialist: async (data) => {
				const token = localStorage.getItem('tokenadmin');
				try {
					const resp = await fetch('https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/especialista', {
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
							const errordata = JSON.parse (await  resp.text())
							if(resp.status === 401  || resp.status === 401 ){
								return errordata.error;
							
							}
				}} catch (error) {
					console.error({ error });
					return;
				}
				
			},
			// ACÁ TERMINA EL post especialista
			getEspecialista : async () => {
				const baseUrl = `https://expert-guacamole-5ggrxjvr5p2vpq7-3001.app.github.dev/api/especialista`;
				const token = localStorage.getItem('tokenadmin');
				try {
					const response = await fetch(baseUrl, {
						method: "GET",
						headers: { 
							"Content-Type": "application/json",
							'Authorization': `Bearer ${token}`
					}});
					if (response.ok) {
						console.log ("realizado");	
						const allspecialist= await response.json();
						setStore({ allspecialist: allspecialist });
            			console.log(allspecialist);
					}
		
					
				} catch (error) {
					console.error(error);
				}
			},
			// ACÁ TERMINA EL get especialista
			logout: () => {
				localStorage.removeItem("token");
				setStore({ session: false });

			}
		}
	};
};

export default getState;
