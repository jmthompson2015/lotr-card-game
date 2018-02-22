import Logger from "../../../src/common/js/Logger.js";
import AllyCard from "../../../src/artifact/js/AllyCard.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import QuestCard from "../../../src/artifact/js/QuestCard.js";
import Action from "../../../src/model/js/Action.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import MultipleCardChooser from "../../../src/view/js/MultipleCardChooser.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);
store.dispatch(Action.setResourceBase(resourceBase));
var quest = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);
var characters = [];
characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BEORN]));
characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]));
characters.push(new CardInstance(store, AllyCard.properties[AllyCard.DENETHOR]));
characters.push(new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]));
characters.push(new CardInstance(store, HeroCard.properties[HeroCard.GLOIN]));
characters.push(new CardInstance(store, HeroCard.properties[HeroCard.THEODRED]));

var element = React.createElement(MultipleCardChooser,
{
   cardInstances: characters,
   onChange: myOnChange,
   title: "Select Questers",
});

ReactDOM.render(element, document.getElementById("panel"));

function myOnChange(selected, isAccepted)
{
   LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
}