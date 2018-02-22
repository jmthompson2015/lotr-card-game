import Logger from "../../../src/common/js/Logger.js";
import EnemyCard from "../../../src/artifact/js/EnemyCard.js";
import Action from "../../../src/model/js/Action.js";
import CardInstance from "../../../src/model/js/CardInstance.js";
import Reducer from "../../../src/model/js/Reducer.js";
import OptionalEngagementEnemyChooser from "../../../src/view/js/OptionalEngagementEnemyChooser.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var store = Redux.createStore(Reducer.root);
store.dispatch(Action.setResourceBase(resourceBase));
var enemies = [];
enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.BLACK_FOREST_BATS_PTM]));
enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.DOL_GULDUR_ORCS]));
enemies.push(new CardInstance(store, EnemyCard.properties[EnemyCard.FOREST_SPIDER]));

var element = React.createElement(OptionalEngagementEnemyChooser,
{
   cardInstances: enemies,
   onChange: myOnChange,
});

ReactDOM.render(element, document.getElementById("panel"));

function myOnChange(selected, isAccepted)
{
   LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
}