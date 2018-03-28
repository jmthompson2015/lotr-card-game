import Logger from "../../../src/common/js/Logger.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import CardAction from "../../../src/model/js/CardAction.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import CardImageContainer from "../../../src/controller/js/CardImageContainer.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);
store.dispatch(Action.setResourceBase(resourceBase));
var game = createGame();
var environment = game.engine().environment();
var cardInstance0 = environment.stagingArea()[0];
var agent0 = environment.agents()[0];
var cardInstance1 = agent0.tableauHeroes()[0];
var cardInstance2 = agent0.tableauHeroes()[1];
store.dispatch(CardAction.setReady(cardInstance2, false));

var cells = [];
cells.push(React.createElement(ReactRedux.Provider,
{
   key: "cell" + cells.length,
   store: store,
}, React.createElement(CardImageContainer,
{
   cardInstance: cardInstance0,
})));

cells.push(React.createElement(ReactRedux.Provider,
{
   key: "cell" + cells.length,
   store: store,
}, React.createElement(CardImageContainer,
{
   cardInstance: cardInstance1,
})));

cells.push(React.createElement(ReactRedux.Provider,
{
   key: "cell" + cells.length,
   store: store,
}, React.createElement(CardImageContainer,
{
   cardInstance: cardInstance2,
})));

ReactDOM.render(ReactDOMFactories.div(
{}, cells), document.getElementById("panel"));

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