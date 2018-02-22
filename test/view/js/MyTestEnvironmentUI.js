import Logger from "../../../src/common/js/Logger.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import EnvironmentUI from "../../../src/view/js/EnvironmentUI.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var game = createGame();
var store = game.store();
store.dispatch(Action.setResourceBase(resourceBase));
var environment = store.getState().environment;

var element = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(EnvironmentUI,
{
   environment: environment,
}));

ReactDOM.render(ReactDOMFactories.div(
{
   className: "center dt tc",
}, element), document.getElementById("panel"));

function createGame(callback)
{
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   var playerData = [
   {
      agent: new Agent(store, "Adam"),
      playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    },
   {
      agent: new Agent(store, "Bruce"),
      playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
    },
   {
      agent: new Agent(store, "Charlie"),
      playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
    },
   {
      agent: new Agent(store, "David"),
      playerDeck: PlayerDeckBuilder.CoreTacticsDeckBuilder.buildDeck(store),
    }, ];

   return new Game(store, scenarioDeck, playerData, 10, callback);
}