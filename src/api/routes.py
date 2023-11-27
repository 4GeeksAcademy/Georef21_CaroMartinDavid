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
    image_admon = request.json.get("image_admon")
    secure_password=bcrypt.generate_password_hash(contraseña,10).decode("utf-8")
    print(secure_password)

    newadmin= Administrator(
    name=nombre, 
    lastname = apellido, 
    birthday=fecha_nacimiento, 
    email = correo_electronico,
    position = cargo,
    password = secure_password,
    image_admon = image_admon
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
    imageprofile = data.get("imageprofile")

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
        imageprofile=imageprofile,
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
    imageprofile=data.get("imageprofile")
    if imageprofile:
        especialista.imageprofile = imageprofile
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
    theme = request.json.get("theme")
    location = request.json.get("location")

    if nameProject == "" and  theme == "" and location == "":
        return jsonify({"Error": "Diligencie los datos"}), 400
    
    if Project.query.filter_by(nameProject=nameProject).first() is not None:
        return jsonify({"Error": "Proyecto ya existe"}), 402

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
        return jsonify({"Error": "Proyecto no encontrado"}), 404
       
    
    if project.admon_id != id_admin:
        return jsonify({"Error": "No tienes permiso para actualizar este proyecto"}), 403
    

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
        return jsonify({"msg": "Proyecto no encontrado"}), 404

    if project.admon_id != id_admin:
        return jsonify({"msg": "No tienes permiso para eliminar este proyecto"}), 403
    
    deletevisitproy = Visit.query.filter_by(project_id=project_id).all()
    for visit in deletevisitproy:
        print(f"Visit ID: {visit.id}, Project ID: {visit.project_id}")
        deletedatacaptvisit = DataCapture.query.filter_by(visit_id=visit.id).all()
        for data in deletedatacaptvisit:
            db.session.delete(data)
        db.session.delete(visit)
    db.session.commit()
    
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
    image_admon = request.json.get("image_admon")
    if image_admon:
        modifadmin.image_admon=image_admon
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

@api.route('/especialistalog', methods=['GET'])
@jwt_required()
def especialista_logeado():
    emailspecialist = get_jwt_identity()
    # Supongamos que deseas obtener todos los especialistas de la base de datos
    especialista = Specialist.query.filter_by(email=emailspecialist).first()
    if not especialista:
        return jsonify({"msg": "no existe este especialista"}), 404
    results = especialista.serialize()
    return jsonify(results), 200
    # Convierte los objetos Specialist en un formato serializable

@api.route("/loginSpecialist", methods=["POST"])
def loginSpecilist():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    specialist = Specialist.query.filter_by(email=email).first()
    if specialist is None:
        return jsonify({"msg": "user not found"}), 404
    # if email != specialist.email or password != specialist.password:
        # return jsonify({"msg": "Bad email or password"}), 401
        
    if not bcrypt.check_password_hash(specialist.password, password):
        return jsonify({"msg":"La contraseña no es correcta"}), 401


    access_token = create_access_token(identity=specialist.email)
    return jsonify(access_token=access_token), 200

@api.route('/visits', methods=['GET'])
@jwt_required()
@admin_required
def get_visits():
    id_admin = get_jwt_identity()
    visits = Visit.query.join(Project).filter(Project.admon_id == id_admin).all()

    if not visits:
        return jsonify({"msg": "No tienes visitas registradas"}), 404

    visits_serializados = [visit.serialize() for visit in visits]  # Cambio aquí
    print(visits_serializados)
    return jsonify(visits_serializados), 200

@api.route('/visitsEsp', methods=['GET'])
@jwt_required()
def get_visitsesp():
    emailspecialist = get_jwt_identity()
    visits = Visit.query.join(Specialist).filter(Specialist.email ==emailspecialist).all()
    if not visits:
        return jsonify({"msg": "No tienes visitas registradas"}), 404

    visits_serializados = [visit.serialize() for visit in visits]
    projects = []
    for visitasig in visits_serializados:
        id =visitasig["project_id"]
        projects.append(Project.query.get(id))
    
    projects_serializados = [proj.serialize() for proj in projects]

    return jsonify({"visitAsig":visits_serializados,"projectAsig":projects_serializados}), 200

@api.route('/admonvisits', methods=['POST'])
@jwt_required()
@admin_required
def create_visit():
    id_admin = get_jwt_identity()
    data = request.get_json()
    # Data Validation
    if not data:
        return jsonify({"error": "Datos no proporcionados"}), 400
    
    if data['scope'] == "" or data['date'] == "" or data['project_id'] == "" or data['specialist_id'] == "":
        return jsonify({"error": "Datos incompletos"}), 401
    
    existing_visit = Visit.query.filter_by(date=data['date'], specialist_id=data['specialist_id']).first()
    if existing_visit:
        error_message = f"Ya existe una visita para este día ({data['date']}) con el mismo especialista ({data['specialist_id']})"
        return jsonify({"error": error_message}), 402
        
    new_visit = Visit(
        scope=data['scope'],
        date=data['date'],
        project_id=data['project_id'],
        specialist_id=data['specialist_id']
    )

    db.session.add(new_visit)
    db.session.commit()
    return jsonify({"msg": "visita creado satisfactoriamente"}), 200
            
@api.route('/visits/<int:visit_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_visit(visit_id):
    id_admin = get_jwt_identity()
    visits = Visit.query.join(Project).filter(Project.admon_id == id_admin).all()
    if any(visit.id == visit_id for visit in visits):
        try:
            # Obtener la visita existente por ID
            visit = Visit.query.get(visit_id)
            
            # Obtener los datos JSON de la solicitud
            data = request.get_json()

            # Actualizar los campos relevantes
            
            visit.scope = data['scope']
            visit.date = data['date']
            visit.project_id = data['project_id']
            visit.specialist_id = data['specialist_id']

            # Guardar los cambios en la base de datos
            db.session.commit()

            # Devolver la visita actualizada
            return jsonify({"msg": "visita actualizada"}), 200
        except Exception as e:
        # Manejar errores de la base de datos u otras excepciones
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
    else:
        # El visit_id no está en la lista de visits, devolver un error
        return jsonify({"error": f"No se encontró la visita con ID {visit_id}"}), 404
   

@api.route('/visits/<int:visit_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_visit(visit_id):
    id_admin = get_jwt_identity()
    visits = Visit.query.join(Project).filter(Project.admon_id == id_admin).all()
    if any(visit.id == visit_id for visit in visits):
        try:
            visit = Visit.query.get(visit_id)
            db.session.delete(visit)
            db.session.commit()

            # Devolver una respuesta exitosa
            return jsonify({"msg": "visita eliminada"}), 200

        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 500
    else:
        # El visit_id no está en la lista de visits, devolver un error
        return jsonify({"error": f"No se encontró la visita con ID {visit_id}"}), 404


@api.route('/datacapture', methods=['GET'])
@jwt_required()
def get_data_captures():
    emailspecialist = get_jwt_identity()
    data_captures = DataCapture.query.join(Specialist).filter(Specialist.email ==emailspecialist).all()
    if not data_captures:
        return jsonify({"msg": "No tienes datos registradas"}), 404

    serialized_data_captures = [data_capture.serialize() for data_capture in data_captures]
    return jsonify(serialized_data_captures), 200



@api.route('/datacapture', methods=['POST'])
@jwt_required()
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
        return jsonify({"msg": "DataCapture creado con éxito", "id": nuevo_data_capture.id}), 201
    except Exception as e:
        # Maneja los errores de la base de datos y realiza un rollback
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@api.route('/datacapture/<int:data_capture_id>', methods=['PUT'])
@jwt_required()
def update_data_capture(data_capture_id):
    emailspecialist = get_jwt_identity()
    data_captures = DataCapture.query.join(Specialist).filter(Specialist.email ==emailspecialist).all()
   
    matching_data_capture = next((dc for dc in data_captures if dc.id == data_capture_id), None)
    if matching_data_capture:
   
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
        data_capture.visit_id = data.get("visit_id", data_capture.visit_id)
        if data_capture.image :
               data_capture.image = data.get("image", data_capture.image)

    # Guarda los cambios en la base de datos
        db.session.commit()
        return jsonify({"msg": "DataCapture actualizado con éxito"}), 200
    
    else:
        return jsonify({"message": "Data capture not found or does not belong to the specialist"}), 404
   

@api.route('/datacapture/<int:data_capture_id>', methods=['DELETE'])
@jwt_required()
def delete_data_capture(data_capture_id):
    emailspecialist = get_jwt_identity()
    data_captures = DataCapture.query.join(Specialist).filter(Specialist.email ==emailspecialist).all()
   
    matching_data_capture = next((dc for dc in data_captures if dc.id == data_capture_id), None)

    if matching_data_capture:
        # Si el data_capture_id es válido, procede con la eliminación
        db.session.delete(matching_data_capture)
        db.session.commit()
        return jsonify({"message": "Data capture deleted successfully"}), 200
    else:
        return jsonify({"message": "Data capture not found or does not belong to the specialist"}), 404
   




    
