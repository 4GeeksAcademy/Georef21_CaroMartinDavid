"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Specialist, Administrator, Project, Visit, DataCapture
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, JWTManager,  get_jwt_identity
from functools import wraps

api = Blueprint('api', __name__)
app = Flask(__name__)

bcrypt = Bcrypt(app)

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        
        id_admin = get_jwt_identity()
        dataadmin=Administrator.query.filter_by(id=id_admin).first()
        # Aquí puedes agregar lógica para verificar si el usuario es un administrador.
        # Por ejemplo, podrías buscar el usuario en la base de datos y comprobar si tiene un rol de administrador.
        if dataadmin:
            return fn(*args, **kwargs)
        else:
            return jsonify({"message": "Acceso no autorizado para administradores"}), 403
    return wrapper


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

@api.route('/especialista', methods=['GET'])
@jwt_required()
@admin_required

def get_especialista():
    id_admin = get_jwt_identity()
    # Supongamos que deseas obtener todos los especialistas de la base de datos
    especialistas = Specialist.query.filter_by(administrator_id=id_admin)
    
    # Convierte los objetos Specialist en un formato serializable
    especialistas_serializados = [especialista.serialize() for especialista in especialistas]
    
    return jsonify(especialistas_serializados), 200
    
@api.route('/especialista', methods=['POST'])
@jwt_required()
@admin_required

def create_especialista():
    id_admin = get_jwt_identity()
    
    # Obtiene los datos del especialista desde la solicitud
    data = request.json
    nombre=data.get("nombre")
    apellido=data.get("apellido")
    email=data.get("email")
    profesion=data.get("profesion")
    area_de_desempeno=data.get("area_de_desempeno")
    password=data.get("password")

    if not data:
        return jsonify({"error": "Datos no proporcionados"}), 400
    if nombre == "" and apellido == "" and email == "" and profesion == "" and area_de_desempeno == "" and password == "":
        return jsonify({"error": "diligencie el formulario completo"}), 401
    
    if Specialist.query.filter_by(email=email).first()is not None:
        return jsonify({"error": "El correo electronico ya esta registrado"}), 402
    
    secure_password=bcrypt.generate_password_hash(password,10).decode("utf-8")
    print(secure_password)
    # Crea un nuevo objeto Specialist
    nuevo_especialista = Specialist(

        nombre=nombre,
        apellido=apellido,
        email=email,
        profesion=profesion,
        area_de_desempeno=area_de_desempeno,
        password=secure_password,
        administrator_id= id_admin
    )
    # Agrega el especialista a la base de datos
    db.session.add(nuevo_especialista)
    db.session.commit()

    # Retorna una respuesta con el nuevo especialista creado
    return jsonify({"msg": "Especialista creado con éxito", "id": nuevo_especialista.id}), 201

@api.route('/especialista/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required

def update_especialista(id):
    id_admin = get_jwt_identity()
    # Obtén el especialista existente por su ID
    especialista = Specialist.query.get(id)

    # Comprueba si el especialista existe
    if especialista is None:
        return jsonify({"msg": "Especialista no encontrado"}), 404

    if especialista.administrator_id != id_admin:
        return jsonify({"msg": "No tienes permiso para modificar datos de este especialista"}), 403
    # Obtén los datos actualizados del especialista desde la solicitud
    data = request.json

    if not data:
        return jsonify({"msg": "Datos no proporcionados"}), 400

    # Actualiza los campos del especialista con los nuevos datos
    especialista.nombre = data.get("nombre")
    especialista.apellido = data.get("apellido")
    especialista.email = data.get("email")
    especialista.profesion = data.get("profesion")
    especialista.area_de_desempeno = data.get("area_de_desempeno")
        # Guarda los cambios en la base de datos
    db.session.commit()
    return jsonify({"msg": "Especialista actualizado con éxito"}), 200

@api.route('/especialista/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required

def delete_especialista(id):
    id_admin = get_jwt_identity()
    # Obtén el especialista por su ID
    especialista = Specialist.query.get(id)

    # Comprueba si el especialista existe
    if especialista is None:
        return jsonify({"msg": "Especialista no encontrado"}), 404

    if especialista.administrator_id != id_admin:
        return jsonify({"msg": "No tienes permiso para eliminar este especialista"}), 403
    # Elimina el especialista de la base de datos
    db.session.delete(especialista)
    db.session.commit()

    return jsonify({"msg": "Especialista eliminado con éxito"}), 200

@api.route('/Project', methods=['GET'])
@jwt_required()
@admin_required

def get_project():
    id_admin = get_jwt_identity()
    projects = Project.query.filter_by(admon_id=id_admin).all()
    result = list(map(lambda project:project.serialize(),projects)) 
    return jsonify(result), 200

@api.route('/Project', methods=['POST'])
@jwt_required()
@admin_required

def crete_project():
    id_admin = get_jwt_identity()
    nameProject = request.json.get("nameProject")
    if Project.query.filter_by(nameProject=nameProject).first() is not None:
        return jsonify({"Error": "Proyecto ya existe"}), 400
    theme = request.json.get("theme")
    location = request.json.get("location")

    new_project = Project(
        nameProject=nameProject,
        theme = theme,
        location = location,
        admon_id=id_admin
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify({"msg": "Proyecto creado satisfactoriamente"}), 200

@api.route('/Project/<int:project_id>', methods=['PUT'])
@jwt_required()
@admin_required

def update_project(project_id):
    id_admin = get_jwt_identity()
    
    project = Project.query.get(project_id)

    if not project:
        raise APIException('Proyecto no encontrado', status_code=404)
    
    if project.admon_id != id_admin:
        raise APIException('No tienes permiso para actualizar este proyecto', status_code=403)

    nameProject = request.json.get("nameProject")
    theme = request.json.get("theme")
    location = request.json.get("location")

    project.nameProject = nameProject
    project.theme = theme
    project.location = location

    admin_id = request.json.get("admin_id")
    if admin_id is not None:
        project.admin_id = admin_id

    db.session.commit()
    return jsonify({"msg": "Proyecto actualizado satisfactoriamente"}), 200


@api.route('/Project/<int:project_id>', methods=['DELETE'])
@jwt_required()
@admin_required

def delete_project(project_id):
    id_admin = get_jwt_identity()
    project = Project.query.get(project_id)

    if not project:
        raise APIException('Proyecto no encontrado', status_code=404)

    if project.admon_id != id_admin:
        raise APIException('No tienes permiso para eliminar este proyecto', status_code=403)
    
    db.session.delete(project)
    db.session.commit()

    return jsonify({"msg": "Proyecto eliminado satisfactoriamente"}), 200


@api.route('/admon', methods=['GET'])
@jwt_required()
@admin_required

def getadmins():
    id_admin = get_jwt_identity()
    administrator = Administrator.query.filter_by(id=id_admin).first()
    if not administrator:
        return jsonify({"msg": "no existe este administrador"}), 404
    
    results = administrator.serialize()
    return jsonify(results), 200


@api.route('/admon/<int:id>', methods=['PUT'])
@jwt_required()
@admin_required

def modifadmins(id):
    id_admin = get_jwt_identity()
    if id != id_admin:
        return jsonify({"msg":"No tiene permisos para modificar este administrador"}), 403 
    
    modifadmin = Administrator.query.get(id)
    modifadmin.name = request.json.get("name")
    modifadmin.lastname = request.json.get("lastname")
    modifadmin.birthday = request.json.get("birthday")
    modifadmin.email= request.json.get("email")
    modifadmin.position = request.json.get("position")
    modifadmin.aditional_info = request.json.get("aditional_info")
    print(modifadmin)
    db.session.commit()
    return jsonify({"msg":"haz  modificado tu perfil administrador"}), 201 

@api.route('/admon/<int:id>', methods=['DELETE'])
@jwt_required()
@admin_required

def deleteadmins(id):
    id_admin = get_jwt_identity()
    print ("id:", id)
    print ("idadmin:",id_admin)
    if id != id_admin:
        return jsonify({"msg":"No tiene permisos para modificar este administrador"}), 403 
    deleteproyectadmin = Project.query.filter_by(admon_id=id).all()
    for project in deleteproyectadmin:
        db.session.delete(project)
    db.session.commit()

    deleteespecialistaadmin =Specialist.query.filter_by(administrator_id=id).all()
    for specialist in deleteespecialistaadmin:
        db.session.delete(specialist)
    db.session.commit()

    deleteadmin = Administrator.query.get(id)
    print(deleteadmin)
    db.session.delete(deleteadmin)
    db.session.commit()
    return jsonify({"msg":"Usuario eliminado"}), 201 
@api.route('/visits', methods=['GET'])
def get_visits():
    visits = Visit.query.all()
    return jsonify([visit.serialize() for visit in visits]), 200

@api.route('/visits', methods=['POST'])
def create_visit():
    data = request.get_json()

    # Data Validation
    required_fields = ['scope', 'date', 'project_id', 'specialist_id']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Field '{field}' is required"}), 400

    try:
        new_visit = Visit(
            scope=data['scope'],
            date=data['date'],
            project_id=data['project_id'],
            specialist_id=data['specialist_id']
        )

        db.session.add(new_visit)
        db.session.commit()

        # Return 201 Created with the location of the new visit
        response = jsonify(new_visit.serialize())
        response.status_code = 201
        response.headers['Location'] = url_for('api.get_visits', visit_id=new_visit.id)
        return response

    except Exception as e:
        # Handle database errors or other exceptions
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/visits/<int:visit_id>', methods=['PUT'])
def update_visit(visit_id):
    try:
        # Obtener la visita existente por ID
        visit = Visit.query.get(visit_id)

        # Si la visita no existe, devolver un error 404
        if not visit:
            return jsonify({"error": "Visit not found"}), 404

        # Obtener los datos JSON de la solicitud
        data = request.get_json()

        # Actualizar los campos relevantes
        if 'scope' in data:
            visit.scope = data['scope']
        if 'date' in data:
            visit.date = data['date']
        if 'project_id' in data:
            visit.project_id = data['project_id']
        if 'specialist_id' in data:
            visit.specialist_id = data['specialist_id']

        # Guardar los cambios en la base de datos
        db.session.commit()

        # Devolver la visita actualizada
        response = jsonify(visit.serialize())
        response.status_code = 200
        response.headers['Location'] = url_for('get_visits', visit_id=visit.id)
        return response

    except Exception as e:
        # Manejar errores de la base de datos u otras excepciones
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/visits/<int:visit_id>', methods=['DELETE'])
def delete_visit(visit_id):
    try:
        visit = Visit.query.get(visit_id)

        # Si la visita no existe, devolver un error 404
        if not visit:
            return jsonify({"error": "Visit not found"}), 404

        db.session.delete(visit)
        db.session.commit()

        # Devolver una respuesta exitosa
        response = jsonify({"message": "Visit deleted successfully"})
        response.status_code = 200
        return response

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/datacapture', methods=['GET'])
def get_data_captures():
    data_captures = DataCapture.query.all()
    serialized_data_captures = [data_capture.serialize() for data_capture in data_captures]
    return jsonify(serialized_data_captures), 200

@api.route('/datacapture', methods=['POST'])
def create_data_capture():
    # Obtén los datos del DataCapture desde la solicitud
    data = request.json

    if not data:
        return jsonify({"message": "Datos no proporcionados"}), 400

    # Crea una nueva instancia de DataCapture
    nuevo_data_capture = DataCapture(
        title=data.get("title"),
        description=data.get("description"),
        image=data.get("image"),
        georeferencing=data.get("georeferencing"),
        visit_id=data.get("visit_id"),
        specialist_id=data.get("specialist_id")
    )

    # Agrega la nueva instancia a la base de datos
    db.session.add(nuevo_data_capture)
    
    try:
        # Intenta realizar la operación de commit
        db.session.commit()

        # Devuelve una respuesta con el nuevo DataCapture creado
        return jsonify({"message": "DataCapture creado con éxito", "id": nuevo_data_capture.id}), 201
    except Exception as e:
        # Maneja los errores de la base de datos y realiza un rollback
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/datacapture/<int:data_capture_id>', methods=['PUT'])
def update_data_capture(data_capture_id):
    # Obtén la instancia existente de DataCapture por su ID
    data_capture = DataCapture.query.get(data_capture_id)

    # Comprueba si la instancia existe
    if data_capture is None:
        return jsonify({"message": "DataCapture no encontrado"}), 404

    # Obtén los datos actualizados desde la solicitud
    data = request.json

    if not data:
        return jsonify({"message": "Datos no proporcionados"}), 400

    # Actualiza los campos del DataCapture con los nuevos datos
    data_capture.title = data.get("title", data_capture.title)
    data_capture.description = data.get("description", data_capture.description)
    data_capture.image = data.get("image", data_capture.image)
    data_capture.georeferencing = data.get("georeferencing", data_capture.georeferencing)
    data_capture.visit_id = data.get("visit_id", data_capture.visit_id)
    data_capture.specialist_id = data.get("specialist_id", data_capture.specialist_id)

    # Guarda los cambios en la base de datos
    try:
        db.session.commit()
        return jsonify({"message": "DataCapture actualizado con éxito"}), 200
    except Exception as e:
        # Maneja los errores de la base de datos y realiza un rollback
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/datacapture/<int:data_capture_id>', methods=['DELETE'])
def delete_data_capture(data_capture_id):
    # Obtén la instancia de DataCapture por su ID
    data_capture = DataCapture.query.get(data_capture_id)

    # Comprueba si la instancia existe
    if data_capture is None:
        return jsonify({"message": "DataCapture no encontrado"}), 404

    # Elimina la instancia de la base de datos
    try:
        db.session.delete(data_capture)
        db.session.commit()
        return jsonify({"message": "DataCapture eliminado con éxito"}), 200
    except Exception as e:
        # Maneja los errores de la base de datos y realiza un rollback
        db.session.rollback()
        return jsonify({"error": str(e)}), 500





    

   
