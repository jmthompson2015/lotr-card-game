import Comparator from "../../../src/accessory/rule-generator/Comparator.js";
import Interpreter from "../../../src/accessory/rule-generator/Interpreter.js";
import Parser from "../../../src/accessory/rule-generator/Parser.js";

QUnit.module("Comparator");

var ComparatorTest = {};

const cardAragorn = {
   "pack_code": "Core",
   "pack_name": "Core Set",
   "type_code": "hero",
   "name": "Aragorn",
   "text": "Sentinel.\n<b>Response:</b> After Aragorn commits to a quest, spend 1 resource from his resource pool to ready him.",
};

const partsAragorn = Parser.parse(cardAragorn);
const interpretationAragorn = Interpreter.interpret(cardAragorn, partsAragorn);

const cardGloin = {
   "pack_code": "Core",
   "pack_name": "Core Set",
   "type_code": "hero",
   "name": "Glóin",
   "text": "<b>Response:</b> After Glóin suffers damage, add 1 resource to his resource pool for each point of damage he just suffered.",
};

const partsGloin = Parser.parse(cardGloin);
const interpretationGloin = Interpreter.interpret(cardGloin, partsGloin);

QUnit.test("Interpretation()", function(assert)
{
   // Setup.

   // Run.

   // Verify.
   assert.equal(Comparator.Interpretation(interpretationAragorn, interpretationGloin), -1);
   assert.equal(Comparator.Interpretation(interpretationGloin, interpretationAragorn), 1);
});

export default ComparatorTest;