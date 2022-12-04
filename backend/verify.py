import hashlib, string, random

# Verifica se hashSHA256(salt+passwd) é igual ao hash do argumento
def verificaPalavraPasse(salt, hash, passwd):
    bytes = (salt+passwd).encode()
    return(hashlib.sha256(bytes).digest() == hash)

# Gera um salt aleatoriamente, o hash(salt+passwd).
# Retorna uma tupla com o salt e os bytes do hash   
def geraHash(passwd):
    caracteres = string.ascii_letters+string.digits+string.punctuation
    # Gera um salt de 16 bits aleatoriamente
    salt = ''.join(random.choices(caracteres, k=16))
    # Gera o hash (SHA 256) do salt + palavra-passe
    hash = hashlib.sha256((salt+passwd).encode())
    return (salt, hash.digest())