import Logger from "../../../src/common/js/Logger.js";
import AllyCard from "../../../src/artifact/js/AllyCard.js";
import AttachmentCard from "../../../src/artifact/js/AttachmentCard.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import EventCard from "../../../src/artifact/js/EventCard.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import ObjectiveCard from "../../../src/artifact/js/ObjectiveCard.js";
import TreacheryCard from "../../../src/artifact/js/TreacheryCard.js";
import Action from "../../../src/model/js/Action.js";
import CardAction from "../../../src/model/js/CardAction.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import CardInstancesArea from "../../../src/view/js/CardInstancesArea.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);
store.dispatch(Action.setResourceBase(resourceBase));

var heroInstance = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
heroInstance.isQuesting = true;
store.dispatch(CardAction.addResources(heroInstance));
store.dispatch(CardAction.addWounds(heroInstance, 2));
var allyInstance = new CardInstance(store, AllyCard.properties[AllyCard.GANDALF_CORE]);
store.dispatch(CardAction.setReady(allyInstance, false));
store.dispatch(CardAction.addWounds(allyInstance, 2));
var attachmentInstance = new CardInstance(store, AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR]);
store.dispatch(CardAction.addResources(attachmentInstance));
var eventInstance = new CardInstance(store, EventCard.properties[EventCard.SNEAK_ATTACK]);
var cardInstances0 = [heroInstance, allyInstance, attachmentInstance, eventInstance];

var element0 = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(CardInstancesArea,
{
   cardInstances: cardInstances0,
   label: "Agent 1 Tableau",
   resourceBase: resourceBase,
}));

ReactDOM.render(ReactDOMFactories.div(
{
   className: "center dt tc",
}, element0), document.getElementById("panel0"));

var enemyInstance = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
store.dispatch(CardAction.addWounds(enemyInstance));
var locationInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
store.dispatch(CardAction.addProgress(locationInstance, 2));
var objectiveInstance = new CardInstance(store, ObjectiveCard.properties[ObjectiveCard.SIGNS_OF_GOLLUM]);
var treacheryInstance = new CardInstance(store, TreacheryCard.properties[TreacheryCard.CAUGHT_IN_A_WEB]);
var cardInstances1 = [enemyInstance, locationInstance, objectiveInstance, treacheryInstance];

var element1 = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(CardInstancesArea,
{
   cardInstances: cardInstances1,
   label: "Staging Area",
   resourceBase: resourceBase,
}));

ReactDOM.render(ReactDOMFactories.div(
{
   className: "center dt tc",
}, element1), document.getElementById("panel1"));

var heroInstance2 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
heroInstance.isQuesting = true;
store.dispatch(CardAction.addResources(heroInstance2));
store.dispatch(CardAction.addWounds(heroInstance2, 2));
var allyInstance2 = new CardInstance(store, AllyCard.properties[AllyCard.GANDALF_CORE]);
store.dispatch(CardAction.setReady(allyInstance2, false));
store.dispatch(CardAction.addWounds(allyInstance2, 2));
var attachmentInstance2 = new CardInstance(store, AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR]);
store.dispatch(CardAction.addResources(attachmentInstance2));
var eventInstance2 = new CardInstance(store, EventCard.properties[EventCard.SNEAK_ATTACK]);
var cardInstances2 = [heroInstance2, allyInstance2, attachmentInstance2, eventInstance2];

var element2 = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(CardInstancesArea,
{
   cardInstances: cardInstances2,
   isExpanded: false,
   label: "Collapsed Area",
   resourceBase: resourceBase,
}));

ReactDOM.render(ReactDOMFactories.div(
{
   className: "center dt tc",
}, element2), document.getElementById("panel2"));

var enemyInstance3 = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
store.dispatch(CardAction.addWounds(enemyInstance3));
var locationInstance3 = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
store.dispatch(CardAction.addProgress(locationInstance3, 2));
var objectiveInstance3 = new CardInstance(store, ObjectiveCard.properties[ObjectiveCard.SIGNS_OF_GOLLUM]);
var treacheryInstance3 = new CardInstance(store, TreacheryCard.properties[TreacheryCard.CAUGHT_IN_A_WEB]);
var cardInstances3 = [enemyInstance3, locationInstance3, objectiveInstance3, treacheryInstance3];

var element3 = React.createElement(ReactRedux.Provider,
{
   store: store,
}, React.createElement(CardInstancesArea,
{
   cardInstances: cardInstances3,
   isExpanded: false,
   label: "Collapsed Area",
   resourceBase: resourceBase,
}));

ReactDOM.render(ReactDOMFactories.div(
{
   className: "center dt tc",
}, element3), document.getElementById("panel3"));