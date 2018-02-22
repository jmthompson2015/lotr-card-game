import Logger from "../../common/js/Logger.js";
import Game from "../../model/js/Game.js";
import EnvironmentUI from "../../view/js/EnvironmentUI.js";
import NewGamePanel from "../../view/js/NewGamePanel.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "view/resource/";

var newGamePanel = React.createElement(NewGamePanel,
{
   callback: startNewGame,
   resourceBase: resourceBase,
});

ReactDOM.render(newGamePanel, document.getElementById("inputArea"));
var game;

function startNewGame(scenarioDeck, playerData, delayIn, engineCallback)
{
   LOGGER.info("startNewGame() start");

   for (var i = 0; i < 4; i++)
   {
      LOGGER.info("agent" + (i + 1) + " = " + (playerData[i] ? playerData[i].agent : playerData[i]));
   }

   var element = document.getElementById("inputArea");
   element.innerHTML = "";

   var store = playerData[0].agent.store();
   game = new Game(store, scenarioDeck, playerData, delayIn, engineCallback);
   createEnvironmentUI(game.engine(), game.engine().environment(), resourceBase, store);

   game.start();

   LOGGER.info("startNewGame() end");
}

function createEnvironmentUI(engine, environment, resourceBase, store)
{
   var element = React.createElement(ReactRedux.Provider,
   {
      store: store,
   }, React.createElement(EnvironmentUI,
   {
      environment: environment,
   }));

   ReactDOM.render(ReactDOMFactories.div(
   {}, element), document.getElementById("panel"));
}