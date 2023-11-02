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
					} else {
						console.error("Error al obtener datos de la API. Respuesta completa:", await resp.text());
					}
					
				}catch (error){
					console.error({error})
					return
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
			}, putadmin: async(id,)=> {
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
			},

			openErrorlogin:()=>{
				console.log ("desdeflux modal error login")
				setStore({openError: "flex"});
			},
			closeErrorlogin: () =>{
				setStore({openError:"none"});
			},
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
