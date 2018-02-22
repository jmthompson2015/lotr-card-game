import Logger from "../../../src/common/js/Logger.js";

import ArrayAugmentsTest from "../js/ArrayAugmentsTest.js";
import InputValidatorTest from "../js/InputValidatorTest.js";
import MathAugmentsTest from "../js/MathAugmentsTest.js";
import TimePrinterTest from "../js/TimePrinterTest.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);
LOGGER.setInfoEnabled(false);

QUnit.start();