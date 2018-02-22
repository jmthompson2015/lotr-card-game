import Logger from "../../../src/common/js/Logger.js";
import AllyCard from "../../../src/artifact/js/AllyCard.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import Action from "../../../src/model/js/Action.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import CharacterAttackersChooser from "../../../src/view/js/CharacterAttackersChooser.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);
store.dispatch(Action.setResourceBase(resourceBase));
var defender = new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]);
var characters = [];
characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BEORN]));
characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]));
characters.push(new CardInstance(store, AllyCard.properties[AllyCard.DENETHOR]));
characters.push(new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]));
characters.push(new CardInstance(store, HeroCard.properties[HeroCard.GLOIN]));
characters.push(new CardInstance(store, HeroCard.properties[HeroCard.THEODRED]));

var element = React.createElement(CharacterAttackersChooser,
{
   defenderInstance: defender,
   cardInstances: characters,
   onChange: myOnChange,
});

ReactDOM.render(element, document.getElementById("panel"));

function myOnChange(selected, isAccepted)
{
   LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
}