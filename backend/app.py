from flask import Flask, request, jsonify, make_response, escape
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS,cross_origin
from . import verify
import os
import uuid
import jwt
import datetime
from functools import wraps

app = Flask(__name__)
CORS(app, support_credentials=True)

app.debug=True
app.config['SECRET_KEY']='004f2af45d3a4e161a7dd2d17fdae47f'
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.getcwd(), 'database.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True


db = SQLAlchemy(app)
db.app = app

class Users(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.Integer)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))


def init_db():
    db.create_all()

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if 'Authorization' in request.headers:
            authHandle= request.headers['Authorization'].split(' ')
            token = authHandle[1]

        if not token:
            return jsonify({'message': 'a valid token is missing'})
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = Users.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
    return decorator

@app.route('/api')
def checkinit():
    return jsonify({'message' : 'All systems online ;)'}) 

@app.route('/api/register', methods=['POST'])
def signup_user():  
    data = request.get_json()  
    dataName=escape(data['name'])
    dataEmail=escape(data['email'])
    dataPass=escape(data['password'])

    hashed_password = verify.geraHash(dataPass)
 
    new_user = Users(public_id=str(uuid.uuid4()), name=dataName,email=dataEmail, password=str(hashed_password)) 
    db.session.add(new_user)  
    db.session.commit()    

    return jsonify({'message': 'registeration successfully'})

@app.route('/api/login', methods=['POST'])  
@cross_origin(supports_credentials=True)
def login_user(): 
    auth = request.get_json()
    authPass=escape(auth['password'])
    authEmail=escape(auth['email'])


    if not auth or not authEmail or not authPass:  
        return make_response('could not verify', 401, {'Authentication': 'login required"'})    
    
    user = Users.query.filter_by(email=authEmail).first() 
    print(user)  
    if user:
        convertPass= eval(user.password)
    else:
        return make_response('This user does not exist', 401, {'Authentication': 'login required"'})

    if verify.verificaPalavraPasse(convertPass[0], convertPass[1], authPass):

        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")
        return jsonify({'token' : token}) 

    return make_response('could not verify',  401, {'Authentication': '"login required"'})


@app.route('/api/me', methods=['GET'])
@token_required
def check(self):
    return jsonify({'check' : True}) 


if  __name__ == '__main__':
    app.run(hosts='::',debug=True)
    init_db()  