# Shopping List with React Flask API With Register and login 

This is a project made With flask backend and React frontend. Its aim is to meet the requirements for a College project but also Test and increase my skills in this area. 

## Contexto do Trabalho:

    O objetivo deste projeto é construir um sistema web completo com frontend em HTML+JS+CSS e backend em flask, utilizando uma base de dados de escolha do grupo (sqlite, mysql, etc). O tema da base de dados é livre, mas o sistema deve incluir um CRUD ou um sistema de visualização de dados de base (apenas R do CRUD) através de tabelas dinâmicas ou gráficos. Além disso, o sistema deve incluir as funcionalidades de login e registo do primeiro trabalho. O grupo deve apresentar oralmente o trabalho no último dia de aula (09/01/2023).

    Requisitos principais:

       - Implementar sistema CRUD ou sistema de visualização de dados de base com tabelas dinâmicas ou gráficos
       - Utilizar o sistema de login e registo do primeiro trabalho
       - Utilizar o Flask de acordo com os exercícios práticos realizados em aulas
       - Utilizar cookies via sessão do Flask para manter o utilizador logado enquanto a sessão estiver aberta
       - A página de login deve ser a primeira a ser exibida se o utilizador não estiver logado
       - A página de login deve conter um link para o registo no sistema
       - O utilizador e senha devem ser verificados no servidor e o acesso ao sistema só deve ser permitido com permissão
       - Caso o utilizador ou senha não correspondam à informação no servidor, um aviso deve ser exibido na página de login
       - Fazer uso de HTTPS ao invés de HTTP
       - A página de registo deve registrar pelo menos o nome, email e senha do utilizador
       - A senha pode ser enviada em texto plano com o uso de HTTPS, que criptografa o texto
       - As senhas registradas devem ser armazenadas de forma segura com o uso de hash salt em arquivo ou base de dados
       - O procedimento de geração de hash deve ser implementado pelo grupo e não deve ser utilizado nenhum pacote próprio de Python, apenas livrarias básicas como hashllib, random e string.

## Diferenças Implementadas proposta à Professora com aprovação

    Com a ambição de criar algo mais além das minhas capacidades, propos à professora algumas mudanças mais avançadas no meu projecto, mas que vai ao encontro aos objetivos pedidos. 
    A minha proposta foi fazer um frontend em React, utilizando O CRA ( create-react-app ) onde este depois se conectava com o servidor flask via endpoints. Para a sessão seria foi utilizado o JWT (JSON Web Token), que proporciona o mesmo objetivo de utilizar sessões para o login. A proposta não faz qualquer outra modificação, e proporciona todos os objetivos para o trabalho. 

## Tema proposta à professora

    Este tema foi proposto à professora baseado num trabalho anteriormente realizado, uma Lista de Compras meramente suportada por HTML, CSS e Javascript. Face à proposta de trabalho, o grupo decidiu melhorar este trabalho anterior, conrrespondendo os requisitos do trabalho e melhorando várias parates gráficas e funcionais, que tenham sido notados no trabalho anterior. 
    Assim a Shopping List tornou-se uma lista, bastante mais funcional, User-friendly, Responsive, e adaptável às necessidades do utilizador.

## Problemas e Desafios

    Para o desenvolvimento desta solução existiram vários que tiveram de ser ultrapassado cujo o trabalho realizado da maneira original não haveria problema. Neste caso e o maior problema foi ultrapassar o CORS, ativo em todos os browsers e completamente furstrante. :) Felizmente foi feito um proxy para ultrapassar-lo, no entanto deixo alguns avisos caso seja encontrado em diferentes máquinas:

    - Terminais do VScode - Notei que quando os servidores são iniciados pelo terminal do vscode, o CORS não aceita as diferentes transacções entre o Frontend e o backend. Caso um erro CORS(visto no console de JS no browser) existir recomendo o uso do CMD do windows ou equivalente, separadamente do VScode

    - Visualização do frontend - Todo o site poderá ser navegado pelo o localhost:5000 ou https://127.0.0.1:5000 . Caso não dar deixo os passos de como os utilizar através dos Readme.md em cada uma das pastas. 

## Funcionalidade JWT - Re explicado

    O JWT (JSON Web Token) é um padrão aberto que define uma maneira de transmitir informações seguras de forma compacta entre duas partes. Ele é composto por três partes: um cabeçalho, um corpo (payload) e uma assinatura.

    O cabeçalho contém informações sobre como o JWT foi assinado. O corpo (payload) contém as informações que você quer transmitir, como o nome de utilizador ou o ID do utilizador. A assinatura é usada para garantir que o conteúdo do JWT não foi alterado durante a transmissão.

    Para verificar a integridade de um JWT, o receptor verifica a assinatura usando a chave secreta compartilhada. Se a assinatura for válida, o receptor pode confiar nas informações contidas no JWT.

    Um uso comum do JWT é autenticar utilizadors em uma aplicação web. Quando um utilizador faz login com sucesso, o servidor de autenticação emite um JWT contendo informações de identificação do utilizador. O cliente armazena esse JWT e o envia de volta para o servidor em cada solicitação subsequente, permitindo que o servidor saiba que o utilizador foi autenticado. Isso é útil porque o JWT pode ser usado em vez de uma sessão para autenticar o utilizador em todas as solicitações subsequentes, sem precisar armazenar os dados de autenticação no lado do servidor.

## Não está nada a funcionar? 

    Caso por alguma razão nada estiver a correr como planeado, ficamos disponíveis para o plano B. :) É só mandar o email que ajudaremos no que for necessário para por tudo normal.