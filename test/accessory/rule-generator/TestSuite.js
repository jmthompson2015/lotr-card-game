import Logger from "../../../src/common/js/Logger.js";

import InterpreterTest from "./InterpreterTest.js";
import ParserTest from "./ParserTest.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);
LOGGER.setInfoEnabled(false);

QUnit.start();