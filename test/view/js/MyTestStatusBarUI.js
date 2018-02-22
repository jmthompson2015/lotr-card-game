import Logger from "../../../src/common/js/Logger.js";
import Phase from "../../../src/artifact/js/Phase.js";
import StatusBarUI from "../../../src/view/js/StatusBarUI.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var element = React.createElement(StatusBarUI,
{
   activeAgentName: "Bob",
   phase: Phase.properties[Phase.COMBAT_ATTACK_DETERMINE_DAMAGE],
   round: 12,
   userMessage: "Somebody attacked someone.",
});
ReactDOM.render(element, document.getElementById("statusBarPanel"));