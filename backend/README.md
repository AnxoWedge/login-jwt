# Backend

É necessário instalar os pacotes no requirements.txt. Para tal basta iniciar o comando a baixo: 

### pip install -r requirements.txt

Para inciar o servidor sem problemas, e com SSL, terás de utilizar o python da seguinte maneira:

### python app.py

Com o tipico "flask run" ele não irá reconhecer nem o verify.py como também o SSL. Logo não daria para fazer chamadas com HTTPS

## Base de dados
Caso tenhas feito o clone via github e não esteja a criar a base de dados. Será necessário a criação manual da mesma: 

### Abrir a consola do python na directoria "/backend":
### >from app import db
### >import flask_sqlalchemy
### >db.create_all
### >user=User(nome,email,password)
### >db.session.add(user)
### >db.session.commit()
### >item=ShoppingList(username,item,qty)
### >db.session.add(item)
### >db.session.commit()