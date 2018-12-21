# TPSuperHeroes 

[![version][version-badge]][CHANGELOG] [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)

## Contents
  * [Install][Installation]
  * [Contribute][Contribute]
  * [Stop][Stop]
    * [Execute the tests][CheckTests]
    * [Check the code style][CheckXo]
  * [Credits][Credits]

## Install

```bash
git clone https://github.com/UKyz/TPSuperHeroes.git
cd TPSuperHeroes
git submodule update --init ember-map
docker-compose up
```

## Stop and remove containers

```bash
docker-compose down
```

## Contribute 
### Execute the tests
  This project is based on the BDD method. Every classes has a test file to test what's required to be executed. The test can also show a bogue when the class is modified. [(See what BDD is)][BDDWiki]
  
  To test every classes : 
  
```bash
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
[version-badge]: https://img.shields.io/badge/version-1.0.0-blue.svg
