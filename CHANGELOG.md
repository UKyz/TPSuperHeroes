# Changelog
All notable changes to this project will be documented in this file.

## [1.1.0] - 2018-12-31
### Added
- Map-front, a front web interface
- a dockerigonre for each sls

Map-front :
- a map that shows all the cities in the db and also the heroes' moves
- a header that can be usefull to add a hero or add villains in any cities
- a heroes' legend that shows heroes' moves and positions
- a villains' and mounts' legend that shows, by cities, how many villains and mounts are in the db

Mount :
- a last update model to record the last time it managed mounts
- function that gets and returns every mounts from the db
- function that creates and save a new mount in the db
- function that takes a city's name in argument and gets all the mounts located in the city
- function that takes a mount's id in argument and deletes the mount
- function that computes since how many times factor it did not managed mounts and creates a substancial number of new mount

### Changed
Confederation :
- update some functions to handle the mount before the optimise's function
- a function that indicates to the optimise's function to not send heroes to the same city

Sls-hero :
- update hero's class and model to indicate if the hero is moving with a mount
- update hookHero to manage moves with a mount

Sls-path-optimiser :
- update the function to manage heroes' moves with mount

## [1.0.1] - 2018-12-28
### Added
- docker-compose.test which manage servers, just as docker-compose do without confederation's server

Sls-hero :
- function that gets, modifies the format and returns every heros for the front-end

Sls-mount :
- function that takes a mount's id in argument and removes the mount from the db

### Changed
- Cleaning most of the files and promisify some awaits 

Sls-villain :
- function that adds a new villain in db, can now takes a city's name as argument in addition of villain's name

Test :
- tests are now OK and test almost all the handlers from the sls

Confederation :
- update some functions to handle more than one hero at the same time

## [1.0.0] - 2018-12-21
### Added
- docker-compose which manages five serverless (sls), one mongoDB and one server
- sls-path-optimiser with the optimizer source
- sls-villain with a villain's class, two models and five different sources
- sls-hero with a hero's class, three models and six different sources
- sls-mount with a mount's class, model and two different sources
- sls-city with a city's class, model and four different sources
- confederation with a server file

Sls-path-optimiser : 
- function that computes and returns the best path for a hero to take, in order to kill more villains as possible in a time's constraint

Sls-villain :
- villain's class
- villain's model for the mongoDB
- villain's last update model, to record the last time it managed villains
- function that gets and returns every villains from the db
- function that takes a name in argument, then creates and save a new villain in the db
- function that takes a list of villains, then counts and returns the number of villains by city
- function that takes a city's name in argument and deletes all the villains located in the city
- function that computes how long (in time factor) it did not managed villains and creates a substancial number of new villain

Sls-hero :
- hero's class
- hero's model for the mongoDB
- hero's last update model to record the last time it managed a hero
- todo list's model to save all the moves that a hero will make in the future
- function that gets, modifies the format and returns every heros that are not in motion
- function that takes a name in argument then creates and save a new hero in the db
- function that sees if there is already a hero saved and if not, creates a new one
- function that takes a hero's id in argument and gets the list of every tickets that the hero has to do next, and returns it
- function that takes a ticket in argument and saves it into the db
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
- function that waits 20 seconds before trying to install a hero and cities
- function that, every 30 seconds, gets all villains and available heroes and then call the optimise function


[1.0.0]: https://github.com/UKyz/TPSuperHeroes/tree/v1.0.0
[1.0.1]: https://github.com/UKyz/TPSuperHeroes/tree/v1.0.1
[1.0.1]: https://github.com/UKyz/TPSuperHeroes/tree/v1.1.0
