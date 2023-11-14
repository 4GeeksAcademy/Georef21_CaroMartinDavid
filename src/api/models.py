from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            
            # do not serialize the password, its a security breach
        }

class Administrator(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    lastname = db.Column(db.String(120), unique=False, nullable=False)
    birthday = db.Column(db.Date, unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    position = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(100), unique=False, nullable=False)
    aditional_info = db.Column(db.String(250), unique=False, nullable=False)
    specialists = db.relationship('Specialist', backref='administrator', lazy=True)
    projects = db.relationship('Project', backref='administrator', lazy=True)
    
    def __repr__(self):
        return f'<Administrator {self.email}>'
    
    def serialize(self):
        return {
        "id":self.id,
        "email": self.email,
        "name":self.name,
        "lastname": self.lastname,
        "position":self.position,
        "aditional_info":self.aditional_info,
        "birthday": self.birthday
            # do not serialize the password, its a security breach
        }
    
class Specialist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    apellido = db.Column(db.String(120), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    profesion = db.Column(db.String(120), nullable=False)
    area_de_desempeno = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    administrator_id =  db.Column(db.Integer, db.ForeignKey('administrator.id'),nullable=False)
    visits = db.relationship('Visit', backref='specialist', lazy=True)
    datacaptures = db.relationship('DataCapture', backref='specialist', lazy=True)

    def __repr__(self):
        return f'<Specialist {self.nombre}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "apellido": self.apellido,
            "email": self.email,
            "profesion": self.profesion,
            "area_de_desempeno": self.area_de_desempeno,
            "visits": [visit.serialize() for visit in self.visits]
            
        }
    

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nameProject = db.Column(db.String(120), unique=True, nullable=False)
    theme = db.Column(db.String(120), unique=False, nullable=False)
    location = db.Column(db.String(120), unique=False, nullable=False)
    admon_id =  db.Column(db.Integer, db.ForeignKey('administrator.id'),nullable=False)
    visits = db.relationship('Visit', backref='project', lazy=True)

    def __repr__(self):
        return f'<Project {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "nameProject": self.nameProject,
            "theme": self.theme,
            "location": self.location,
            "visits": [visit.serialize() for visit in self.visits]
        }

class Visit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    scope = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    specialist_id = db.Column(db.Integer, db.ForeignKey('specialist.id'), nullable=False)
    datacaptures = db.relationship('DataCapture', backref='visit', lazy=True)
    

    def __repr__(self):
        return f'<Visit {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "scope": self.scope,
            "date": self.date,
            "project_id": self.project_id,
            "specialist_id": self.specialist_id, 
            "datacaptures": [dataCapture.serialize() for dataCapture in self.datacaptures]
        }

class DataCapture(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(255), nullable=False)  # Puedes ajustar el tipo de campo según tus necesidades
    georeferencing = db.Column(db.String(120), nullable=False)
    visit_id = db.Column(db.Integer, db.ForeignKey('visit.id'), nullable=False)
    specialist_id = db.Column(db.Integer, db.ForeignKey('specialist.id'), nullable=False)

   
    def __repr__(self):
        return f'<DataCapture {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "image": self.image,
            "georeferencing": self.georeferencing,
            "visit_id": self.visit_id,
            "specialist_id": self.specialist_id
        }