import Logger from "../../../src/common/js/Logger.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import HumanAgentStrategy from "../../../src/controller/js/HumanAgentStrategy.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var game = createGame();
var environment = game.engine().environment();
var store = environment.store();
store.dispatch(Action.setResourceBase(resourceBase));
var agent1 = environment.agents()[0];
var enemyInstance = environment.stagingArea()[0];
store.dispatch(Action.agentEngageCard(agent1, enemyInstance));
var characters = agent1.defenders().toJS();

// Run.
agent1.chooseCharacterDefender(enemyInstance, characters, defenderCallback);

function defenderCallback(defender)
{
   LOGGER.info("defenderCallback() defender = " + defender);
}

function createGame(callback)
{
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   var playerData = [
   {
      agent: new Agent(store, "agent1", undefined, HumanAgentStrategy),
      playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    }, ];

   return new Game(store, scenarioDeck, playerData, 10, callback);
}