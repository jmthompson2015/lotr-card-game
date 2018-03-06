import Logger from "../../../src/common/js/Logger.js";

import ComparatorTest from "./ComparatorTest.js";
import EnumGeneratorTest from "./EnumGeneratorTest.js";
import InterpreterTest from "./InterpreterTest.js";
import LexiconTest from "./LexiconTest.js";
import ParserTest from "./ParserTest.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);
LOGGER.setInfoEnabled(false);

QUnit.start();