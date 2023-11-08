"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Specialist, Administrator, Project
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager,  get_jwt_identity

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/especialista', methods=['GET'])
def get_especialista():
    # Supongamos que deseas obtener todos los especialistas de la base de datos
    especialistas = Specialist.query.all()
    
    # Convierte los objetos Specialist en un formato serializable
    especialistas_serializados = [especialista.serialize() for especialista in especialistas]
    
    return jsonify(especialistas_serializados), 200

@api.route('/especialista', methods=['POST'])
def create_especialista():
    # Obtiene los datos del especialista desde la solicitud
    data = request.json

    if not data:
        return jsonify({"message": "Datos no proporcionados"}), 400

    # Crea un nuevo objeto Specialist
    nuevo_especialista = Specialist(
        nombre=data.get("nombre"),
        apellido=data.get("apellido"),
        email=data.get("email"),
        profesion=data.get("profesion"),
        area_de_desempeno=data.get("area_de_desempeno"),
        password=data.get("password")
    )
    # Agrega el especialista a la base de datos
    db.session.add(nuevo_especialista)
    db.session.commit()

    # Retorna una respuesta con el nuevo especialista creado
    return jsonify({"message": "Especialista creado con éxito", "id": nuevo_especialista.id}), 201

@api.route('/especialista/<int:id>', methods=['PUT'])
def update_especialista(id):
    # Obtén el especialista existente por su ID
    especialista = Specialist.query.get(id)

    # Comprueba si el especialista existe
    if especialista is None:
        return jsonify({"message": "Especialista no encontrado"}), 404

    # Obtén los datos actualizados del especialista desde la solicitud
    data = request.json

    if not data:
        return jsonify({"message": "Datos no proporcionados"}), 400

    # Actualiza los campos del especialista con los nuevos datos
    especialista.nombre = data.get("nombre", especialista.nombre)
    especialista.apellido = data.get("apellido", especialista.apellido)
    especialista.email = data.get("email", especialista.email)
    especialista.profesion = data.get("profesion", especialista.profesion)
    especialista.area_de_desempeno = data.get("area_de_desempeno", especialista.area_de_desempeno)
    especialista.password = data.get("password", especialista.password)

    # Guarda los cambios en la base de datos
    db.session.commit()

    return jsonify({"message": "Especialista actualizado con éxito"}), 200

@api.route('/especialista/<int:id>', methods=['DELETE'])
def delete_especialista(id):
    # Obtén el especialista por su ID
    especialista = Specialist.query.get(id)

    # Comprueba si el especialista existe
    if especialista is None:
        return jsonify({"message": "Especialista no encontrado"}), 404

    # Elimina el especialista de la base de datos
    db.session.delete(especialista)
    db.session.commit()

    return jsonify({"message": "Especialista eliminado con éxito"}), 200

@api.route('/Project', methods=['GET'])
def get_project():
    projects = Project.query.all()

    result = list(map(lambda project:project.serialize(),projects)) 

    return jsonify(result), 200

@api.route('/Project', methods=['POST'])
def crete_project():
    nameProject = request.json.get("nameProject")
    if Project.query.filter_by(nameProject=nameProject).first() is not None:
        return jsonify({"Error": "Proyecto ya existe"}), 400
    theme = request.json.get("theme")
    location = request.json.get("location")

    new_project = Project(
        nameProject=nameProject,
        theme = theme,
        location = location
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify({"msg": "Proyecto creado satisfactoriamente"}), 200

@api.route('/Project/<int:project_id>', methods=['PUT'])
def update_project(project_id):
    project = Project.query.get(project_id)

    if not project:
        raise APIException('Proyecto no encontrado', status_code=404)

    nameProject = request.json.get("nameProject")
    theme = request.json.get("theme")
    location = request.json.get("location")

    project.nameProject = nameProject
    project.theme = theme
    project.location = location

    db.session.commit()

    return jsonify({"msg": "Proyecto actualizado satisfactoriamente"}), 200

@api.route('/Project/<int:project_id>', methods=['DELETE'])
def delete_project(project_id):
    project = Project.query.get(project_id)

    if not project:
        raise APIException('Proyecto no encontrado', status_code=404)

    db.session.delete(project)
    db.session.commit()

    return jsonify({"msg": "Proyecto eliminado satisfactoriamente"}), 200


@api.route('/admon', methods=['GET'])
def getadmins():
    all_admin = Administrator.query.all()
    results = list(map(lambda item: item.serialize(),all_admin))
    return jsonify(results), 200

@api.route('/admonreg', methods=['POST'])
def newadmins():
    correo_electronico = request.json.get("email")
    if Administrator.query.filter_by(email=correo_electronico).first()is not None:
        return jsonify({"error": "El correo electronico ya esta registrado"}), 400
    
    nombre = request.json.get("name")
    apellido = request.json.get("lastname")
    fecha_nacimiento = request.json.get("birthday")
    cargo = request.json.get("position")
    contraseña = request.json.get("password")
    informacion_adicional = request.json.get("aditional_info")
    secure_password=bcrypt.generate_password_hash(contraseña,10).decode("utf-8")
    print(secure_password)

    newadmin= Administrator(name=nombre, lastname = apellido, 
    birthday=fecha_nacimiento, 
    email = correo_electronico,
    position = cargo,
    password = secure_password,
    aditional_info = informacion_adicional
    )
    print (newadmin)
    db.session.add(newadmin)
    db.session.commit()
    return jsonify({"msg":"Usuario administrador se creo satisfactoriamente"}), 201

@api.route('/admonlogin', methods=['POST'])
def loginadmin():
    email = request.json.get("email")
    password = request.json.get("password")
    adminexist = Administrator.query.filter_by(email=email).first()
    print (type(adminexist))
    if not adminexist:
        return jsonify({"msg":"El usuario no esta registrado"}), 401
    
    if not bcrypt.check_password_hash(adminexist.password, password):
        return jsonify({"msg":"La contraseña no es correcta"}), 401
    
    token=create_access_token(identity=adminexist.id)
    return jsonify({"msg":"su usuario y contraseña son correctos", "token":token}), 201

@api.route('/admon/<int:id>', methods=['PUT'])
def modifadmins(id):
    modifadmin = Administrator.query.get(id)
    modifadmin.name = request.json.get("name")
    modifadmin.lastname = request.json.get("lastname")
    modifadmin.birthday = request.json.get("birthday")
    modifadmin.email= request.json.get("email")
    modifadmin.position = request.json.get("position")
    modifadmin.aditional_info = request.json.get("aditional_info")
    print(modifadmin)
    db.session.commit()
    return jsonify({"msg":"Usuario modificado"}), 201 

@api.route('/admon/<int:id>', methods=['DELETE'])
def deleteadmins(id):
    deleteadmin = Administrator.query.filter_by(id=id).first()
    db.session.delete(deleteadmin)
    db.session.commit()
    return jsonify({"msg":"Usuario eliminado"}), 201 





    

   
