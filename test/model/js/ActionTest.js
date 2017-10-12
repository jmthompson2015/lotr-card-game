"use strict";

define(["qunit", "model/js/Action"],
   function(QUnit, Action)
   {
      QUnit.module("Action");

      QUnit.test("addRound()", function(assert)
      {
         // Run.
         var result = Action.addRound();

         // Verify.
         assert.ok(result);
         assert.equal(result.type, Action.ADD_ROUND);
      });
   });
