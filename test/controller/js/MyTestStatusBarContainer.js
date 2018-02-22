import Logger from "../../../src/common/js/Logger.js";
import Phase from "../../../src/artifact/js/Phase.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import StatusBarContainer from "../../../src/controller/js/StatusBarContainer.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var game = createGame();
var environment = game.engine().environment();
var store = environment.store();
store.dispatch(Action.setResourceBase(resourceBase));
var agent1 = environment.agents().first();
store.dispatch(Action.incrementRound());
store.dispatch(Action.incrementRound());
store.dispatch(Action.incrementRound());
store.dispatch(Action.incrementRound());
store.dispatch(Action.enqueuePhase(Phase.COMBAT_ATTACK_DETERMINE_DAMAGE));
// store.dispatch(Action.dequeuePhase());
store.dispatch(Action.setActiveAgent(agent1));
store.dispatch(Action.setUserMessage("Somebody attacked someone."));

var element = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(StatusBarContainer));
ReactDOM.render(element, document.getElementById("inputArea"));

function createGame(callback)
{
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   var playerData = [
   {
      agent: new Agent(store, "agent1"),
      playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    }, ];

   return new Game(store, scenarioDeck, playerData, 10, callback);
}