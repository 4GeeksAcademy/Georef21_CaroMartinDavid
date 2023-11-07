"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Administrator, Project
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

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

@api.route('/admon', methods=['POST'])
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
    newadmin= Administrator(name=nombre, lastname = apellido, 
    birthday=fecha_nacimiento, 
    email = correo_electronico,
    position = cargo,
    password = contraseña,
    aditional_info = informacion_adicional
    )
    print (newadmin)

    db.session.add(newadmin)
    db.session.commit()
    return jsonify({"msg":"Usuario administrador se creo satisfactoriamente"}), 201

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





    

   