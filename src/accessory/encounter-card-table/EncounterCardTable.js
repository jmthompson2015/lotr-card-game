import Logger from "../../common/js/Logger.js";
import MathAugments from "../../common/js/MathAugments.js";
import CardTableContainer from "./CardTableContainer.js";
import Reducer from "./Reducer.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);
var implementedCount = determineImplementedCount();
var cardCount = determineCardCount();
var ratio = Math.lotrRound(100.0 * implementedCount / cardCount, 0);
document.getElementById("implementedStatistics").innerHTML = "Implemented " + implementedCount + " / " + cardCount + " = " + ratio + "%";

var element = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(CardTableContainer,
{
   resourceBase: resourceBase,
}));

ReactDOM.render(element, document.getElementById("tableContainer"));

function determineCardCount()
{
   return store.getState().tableRows.length;
}

function determineImplementedCount()
{
   return store.getState().tableRows.reduce(function(accumulator, tableRow)
   {
      var card = tableRow.card;
      return accumulator + (card !== undefined && card.isImplemented === true ? 1 : 0);
   }, 0);
}