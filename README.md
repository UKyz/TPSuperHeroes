# TPSuperHeroes 

[![version][version-badge]][CHANGELOG] [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
## Contents
- [Setting up](#setting-up)
  - [Prerequisites](#prerequisites)
  - [Install and run](#install-and-run)
- [Stop and remove containers](#stop-and-remove-containers)
- [Data visualization](#data-visualization)
- [Contribute](#contribute)
  - [Execute the tests](#execute-the-tests)

## Setting up

### Prerequisites
To be able to launch our project it is necessary to have the following elements:
- [Docker](https://docs.docker.com/v17.12/install/)

### Install and run

```bash
git clone https://github.com/UKyz/TPSuperHeroes.git
cd TPSuperHeroes
git submodule update --init map-front
docker-compose up
```

## Stop and remove containers

```bash
docker-compose down
```

## Data visualization
A web interface was created to visualize the heroes on a map and the statues of cities and heroes on a legend. It is visible via the following address:

http://localhost:4200/

## Contribute 
### Execute the tests
  This project is based on the BDD method. Every files has a test file to test 
  what's required to be executed. The test can also show a bogue when the 
  file is modified. [(See what BDD is)][BDDWiki]
  
  To test :
  
   * In a first session :
 ```
 docker-compose -f docker-compose.test.yml up --build
 ```
   * In a second session :
   
 ```
  mocha
```

### Check the code style
  This project uses the framework xojs. xojs is a ESLint wrapper that enforce strict and readable code. Everything works fine with xo [(See what xo is)][xo], if you want to check xo you just need to execute : 
  
```bash
xo
```

## Credits
  * [Couton Alexia][Alexia] 
  * [Contassot Alexandre][Alexandre]
  * [Fauquembergue Victor][Me]
  
  
  
[CHANGELOG]: ./CHANGELOG.md
[Alexia]: https://github.com/Alexia14
[Me]: https://github.com/UKyz
[Alexandre]: https://github.com/A1C0
[xo]: https://github.com/xojs/xo
[Credits]: https://github.com/UKyz/TPSuperHeroes/blob/master/README.md#credits
[Installation]: https://github.com/UKyz/TPSuperHeroes/blob/master/README.md#install
[Stop]: https://github.com/UKyz/TPSuperHeroes/blob/master/README.md#stop-and-remove-containers
[Contribute]: https://github.com/UKyz/TPSuperHeroes/blob/master/README.md#contribute
[CheckXo]: https://github.com/UKyz/TPSuperHeroes/blob/master/README.md#check-the-code-style
[CheckTests]: https://github.com/UKyz/TPSuperHeroes/blob/master/README.md#execute-the-tests
[BDDWiki]: https://en.wikipedia.org/wiki/Behavior-driven_development
[version-badge]: https://img.shields.io/badge/version-1.0.1-blue.svg
