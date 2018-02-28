import Parser from "../../../src/accessory/rule-generator/Parser.js";

QUnit.module("Parser");

var ParserTest = {};

QUnit.test("parse() Hero Aragorn", function(assert)
{
   // Setup.
   const card = {
      "pack_code": "Core",
      "pack_name": "Core Set",
      "type_code": "hero",
      "name": "Aragorn",
      "text": "Sentinel.\n<b>Response:</b> After Aragorn commits to a quest, spend 1 resource from his resource pool to ready him.",
   };

   // Run.
   const result = Parser.parse(card);

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 2);
   {
      const section = result[0];
      assert.equal(section.text, "sentinel.");
      assert.equal(ArrayIsEqual(section.sentences.map(sentence => sentence.text), ["sentinel"]), true);
      const sentence = section.sentences[0];
      assert.equal(ArrayIsEqual(sentence.clauses.map(clause => clause.text), ["sentinel"]), true);
      const clause = sentence.clauses[0];
      assert.equal(ArrayIsEqual(clause.phrases.map(phrase => phrase.text), ["sentinel"]), true);
      const phrase = clause.phrases[0];
      assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["sentinel"]), true);
   }
   {
      const section = result[1];
      assert.equal(section.text, "response: after aragorn commits to a quest, spend 1 resource from his resource pool to ready him.");
      assert.equal(ArrayIsEqual(section.sentences.map(sentence => sentence.text), ["response: after aragorn commits to a quest, spend 1 resource from his resource pool to ready him"]), true);
      {
         const sentence = section.sentences[0];
         assert.equal(ArrayIsEqual(sentence.clauses.map(clause => clause.text), ["response", "after aragorn commits to a quest", "spend 1 resource from his resource pool to ready him"]), true);
         {
            const clause = sentence.clauses[0];
            assert.equal(ArrayIsEqual(clause.phrases.map(phrase => phrase.text), ["response"]), true);
            const phrase = clause.phrases[0];
            assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["response"]), true);
         }
         {
            const clause = sentence.clauses[1];
            assert.equal(ArrayIsEqual(clause.phrases.map(phrase => phrase.text), ["after aragorn commits", "to a quest"]), true);
            {
               const phrase = clause.phrases[0];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["after", "aragorn", "commits"]), true);
            }
            {
               const phrase = clause.phrases[1];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["to", "a", "quest"]), true);
            }
         }
         {
            const clause = sentence.clauses[2];
            assert.equal(ArrayIsEqual(clause.phrases.map(phrase => phrase.text), ["spend 1 resource", "from his resource pool", "to ready him"]), true);
            {
               const phrase = clause.phrases[0];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["spend", "1", "resource"]), true);
            }
            {
               const phrase = clause.phrases[1];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["from", "his", "resource", "pool"]), true);
            }
            {
               const phrase = clause.phrases[2];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["to", "ready", "him"]), true);
            }
         }
      }
   }
});

QUnit.test("parse() Hero Boromir", function(assert)
{
   // Setup.
   const card = {
      "pack_code": "TDM",
      "pack_name": "The Dead Marshes",
      "type_code": "hero",
      "name": "Boromir",
      "text": "<b>Action:</b> Raise your threat by 1 to ready Boromir. (Limit once per phase.)\n<b>Action:</b> Discard Boromir to deal 2 damage to each enemy engaged with a single player.",
   };

   // Run.
   const result = Parser.parse(card);

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 2);
   {
      const section = result[0];
      assert.equal(section.text, "action: raise your threat by 1 to ready boromir. limit once per phase.");
      assert.equal(ArrayIsEqual(section.sentences.map(sentence => sentence.text), ["action: raise your threat by 1 to ready boromir", "limit once per phase"]), true);
      {
         const sentence = section.sentences[0];
         assert.equal(ArrayIsEqual(sentence.clauses.map(clause => clause.text), ["action", "raise your threat by 1 to ready boromir"]), true);
         {
            const clause = sentence.clauses[0];
            assert.equal(ArrayIsEqual(clause.phrases.map(phrase => phrase.text), ["action"]), true);
            const phrase = clause.phrases[0];
            assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["action"]), true);
         }
         {
            const clause = sentence.clauses[1];
            assert.equal(ArrayIsEqual(clause.phrases.map(phrase => phrase.text), ["raise your threat", "by 1", "to ready boromir"]), true);
            {
               const phrase = clause.phrases[0];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["raise", "your", "threat"]), true);
            }
            {
               const phrase = clause.phrases[1];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["by", "1"]), true);
            }
            {
               const phrase = clause.phrases[2];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["to", "ready", "boromir"]), true);
            }
         }
      }
      {
         const sentence = section.sentences[1];
         assert.equal(ArrayIsEqual(sentence.clauses.map(clause => clause.text), ["limit once per phase"]), true);
         const clause = sentence.clauses[0];
         assert.equal(ArrayIsEqual(clause.phrases.map(phrase => phrase.text), ["limit once per phase"]), true);
         const phrase = clause.phrases[0];
         assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["limit", "once", "per", "phase"]), true);
      }
   }
   {
      const section = result[1];
      assert.equal(section.text, "action: discard boromir to deal 2 damage to each enemy engaged with a single player.");
      assert.equal(ArrayIsEqual(section.sentences.map(sentence => sentence.text), ["action: discard boromir to deal 2 damage to each enemy engaged with a single player"]), true);
      {
         const sentence = section.sentences[0];
         assert.equal(ArrayIsEqual(sentence.clauses.map(clause => clause.text), ["action", "discard boromir to deal 2 damage to each enemy engaged with a single player"]), true);
         {
            const clause = sentence.clauses[0];
            assert.equal(ArrayIsEqual(clause.phrases.map(phrase => phrase.text), ["action"]), true);
            const phrase = clause.phrases[0];
            assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["action"]), true);
         }
         {
            const clause = sentence.clauses[1];
            assert.equal(ArrayIsEqual(clause.phrases.map(phrase => phrase.text), ["discard boromir", "to deal 2 damage", "to each enemy engaged", "with a single player"]), true);
            {
               const phrase = clause.phrases[0];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["discard", "boromir"]), true);
            }
            {
               const phrase = clause.phrases[1];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["to", "deal", "2", "damage"]), true);
            }
            {
               const phrase = clause.phrases[2];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["to", "each", "enemy", "engaged"]), true);
            }
            {
               const phrase = clause.phrases[3];
               assert.equal(ArrayIsEqual(phrase.words.map(word => word.text), ["with", "a", "single", "player"]), true);
            }
         }
      }
   }
});

QUnit.test("parsePhrases()", function(assert)
{
   // Setup.
   const clause = "spend 1 resource from his resource pool to ready him";

   // Run.
   const result = Parser.parsePhrases(clause);

   // Verify.
   assert.ok(result);
   assert.equal(result.length, 3);
   assert.equal(result[0].text, "spend 1 resource");
   assert.equal(result[1].text, "from his resource pool");
   assert.equal(result[2].text, "to ready him");
});

QUnit.test("print()", function(assert)
{
   // Setup.
   const card = {
      "pack_code": "Core",
      "pack_name": "Core Set",
      "type_code": "hero",
      "name": "Aragorn",
      "text": "Sentinel.\n<b>Response:</b> After Aragorn commits to a quest, spend 1 resource from his resource pool to ready him.",
   };
   const parts = Parser.parse(card);

   // Run.
   const result = Parser.print(parts);

   // Verify.
   assert.ok(result);
   assert.equal(result.replace(/\n/g, " "), "0 section: sentinel. 0 sentence: sentinel 0 clause: sentinel 0 phrase: sentinel 0 word: sentinel 1 section: response: after aragorn commits to a quest, spend 1 resource from his resource pool to ready him. 0 sentence: response: after aragorn commits to a quest, spend 1 resource from his resource pool to ready him 0 clause: response 0 phrase: response 0 word: response 1 clause: after aragorn commits to a quest 0 phrase: after aragorn commits 0 word: after 1 word: aragorn 2 word: commits 1 phrase: to a quest 0 word: to 1 word: a 2 word: quest 2 clause: spend 1 resource from his resource pool to ready him 0 phrase: spend 1 resource 0 word: spend 1 word: 1 2 word: resource 1 phrase: from his resource pool 0 word: from 1 word: his 2 word: resource 3 word: pool 2 phrase: to ready him 0 word: to 1 word: ready 2 word: him ");
});

function ArrayIsEqual(array, other)
{
   return Array.isArray(array) && Array.isArray(other) &&
      array.length === other.length &&
      array.every((element, i) => element === other[i]);
}

export default ParserTest;