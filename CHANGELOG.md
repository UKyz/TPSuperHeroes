# Changelog
All notable changes to this project will be documented in this file.

## [1.0.0] - 2018-12-21
### Added
- docker-compose which manages 5 sls, 1 mongoDB and 1 server
- sls-path-optimiser with the optimizer source
- sls-villain with a villain's class, 2 models and 5 different sources
- sls-hero with a hero's class, 3 models and 6 different sources
- sls-mount with a mount's class, model and 2 different sources
- sls-city with a city's class, model and 4 different sources
- confederation with a server file

Sls-path-optimiser : 
- function that computes and returns the best path for a hero to take in order to kill the more villains in a time's constraint

Sls-villain :
- villain's class
- villain's model for the mongoDB
- villain's last update model to record the last time it managed villains
- function that gets and returns every villains from the db
- function that takes a name in argument then creates and save a new villain in the db
- function that takes a list of villains then counts and returns the number of villains by city
- function that takes a city's name in argument and deletes all the villains located in the city
- function that computes since how many times factor it did not managed villains and creates a substancial number of new villain

Sls-hero :
- hero's class
- hero's model for the mongoDB
- hero's last update model to record the last time it managed a hero
- to do list's model to save all the moves that a hero wille make in the future
- function that gets, modifies the format and returns every heros that are not in motion
- function that takes a name in argument then creates and save a new hero in the db
- function that sees if there is already a hero saved and if not, creates a new one
- function that takes a hero's id in argument and gets the list of every tickets that the hero has to do next and returns it
- function that takes a ticket in argument and saves it in the db
- function that manages all the tickets that a hero has to do next and moves the hero if the duration is bigger than the time pasted between the last action

Sls-mount : 
- mount's class
- mount's model for the mongoDB
- function that gets and returns all the mounts that are not in motion
- function that takes a name in argument then creates and saves a new mount in the db

Sls-city :
- city's class
- city's model for the mongoDB
- function that gets and returns all the cities
- function that takes a city's id in argument and returns the city that match
- function that returns a random city name from the db
- function that sees if there is already the cities saved and if not, creates and save all the cities

Confederation :
- function that creates and returns the list of all cities and the number of villains in them
- function that creates and add all the tickets for a hero with the result of the optimise function
- function that waits 20 seconds before try to install a hero and cities
- function that, every 30 seconds, gets all villains and available heroes and then call the optimise function


[1.0.0]: https://github.com/UKyz/TPSuperHeroes/tree/v1.0.0
