import Logger from "../../../src/common/js/Logger.js";
import AllyCard from "../../../src/artifact/js/AllyCard.js";
import AttachmentCard from "../../../src/artifact/js/AttachmentCard.js";
import EventCard from "../../../src/artifact/js/EventCard.js";
import Action from "../../../src/model/js/Action.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import PlayCardChooser from "../../../src/view/js/PlayCardChooser.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);
store.dispatch(Action.setResourceBase(resourceBase));
var cardInstances = [];
cardInstances.push(new CardInstance(store, AllyCard.properties[AllyCard.BEORN]));
cardInstances.push(new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]));
cardInstances.push(new CardInstance(store, AllyCard.properties[AllyCard.DENETHOR]));
cardInstances.push(new CardInstance(store, AttachmentCard.properties[AttachmentCard.A_BURNING_BRAND]));
cardInstances.push(new CardInstance(store, AttachmentCard.properties[AttachmentCard.BLACK_ARROW]));
cardInstances.push(new CardInstance(store, AttachmentCard.properties[AttachmentCard.CELEBRIANS_STONE]));
cardInstances.push(new CardInstance(store, EventCard.properties[EventCard.ADVANCE_WARNING]));
cardInstances.push(new CardInstance(store, EventCard.properties[EventCard.BEHIND_STRONG_WALLS]));
cardInstances.push(new CardInstance(store, EventCard.properties[EventCard.CAMPFIRE_TALES]));
cardInstances.lotrShuffle();

var element = React.createElement(PlayCardChooser,
{
   cardInstances: cardInstances,
   onChange: myOnChange,
});

ReactDOM.render(element, document.getElementById("panel"));

function myOnChange(selected, isAccepted)
{
   LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
}