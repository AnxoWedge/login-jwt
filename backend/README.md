# Backend

É necessário instalar os pacotes no requirements.txt. Para tal basta iniciar o comando a baixo: 

### pip install -r requirements.txt

Basta iniciar o comando normal do flask:

### flask run


## Base de dados
Caso tenhas feito o clone via github e não esteja a criar a base de dados. será necessário a criação manual da mesma: 

### Abrir a consola do python na directoria "/backend":
### >from app import db
### >import flask_sqlalchemy
### >db.create_all
### >user=User(nome,email,password)
### >db.session.add(user)
### >db.session.commit()