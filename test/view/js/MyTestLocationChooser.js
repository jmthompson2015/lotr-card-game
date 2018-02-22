import Logger from "../../../src/common/js/Logger.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import Action from "../../../src/model/js/Action.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import LocationChooser from "../../../src/view/js/LocationChooser.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);
store.dispatch(Action.setResourceBase(resourceBase));
var locations = [];
locations.push(new CardInstance(store, LocationCard.properties[LocationCard.ENCHANTED_STREAM]));
locations.push(new CardInstance(store, LocationCard.properties[LocationCard.FOREST_GATE]));
locations.push(new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]));

var element = React.createElement(LocationChooser,
{
   cardInstances: locations,
   onChange: myOnChange,
});

ReactDOM.render(element, document.getElementById("panel"));

function myOnChange(selected, isAccepted)
{
   LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
}