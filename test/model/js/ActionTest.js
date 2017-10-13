"use strict";

define(["qunit", "model/js/Action"],
   function(QUnit, Action)
   {
      QUnit.module("Action");

      QUnit.test("incrementRound()", function(assert)
      {
         // Run.
         var result = Action.incrementRound();

         // Verify.
         assert.ok(result);
         assert.equal(result.type, Action.INCREMENT_ROUND);
      });
   });
