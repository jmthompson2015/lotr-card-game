import Lexicon from "../../../src/accessory/rule-generator/Lexicon.js";
import Parser from "../../../src/accessory/rule-generator/Parser.js";

QUnit.module("Lexicon");

var LexiconTest = {};

QUnit.test("determinePhraseType()", function(assert)
{
   // Setup.

   // Run.

   // Verify.
   assert.equal(Lexicon.determinePhraseType(Parser.parsePhrases("to a quest")[0]), "PP");
   assert.equal(Lexicon.determinePhraseType(Parser.parsePhrases("spend 1 resource")[0]), undefined);
});

QUnit.test("determineWordType()", function(assert)
{
   // Setup.

   // Run.

   // Verify.
   assert.equal(Lexicon.determineWordType("ally"), "noun");
   assert.equal(Lexicon.determineWordType("attach"), "verb");
   assert.equal(Lexicon.determineWordType("back"), "adjective");
   assert.equal(Lexicon.determineWordType("here"), "adverb");
   assert.equal(Lexicon.determineWordType("he"), "pronoun");
   assert.equal(Lexicon.determineWordType("aragorn"), "name");
   assert.equal(Lexicon.determineWordType("the"), "article");
   assert.equal(Lexicon.determineWordType("above"), "preposition");
   assert.equal(Lexicon.determineWordType("and"), "conjunction");
});

export default LexiconTest;