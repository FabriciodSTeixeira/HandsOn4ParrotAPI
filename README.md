# Hands On 4  - Rede Social Parrot -
 
![Gama Academy](https://storage.gama.academy/logo.svg)


 Este projeto proposto pela equipe da Gama Academy durante o XP 43 consiste em criar uma rede social fictícia de um condomínio, dividindo a equipe em duas partes: Front-end e Back-end.

## Para a criação do Back End foi utilizado :
- TypeScript<br>
- TypeOrm<br>
- Conceitos SOLID<br>
- Frameworks como : Jwt e Express<br>

A utilização das ferramentas acima se deu devido a proposta de fixação dos conteúdos um pouco mais avançados no back end, e a utilização de um framework comopatível com o TypeScript, implementando ainda rotas com necessidade de autenticação e a diferenciação de contas comuns com contas adminisitrativas.

Melhorias quais estou em busca é a implementação de mais opções como a opção de edição/deletar posts, comentários e likes.

## Como rodar esta API:
- 1- Utilizar os comandos `npm install` ou `yarn install`.

- 2- Alterar dados do arquivo .env conforme banco de dados local `(arquivo .env exemplo)`. 

- 3 - Criar um schema vazio no MySQL.

- 4 - Rodar o server com o comando `npm run dev`.


## O server possui as funcionalidades a seguir:

Rotas usuário -
- Cadastrar usuário
- Visualizar usuários (admin)
- Deletar usuários (admin)
- Editar usuário/perfil

Rotas posts - 
- Criar post
- Visualizar posts por usuário
- Visualizar todos os posts
- Editar posts
- Apagar posts


## 
