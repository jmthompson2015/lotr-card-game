import Logger from "../../../src/common/js/Logger.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import AgentArea from "../../../src/view/js/AgentArea.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var game = createGame();
var store = game.store();
store.dispatch(Action.setResourceBase(resourceBase));
var environment = store.getState().environment;
var agent = environment.agents().toJS().lotrRandomElement();
var cardInstance = environment.stagingArea().get(0);
store.dispatch(Action.agentEngageCard(agent, cardInstance));

var element = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(AgentArea,
{
   agent: agent,
   resourceBase: resourceBase,
}));

ReactDOM.render(ReactDOMFactories.div(
{
   className: "br-red center dt tc",
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