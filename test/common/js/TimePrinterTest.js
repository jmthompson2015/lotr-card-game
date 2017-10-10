"use strict";

define(["qunit", "common/js/TimePrinter"],
   function(QUnit, TimePrinter)
   {
      QUnit.module("TimePrinter");

      QUnit.test("formatElapsedTime()", function(assert)
      {
         // Setup.

         // Run / Verify.
         assert.equal(TimePrinter.formatElapsedTime("title", 150, 3150), "title elapsed time 0:03 (3000 ms)");
      });
   });
