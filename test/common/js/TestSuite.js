import Logger from "../../../src/common/js/Logger.js";

import ArrayUtilitiesTest from "../js/ArrayUtilitiesTest.js";
import InputValidatorTest from "../js/InputValidatorTest.js";
import MathUtilitiesTest from "../js/MathUtilitiesTest.js";
import ObjectUtilitiesTest from "../js/ObjectUtilitiesTest.js";
import TimePrinterTest from "../js/TimePrinterTest.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);
LOGGER.setInfoEnabled(false);

QUnit.start();