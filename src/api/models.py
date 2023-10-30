from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Admon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    apellido = db.Column(db.String(120), unique=False, nullable=False)
    fecha_nacimiento = db.Column(db.Date, unique=False, nullable=False)
    correo_electronico = db.Column(db.String(120), unique=True, nullable=False)
    cargo = db.Column(db.String(120), unique=True, nullable=False)
    contraseña = db.Column(db.String(10), unique=False, nullable=False)
    informacion_adicional = db.Column(db.String(250), unique=True, nullable=False)

    def __repr__(self):
        return f'<Admon {self.correo_electronico}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.correo_electronico,
            "Nombre":self.nombre,
            "Apellido": self.apellido,
            "Cargo":self.cargo,
            "Info":self.informacion_adicional
            # do not serialize the password, its a security breach
        }