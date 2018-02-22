import Logger from "../../../src/common/js/Logger.js";
import AttachmentCard from "../../../src/artifact/js/AttachmentCard.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import LocationCard from "../../../src/artifact/js/LocationCard.js";
import QuestCard from "../../../src/artifact/js/QuestCard.js";
import Action from "../../../src/model/js/Action.js";
import CardAction from "../../../src/model/js/CardAction.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";
import CardInstanceUI from "../../../src/view/js/CardInstanceUI.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);
store.dispatch(Action.setResourceBase(resourceBase));
var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));

var heroInstance1 = new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]);
store.dispatch(CardAction.attach(heroInstance1, new CardInstance(store, AttachmentCard.properties[AttachmentCard.CELEBRIANS_STONE])));
store.dispatch(CardAction.addPhaseBonusAttack(heroInstance1));
store.dispatch(CardAction.addPhaseBonusHitPoints(heroInstance1, 4));
store.dispatch(CardAction.addResources(heroInstance1));
store.dispatch(CardAction.addWounds(heroInstance1, 2));

var heroInstance2 = new CardInstance(store, HeroCard.properties[HeroCard.GLOIN]);
store.dispatch(CardAction.attach(heroInstance2, new CardInstance(store, AttachmentCard.properties[AttachmentCard.STEWARD_OF_GONDOR])));
store.dispatch(CardAction.addPhaseBonusDefense(heroInstance2));
store.dispatch(CardAction.addRoundBonusDefense(heroInstance2));
store.dispatch(CardAction.addResources(heroInstance2));
store.dispatch(CardAction.addWounds(heroInstance2, 1));

var heroInstance3 = new CardInstance(store, HeroCard.properties[HeroCard.THEODRED]);
store.dispatch(CardAction.attach(heroInstance3, new CardInstance(store, AttachmentCard.properties[AttachmentCard.CITADEL_PLATE])));
store.dispatch(CardAction.addPhaseBonusWillpower(heroInstance3, 2));
store.dispatch(CardAction.addRoundBonusWillpower(heroInstance3, 1));
store.dispatch(CardAction.setReady(heroInstance3, false));

var heroInstance4 = new CardInstance(store, HeroCard.properties[HeroCard.BERAVOR]);
var attachmentInstance4 = new CardInstance(store, AttachmentCard.properties[AttachmentCard.UNEXPECTED_COURAGE]);
store.dispatch(CardAction.setReady(attachmentInstance4, false));
store.dispatch(CardAction.attach(heroInstance4, attachmentInstance4));
store.dispatch(CardAction.setReady(heroInstance4, false));
store.dispatch(CardAction.addResources(heroInstance4, 2));
store.dispatch(CardAction.addWounds(heroInstance4, 3));

var locationInstance = new CardInstance(store, LocationCard.properties[LocationCard.OLD_FOREST_ROAD]);
store.dispatch(CardAction.addPhaseBonusThreat(locationInstance));
store.dispatch(CardAction.addRoundBonusThreat(locationInstance));
store.dispatch(CardAction.addProgress(locationInstance, 2));

var questInstance = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);
store.dispatch(CardAction.addProgress(questInstance, 4));

var enemyInstance = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
store.dispatch(CardAction.addWounds(enemyInstance));
store.dispatch(Action.dealShadowCard(enemyInstance));

var cells = [];

addCardInstanceUI(cells, heroInstance1);
addCardInstanceUI(cells, heroInstance2);
addCardInstanceUI(cells, heroInstance3);
addCardInstanceUI(cells, heroInstance4);
addCardInstanceUI(cells, enemyInstance);
addCardInstanceUI(cells, locationInstance);
addCardInstanceUI(cells, questInstance);

ReactDOM.render(ReactDOMFactories.div(
{}, cells), document.getElementById("panel"));

function addCardInstanceUI(cells, cardInstance)
{
   var element = React.createElement(ReactRedux.Provider,
   {
      store: store,
   }, React.createElement(CardInstanceUI,
   {
      cardInstance: cardInstance,
   }));

   cells.push(ReactDOMFactories.div(
   {
      key: "card" + cells.length,
      className: "fl v-top",
   }, element));
}