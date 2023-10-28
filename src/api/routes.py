"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Specialist
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


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
        # apellido=data.get("apellido"),
        email=data.get("email"),
        profesion=data.get("profesion"),
        area_de_desempeño=data.get("area_de_desempeño"),
        password=data.get("password")
    )
    # Agrega el especialista a la base de datos
    db.session.add(nuevo_especialista)
    db.session.commit()

    # Puedes retornar una respuesta con el nuevo especialista creado
    return jsonify({"message": "Especialista creado con éxito", "id": nuevo_especialista.id}), 201