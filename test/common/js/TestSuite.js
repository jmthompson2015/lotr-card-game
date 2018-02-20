    "use strict";

    var prefix = "../test/common/js/";
    var suffix = "Test";
    var testModules = ["ArrayAugments", "InputValidator", "MathAugments", "TimePrinter"];
    testModules = testModules.map(function(testModule)
    {
       return prefix + testModule + suffix;
    });
    testModules.unshift("common/js/Logger");

    require(testModules, function(Logger)
    {
       window.LOGGER = new Logger();
       LOGGER.setTraceEnabled(false);
       LOGGER.setDebugEnabled(false);
       LOGGER.setInfoEnabled(false);

       QUnit.start();
    });