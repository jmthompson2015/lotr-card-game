import Logger from "../../common/js/Logger.js";
import GameDataTable from "./GameDataTable.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var element = React.createElement(GameDataTable);
ReactDOM.render(element, document.getElementById("panel"));