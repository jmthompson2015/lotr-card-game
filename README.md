# LOTR Card Game
Play the game: [LOTR Card Game](https://rawgit.com/jmthompson2015/lotr-card-game/master/src/index.html)

## Built With
* [QUnit](https://qunitjs.com/) - JavaScript unit testing.
* [Require.js](http://requirejs.org/) - A JavaScript file and module loader.

## Architecture
![Web Application Diagram](doc/WebApplicationDiagram.png)

#### Common
Contains generic utilities and JavaScript extensions. (e.g. Logger, InputValidator, etc.)

#### Artifact
Contains game data implemented as constant enumerations. (e.g. HeroCard, AllyCard, EventCard, etc.)

#### Model
Provides the data model and processes using Redux.

#### View
Provides the GUI components using React.

#### Controller
Provides integration between the model and the view. Data changes are propagated to the view components, and user actions are transmitted to the model.

#### Accessory
Contains accessory applications.

## License
LOTR Card Game is released under the terms of the [MIT License](https://github.com/jmthompson2015/xwing-miniatures-game/blob/master/LICENSE.txt).

***
The Lord of the Rings: The Card Game and all related properties, images and text are owned by Fantasy Flight Games, and/or The Saul Zaentz Company d/b/a Middle-earth Enterprises.
