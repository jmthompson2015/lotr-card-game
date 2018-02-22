import Logger from "../../../src/common/js/Logger.js";

import EngineTest from "../js/EngineTest.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);
LOGGER.setInfoEnabled(false);

QUnit.start();