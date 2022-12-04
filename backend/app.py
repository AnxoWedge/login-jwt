# BACKEND Trabalho 1 
# Realizado por Ângelo Cunha Nº20202537 GSC2020 3ºano


# Imports Necessários para inicializar este Código
from flask import Flask, request, jsonify, make_response, escape 
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS,cross_origin# Como o frontend não está integrado com o flask è necessário chamar funções de segurança CORS
from . import verify #Modulo importado do verify.py na mesma pasya
import os 
import uuid
import jwt
import datetime
from functools import wraps

# Inicialização da applicação Flask
app = Flask(__name__ , static_folder='../frontend/build', static_url_path='/')
CORS(app, support_credentials=True) # Abrir o CORS para todos


#Configurações da aplicação
app.debug=True
app.config['SECRET_KEY']='sHe77bcHVpVf8mxvwWcpDGw6PV8ANVrt'
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.getcwd(), 'database.db')}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

#inicialização DB
db = SQLAlchemy(app)
db.app = app

#Schema para Users
class Users(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.Integer)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))

# Função para a execução da inicialização 
def init_db():
    with app.app_context():
        db.create_all() #cria a base de dados baseado nos schemas


#Como vamos utilizar uma versão costumizada de validação de Sessão, JWT - JSON Web Token, iremos necessitar de criar uma função decorator, que permita a receção dos tokens de autorização e a validação  ods mesmos. 
# Deste modo este decorador irá ser inicializado em todas as partes do código onde é necessário estar logado para o acesso. 
def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs): #Recebe os argumentos disponizabilizados no Route

        token = None

        #Quando houver a receção do Token, este virá nos Headers da ligação API. Deverá receber um Header chamado "Authorization" com o valor "Bearer examplecode123".
        #Para obtermos o token temose de separar a string deste header
        if 'Authorization' in request.headers: 
            authHandle= request.headers['Authorization'].split(' ') 
            token = authHandle[1] #['Bearer',"examplecode123"]

        if not token: #se por alguma razão não existir token nenhum, irá informal que não há um token algum
            return jsonify({'message': 'a valid token is missing'})
        
        try: # Decodificação e validação do token. 
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = Users.query.filter_by(public_id=data['public_id']).first() # Um token JWT é acompanhdo com o ID do user, logo é possível identificar quem tem o token, sem guardar o token no server.
        except:
            return jsonify({'message': 'token is invalid'}) 

        return f(current_user, *args, **kwargs)
    return decorator

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api') # Route incial para verificar a operacionalidade do servidor.
def checkinit():
    return jsonify({'message' : 'All systems online ;)'}) 

@app.route('/api/register', methods=['POST']) # Endpoint do registo
def signup_user():  
    data = request.get_json()  # Recebe-se a informação em dicionário
    #Todas as variáveis do dicionário que recebemos têm de ser limpas antes de as utilizar
    dataName=escape(data['name']) 
    dataEmail=escape(data['email'])
    dataPass=escape(data['password'])

    hashed_password = verify.geraHash(dataPass)# Hash à passowrd. receberemos um tuple com o salt e o hash.
 
    new_user = Users(public_id=str(uuid.uuid4()), name=dataName,email=dataEmail, password=str(hashed_password)) #Damos um id publico, e passamos as variáveis. #conversão de tuple em string para evitar erros
    db.session.add(new_user)  
    db.session.commit()    

    return jsonify({'message': 'registeration successfully'})

@app.route('/api/login', methods=['POST'])  # Endpoint para Login 
@cross_origin(supports_credentials=True)
def login_user(): 
    auth = request.get_json()# Recebe-se a informação em dicionário
    #Todas as variáveis do dicionário que recebemos têm de ser limpas antes de as utilizar
    authPass=escape(auth['password'])
    authEmail=escape(auth['email'])


    if not auth or not authEmail or not authPass:  # Caso não exista nada ele passa um error 401 UNAUTHORIZED 
        return make_response('could not verify', 401, {'Authentication': 'login required"'})    
    
    user = Users.query.filter_by(email=authEmail).first()  
    if user:
        convertPass= eval(user.password) #Como temos o nosso tuple em string temos de reconverter 
    else:
        return make_response('This user does not exist', 401, {'Authentication': 'login required"'})# se não for encontrado um utilizador ERRO 

    if verify.verificaPalavraPasse(convertPass[0], convertPass[1], authPass): #verificação da pass com o salt, o hash e a password inserida resperivamente.
        #aqui é criado o token para ser enviado. o token é criado usando o id publico , uma data de expiração e a secret key. Assim temos uma sessão temporária onde conseguimos identificar de quem é o token.
        token = jwt.encode({'public_id' : user.public_id, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256") 
        return jsonify({'token' : token}) 

    return make_response('could not verify',  401, {'Authentication': '"login required"'})


@app.route('/api/me', methods=['GET']) #Depois de feito o login, este Endpoint verifica de continuamos com a sessão válida.
@token_required #Login required
def check(self):
    return jsonify({'check' : True}) 


if  __name__ == '__main__':
    app.run(debug=True,ssl_context=('localhost.crt', 'localhost.key')) #start com o SSL ligado
    init_db()  