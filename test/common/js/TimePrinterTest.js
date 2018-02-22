import TimePrinter from "../../../src/common/js/TimePrinter.js";

QUnit.module("TimePrinter");

var TimePrinterTest = {};

QUnit.test("formatElapsedTime()", function(assert)
{
   // Setup.

   // Run / Verify.
   assert.equal(TimePrinter.formatElapsedTime("title", 150, 3150), "title elapsed time 0:03 (3000 ms)");
});

export default TimePrinterTest;