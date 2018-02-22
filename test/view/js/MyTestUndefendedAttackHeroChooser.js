import Logger from "../../../src/common/js/Logger.js";
import HeroCard from "../../../src/artifact/js/HeroCard.js";
import Action from "../../../src/model/js/Action.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import UndefendedAttackHeroChooser from "../../../src/view/js/UndefendedAttackHeroChooser.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);
store.dispatch(Action.setResourceBase(resourceBase));
var heroes = [];
heroes.push(new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]));
heroes.push(new CardInstance(store, HeroCard.properties[HeroCard.BALIN]));
heroes.push(new CardInstance(store, HeroCard.properties[HeroCard.CELEBORN]));

var element = React.createElement(UndefendedAttackHeroChooser,
{
   attack: 3,
   cardInstances: heroes,
   onChange: myOnChange,
});

ReactDOM.render(element, document.getElementById("panel"));

function myOnChange(selected, isAccepted)
{
   LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
}