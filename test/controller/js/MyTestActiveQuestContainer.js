import Logger from "../../../src/common/js/Logger.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import ActiveQuestContainer from "../../../src/controller/js/ActiveQuestContainer.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var game = createGame();
var store = game.store();
store.dispatch(Action.setResourceBase(resourceBase));
store.dispatch(Action.drawQuestCard());

var element = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(ActiveQuestContainer,
{}));

ReactDOM.render(element, document.getElementById("panel"));

function createGame(callback)
{
   var store = Redux.createStore(Reducer.root);
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   var playerData = [
      {
         agent: new Agent(store, "agent1"),
         playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    },
      {
         agent: new Agent(store, "agent2"),
         playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
    },
      {
         agent: new Agent(store, "agent3"),
         playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
    }, ];

   return new Game(store, scenarioDeck, playerData, 10, callback);
}