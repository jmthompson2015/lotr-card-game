"use strict";

define(["qunit", "common/js/MathAugments"],
   /*jshint -W098 */
   function(QUnit, MathAugments)
   {
      QUnit.module("MathAugments");

      QUnit.test("vizziniRound()", function(assert)
      {
         assert.equal(Math.lotrRound(12.3456, -1), 10);
         assert.equal(Math.lotrRound(12.3456, 0), 12);
         assert.equal(Math.lotrRound(12.3456, 1), 12.3);
         assert.equal(Math.lotrRound(12.3456, 2), 12.35);
         assert.equal(Math.lotrRound(12.3456, 3), 12.346);
         assert.equal(Math.lotrRound(12.3456, 4), 12.3456);
      });
   });
