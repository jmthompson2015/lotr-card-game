import Logger from "../../../src/common/js/Logger.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import Reducer from "../../../src/model/js/Reducer.js";
import PlayerDeckUI from "../../../src/view/js/PlayerDeckUI.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

let store = Redux.createStore(Reducer.root);
let deck = PlayerDeckBuilder.BeornsPath1DeckBuilder.buildDeck(store);
let resourceBase = "../../../src/view/resource/";

let element = React.createElement(PlayerDeckUI,
{
   deck: deck,
   resourceBase: resourceBase,
});
ReactDOM.render(element, document.getElementById("panel"));