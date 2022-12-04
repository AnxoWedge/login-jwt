# React Flask API With Register and login 

This is a project made With flask backend and React frontend. Its aim is to meet the requirements for a College project but also Test and increase my skills in this area. 

## Contexto do Trabalho: 

Objetivo: criar uma página de login e uma página de registo de utilizador funcionais para um sistema web a ser definido (este corresponderá ao trabalho final em dupla). Para este trabalho, todos os seguintes itens são requisitos:

    - Fazer uso do Flask conforme os exercícios práticos feitos em aulas (vide slides de aula);
    - Utilizar cookies via session do Flask: utilizador deve permanecer logado enquanto uma sessão está aberta;
    - Página de login é a primeira página que deve aparecer se o utilizador não estiver logado;
        - Página de login deve conter ligação para registo no sistema (por exemplo, um botão de registo);
        - Utilizador e palavra-passe devem ser verificados no servidor e o sistema web só pode ser acessado se houver permissão;
        - Caso utilizador ou palavra-passe não casem com informação no servidor, um aviso deve ser mostrado na página de login;
        - Fazer uso de HTTPS ao invés de HTTP.
    - Página de registo deve registar ao menos o nome, o e-mail e a palavra-passe do utilizador;
        - A palavra-passe pode ser enviada em texto plano. Ao utilizar HTTPS, o texto vai criptografado e, portanto, não há problemas de segurança.
        - Palavras-passe registadas devem ser armazenadas de forma segura com o uso de hash salt em ficheiro ou base de dados.
        - O procedimento de geração de hash deve ser implementado pelo aluno e não devem ser utilizadas livrarias/bibliotecas próprias de Python. Isto é, para este propósito, deve-se apenas utilizar livrarias básicas como hashllib, random, string, conforme visto em aula.

## Diferenças Implementadas proposta à Professora com aprovação

    Com a ambição de criar algo mais além das minhas capacidades, propos à professora algumas mudanças mais avançadas no meu projecto, mas que vai ao encontro aos objetivos pedidos. 
    A minha proposta foi fazer um frontend em React, utilizando O CRA ( create-react-app ) onde este depois se conectava com o servidor flask via endpoints. Para a sessão seria foi utilizado o JWT (JSON Web Token), que proporciona o mesmo objetivo de utilizar sessões para o login. A proposta não faz qualquer outra modificação, e proporciona todos os objetivos para o trabalho. 

## Problemas e Desafios

    Para o desenvolvimento desta solução existiram vários que tiveram de ser ultrapassado cujo o trabalho realizado da maneira original não haveria problema. Neste caso e o maior problema foi ultrapassar o CORS, ativo em todos os browsers e completamente furstrante. :) Felizmente foi feito um proxy para ultrapassar-lo, no entanto deixo alguns avisos caso seja encontrado em diferentes máquinas:

    - Terminais do VScode - Notei que quando os servidores são iniciados pelo terminal do vscode, o CORS não aceita as diferentes transacções entre o Frontend e o backend. Caso um erro CORS(visto no console de JS no browser) existir recomendo o uso do CMD do windows ou equivalente, separadamente do VScode

    - Visualização do frontend - Todo o site poderá ser navegado pelo o localhost:5000 ou https://127.0.0.1:5000 . Caso não dar deixo os passos de como os utilizar através dos Readme.md em cada uma das pastas. 

## Funcionalidade JWT

    O JSON Web Token é de facto diferente da sessão e cookies dados em aula. No entanto, são processados de forma parecida, e codificados de forma quase igual. Os dois precisam de uma secret key, conseguem perceber o user_id e têm uma data de expiração. No Entanto o JWT é mais fléxivel a mais plataformas e é um token que neste momento está em crescimento também graças à JAMstack. Os Session Cookies, devido ás legislações em produção, como o GDPR, são cada vez menos escolhidos para não haver muitos cookies no site.  

## Não está nada a funcionar? 

    Caso por alguma razão nada estiver a correr como planeado, fico disponível para o plano B. :) É só mandar o email ou dar um toque em aula que ajudarei no que for necessário para por tudo normal.