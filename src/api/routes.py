"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Admon
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/admon', methods=['GET'])
def getadmins():
    all_admin = Admon.query.all()
    results = list(map(lambda item: item.serialize(),all_admin))
    return jsonify(results), 200

@api.route('/admon', methods=['POST'])
def newadmins():
    nombre = request.json.get("nombre")
    apellido = request.json.get("apellido")
    fecha_nacimiento = request.json.get("fecha_nacimiento")
    correo_electronico = request.json.get("correo_electronico")
    cargo = request.json.get("cargo")
    contraseña = request.json.get("contraseña")
    informacion_adicional = request.json.get("informacion_adicional")
    newadmin= Admon(nombre=nombre, apellido = apellido, 
    fecha_nacimiento=fecha_nacimiento, 
    correo_electronico = correo_electronico,
    cargo = cargo,
    contraseña = contraseña,
    informacion_adicional = informacion_adicional
    )
    print (newadmin)

    db.session.add(newadmin)
    db.session.commit()
    return jsonify({"msg":"Usuario administrador se creo satisfactoriamente"}), 201

@api.route('/admon/<int:id>', methods=['PUT'])
def modifadmins(id):
    modifadmin = Admon.query.get(id)
    modifadmin.nombre = request.json.get("nombre")
    modifadmin.apellido = request.json.get("apellido")
    modifadmin.fecha_nacimiento = request.json.get("fecha_nacimiento")
    modifadmin.correo_electronico= request.json.get("correo_electronico")
    modifadmin.cargo = request.json.get("cargo")
    modifadmin.contraseña = request.json.get("contraseña")
    modifadmin.informacion_adicional = request.json.get("informacion_adicional")
    print(modifadmin)
    db.session.commit()
    return jsonify({"msg":"Usuario modificado"}), 201 

@api.route('/admon/<int:id>', methods=['DELETE'])
def deleteadmins(id):
    deleteadmin = Admon.query.filter_by(id=id).first()
    db.session.delete(deleteadmin)
    db.session.commit()
    return jsonify({"msg":"Usuario eliminado"}), 201 





    

   