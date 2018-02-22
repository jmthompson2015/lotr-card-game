import Logger from "../../../src/common/js/Logger.js";
import AllyCard from "../../../src/artifact/js/AllyCard.js";
import AttachmentCard from "../../../src/artifact/js/AttachmentCard.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import EventCard from "../../../src/artifact/js/EventCard.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import ObjectiveCard from "../../../src/artifact/js/ObjectiveCard.js";
import QuestCard from "../../../src/artifact/js/QuestCard.js";
import TreacheryCard from "../../../src/artifact/js/TreacheryCard.js";
import CardAction from "../../../src/model/js/CardAction.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import CardImage from "../../../src/view/js/CardImage.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);

var locationInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
store.dispatch(CardAction.addProgress(locationInstance, 2));

var questInstance = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);
store.dispatch(CardAction.addProgress(questInstance, 4));

var heroInstance = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
heroInstance.isQuesting = true;
store.dispatch(CardAction.setReady(heroInstance, false));
store.dispatch(CardAction.addResources(heroInstance));
store.dispatch(CardAction.addWounds(heroInstance, 2));

var allyInstance = new CardInstance(store, AllyCard.properties[AllyCard.GANDALF_CORE]);
allyInstance.isQuesting = true;
store.dispatch(CardAction.setReady(allyInstance, false));
store.dispatch(CardAction.addWounds(allyInstance, 2));

var attachmentInstance = new CardInstance(store, AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR]);
store.dispatch(CardAction.setReady(attachmentInstance, false));

// var eventInstance = new CardInstance(store, EventCard.properties[EventCard.SNEAK_ATTACK]);

var enemyInstance = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
store.dispatch(CardAction.addWounds(enemyInstance));

// var treacheryInstance = new CardInstance(store, TreacheryCard.properties[TreacheryCard.CAUGHT_IN_A_WEB]);

var cells = [];
addCardImage(cells, HeroCard.properties[HeroCard.ARAGORN_CORE]);
addCardImage(cells, HeroCard.properties[HeroCard.GLOIN], false);
var element = React.createElement(CardImage,
{
   card: AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR],
   resourceBase: resourceBase,
   slicing: 0.45,
});
cells.push(ReactDOMFactories.div(
{
   key: "card" + cells.length,
   className: "fl v-top",
}, element));
var element = React.createElement(CardImage,
{
   card: AttachmentCard.properties[AttachmentCard.CITADEL_PLATE],
   isReady: false,
   resourceBase: resourceBase,
   slicing: 0.45,
});
cells.push(ReactDOMFactories.div(
{
   key: "card" + cells.length,
   className: "fl v-top",
}, element));

ReactDOM.render(ReactDOMFactories.div(
{}, cells), document.getElementById("attachmentPanel"));

cells = [];
addCardImage(cells, AllyCard.properties[AllyCard.GANDALF_CORE]);
addCardImage(cells, AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR]);
addCardImage(cells, EventCard.properties[EventCard.SNEAK_ATTACK]);
addCardImage(cells, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
addCardImage(cells, HeroCard.properties[HeroCard.ARAGORN_CORE]);
addCardImage(cells, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
addCardImage(cells, ObjectiveCard.properties[ObjectiveCard.SIGNS_OF_GOLLUM]);
addCardImage(cells, TreacheryCard.properties[TreacheryCard.CAUGHT_IN_A_WEB]);
addCardImage(cells, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);

ReactDOM.render(ReactDOMFactories.div(
{}, cells), document.getElementById("readyPanel"));

cells = [];
var isReady = false;
addCardImage(cells, AllyCard.properties[AllyCard.GANDALF_CORE], isReady);
addCardImage(cells, AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR], isReady);
addCardImage(cells, EventCard.properties[EventCard.SNEAK_ATTACK], isReady);
addCardImage(cells, EnemyCard.properties[EnemyCard.FOREST_SPIDER], isReady);
addCardImage(cells, HeroCard.properties[HeroCard.ARAGORN_CORE], isReady);
addCardImage(cells, LocationCard.properties[LocationCard.OLD_FOREST_ROAD], isReady);
addCardImage(cells, ObjectiveCard.properties[ObjectiveCard.SIGNS_OF_GOLLUM], isReady);
addCardImage(cells, TreacheryCard.properties[TreacheryCard.CAUGHT_IN_A_WEB], isReady);

ReactDOM.render(ReactDOMFactories.div(
{
   className: "mt5 pt5",
}, cells), document.getElementById("exhaustedPanel"));

var cells = [];
var isFaceUp = false;
isReady = true;
addCardImage(cells, AllyCard.properties[AllyCard.GANDALF_CORE], isReady, isFaceUp);
addCardImage(cells, EnemyCard.properties[EnemyCard.FOREST_SPIDER], isReady, isFaceUp);

ReactDOM.render(ReactDOMFactories.div(
{}, cells), document.getElementById("faceDownPanel"));

function addCardImage(cells, card, isReady, isFaceUp)
{
   var element = React.createElement(CardImage,
   {
      card: card,
      isFaceUp: isFaceUp,
      isReady: isReady,
      myKey: "" + cells.length,
      resourceBase: resourceBase,
   });

   cells.push(ReactDOMFactories.div(
   {
      key: "card" + cells.length,
      className: "bg-lotr-light fl v-top",
   }, element));
}