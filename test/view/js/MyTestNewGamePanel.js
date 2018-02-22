import Logger from "../../../src/common/js/Logger.js";
import NewGamePanel from "../../../src/view/js/NewGamePanel.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var newGamePanel = React.createElement(NewGamePanel,
{
   callback: callback,
});

ReactDOM.render(ReactDOMFactories.div(
{}, newGamePanel), document.getElementById("panel"));

function callback(scenarioDeck, playerData)
{
   LOGGER.info("callback() scenarioDeck = " + JSON.stringify(scenarioDeck));
   LOGGER.info("callback() playerData = " + JSON.stringify(playerData));
}