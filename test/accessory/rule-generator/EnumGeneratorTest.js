import EnumGenerator from "../../../src/accessory/rule-generator/EnumGenerator.js";

QUnit.module("EnumGenerator");

var EnumGeneratorTest = {};

const cardAragorn = {
   "pack_code": "Core",
   "pack_name": "Core Set",
   "type_code": "hero",
   "name": "Aragorn",
   "text": "Sentinel.\n<b>Response:</b> After Aragorn commits to a quest, spend 1 resource from his resource pool to ready him.",
};

const cardGloin = {
   "pack_code": "Core",
   "pack_name": "Core Set",
   "type_code": "hero",
   "name": "Glóin",
   "text": "<b>Response:</b> After Glóin suffers damage, add 1 resource to his resource pool for each point of damage he just suffered.",
};

QUnit.test("createEnumName()", function(assert)
{
   // Setup.

   // Run.

   // Verify.
   assert.equal(EnumGenerator.createEnumName(cardAragorn.name), "ARAGORN");
   assert.equal(EnumGenerator.createEnumName(cardGloin.name), "GLOIN");
});

QUnit.test("createEnumValue()", function(assert)
{
   // Setup.

   // Run.

   // Verify.
   assert.equal(EnumGenerator.createEnumValue(cardAragorn.name), "aragorn");
   assert.equal(EnumGenerator.createEnumValue(cardGloin.name), "gloin");
});

export default EnumGeneratorTest;