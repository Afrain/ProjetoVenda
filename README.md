
![Venda Api](https://user-images.githubusercontent.com/9250787/186289306-72ce9c50-bbeb-4084-842d-da90514f91fa.png)

## Sobre o projeto
Projeto desenvolvido para atestar os conhecimentos com algumas tecnologias na criação de aplicações web.

## Funcionalidades

Os usuários tem acesso a aplicação web, onde podem acessar:
* <b>CLIENTES</b>: Onde é feito o cadastro, edição, exclusão e a listagem dos clientes.
* <b>PRODUTOS</b>: Onde é feito o cadastro, edição, exclusão e a listagem dos produtos.
* <b>VENDAS</b>: Onde é feito o cadastro, edição, exclusão e a listagem das vendas.  

## Layout

Client List

![ListClient](https://user-images.githubusercontent.com/9250787/186418793-174d9a40-0feb-4052-a86b-197e1cb9e45c.PNG)

Client Form

![FormClient](https://user-images.githubusercontent.com/9250787/186419490-c51b6ff8-7a45-4288-9b6c-4155ffacfde7.PNG)

Product List

![ListProducts](https://user-images.githubusercontent.com/9250787/186419946-19cdcf67-06eb-46fe-b01e-b937021b00e2.PNG)

Product form

![FormProduct](https://user-images.githubusercontent.com/9250787/186420155-9a3a6a4e-e075-4793-af3d-10be9bf882dc.PNG)

Sale List

![SaleList](https://user-images.githubusercontent.com/9250787/186425361-fa8abc7a-e14d-49a5-84df-9ea2cdcaa79f.PNG)

Sale form

![SaleForm](https://user-images.githubusercontent.com/9250787/186425396-8d3b892e-9500-47fd-916b-eb142fd5e3d1.PNG)

## Tecnologias utilizadas

### Back-end
* [Java 11](https://www.java.com/pt-BR/)
* [Spring Boot 2.7.2](https://spring.io/projects/spring-boot/)
* [Flyway](https://flywaydb.org/)
* [Postgresql](https://www.postgresql.org/)
* [Lombok](https://projectlombok.org/)

### Front-end
* [Angular 11](https://angular.io/)
* [Angular Material 11](https://material.angular.io/)
* [Flex-Layout 11](https://tburleson-layouts-demos.firebaseapp.com/#/docs/)

### Utilitários

* Eclipse IDE
* Postman
* Visual Studio Code

## Status do projeto
* Em desenvolvimento

## Como executar o projeto

Este projeto é divido em duas partes:

Backend (pasta Projeto Java Back-end)
Frontend (pasta Projeto Angular Front-end)

O Frontend precisa que o Backend esteja sendo executado para funcionar.

### Pré-Requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en/download/), [JDK 1.8.0](https://www.oracle.com/java/technologies/downloads/). Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/download).

### Back-end
```bash
# Baixe e instale o banco de dados PostgreSQL em https://www.postgresql.org/download/
# Cria o banco de dados com o nome sale-api
# Clone este repositório
$ git clone https://github.com/Afrain/ProjetoVenda.git

# Acesse a pasta do projeto no terminal/cmd
$ cd ProjetoVenda

# Vá para a pasta server
$ cd Projeto Java Back-end\target

# execute o comando
$ java -jar ProjetoJavaVendaApi.jar

# O servidor inciará na porta:8080 - acesse http://localhost:8080
```

### Front-end
```bash
# Clone este repositório
$ git clone https://github.com/Afrain/ProjetoVenda.git

# Acesse a pasta do projeto no VSCODE
$ cd ProjetoVenda

# Vá para a pasta server
$ cd Projeto Angular Front-end

# execute o comando para baixar as dependências
$ npm install

# execute o comando
$ ng serve

# O servidor inciará na porta:4200 - acesse http://localhost:4200
```

## Autor

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
