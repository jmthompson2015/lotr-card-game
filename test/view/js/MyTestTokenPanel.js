import Logger from "../../../src/common/js/Logger.js";
import TokenPanel from "../../../src/view/js/TokenPanel.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var element = React.createElement(TokenPanel,
{
   bonusAttack: 3,
   bonusDefense: 4,
   bonusHitPoints: 5,
   bonusThreat: -2,
   bonusWillpower: 1,
   resourceBase: resourceBase,
   progressCount: 3,
   resourceCount: 2,
   woundCount: 4,
});

ReactDOM.render(element, document.getElementById("panel"));