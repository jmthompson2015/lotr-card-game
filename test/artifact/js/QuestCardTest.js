"use strict";

define(["qunit", "artifact/js/QuestCard", "artifact/js/Scenario"],
   function(QUnit, QuestCard, Scenario)
   {
      QUnit.module("QuestCard");

      QUnit.test("QuestCard properties Flies and Spiders", function(assert)
      {
         var cardKey = QuestCard.PTM1A_FLIES_AND_SPIDERS;
         var properties = QuestCard.properties[cardKey];
         assert.equal(properties.name, "Flies and Spiders");
         assert.equal(properties.sequence, "1A");
         assert.equal(properties.key, "ptm1aFliesAndSpiders");
      });

      QUnit.test("keys and values", function(assert)
      {
         // Setup.

         // Run.
         var result = QuestCard.keys();
         var ownPropertyNames = Object.getOwnPropertyNames(QuestCard);

         // Verify.
         ownPropertyNames.forEach(function(key)
         {
            var key2 = QuestCard[key];

            if (key !== "properties" && typeof key2 === "string")
            {
               assert.ok(QuestCard.properties[key2], "Missing value for key = " + key);
            }
         });

         result.forEach(function(value)
         {
            var p = ownPropertyNames.filter(function(key)
            {
               return QuestCard[key] === value;
            });

            assert.equal(p.length, 1, "Missing key for value = " + value);
         });
      });

      QUnit.test("QuestCard.keys()", function(assert)
      {
         // Run.
         var result = QuestCard.keys();

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 41);
         var i = 0;
         assert.equal(result[i++], QuestCard.PTM1A_FLIES_AND_SPIDERS);
         assert.equal(result[i++], QuestCard.PTM1B_FLIES_AND_SPIDERS);
         assert.equal(result[i++], QuestCard.PTM2A_A_FORK_IN_THE_ROAD);
         assert.equal(result[i++], QuestCard.PTM2B_A_FORK_IN_THE_ROAD);
         assert.equal(result[i++], QuestCard.PTM3A_A_CHOSEN_PATH);
         assert.equal(result[i++], QuestCard.PTM3B1_BEORNS_PATH);
         assert.equal(result[i++], QuestCard.PTM3B2_DONT_LEAVE_THE_PATH);

         assert.equal(result[i++], QuestCard.JATA1A_TO_THE_RIVER);
         assert.equal(result[i++], QuestCard.JATA1B_TO_THE_RIVER);
         assert.equal(result[i++], QuestCard.JATA2A_ANDUIN_PASSAGE);
         assert.equal(result[i++], QuestCard.JATA2B_ANDUIN_PASSAGE);
         assert.equal(result[i++], QuestCard.JATA3A_AMBUSH_ON_THE_SHORE);
         assert.equal(result[i++], QuestCard.JATA3B_AMBUSH_ON_THE_SHORE);

         assert.equal(result[i++], QuestCard.EFDG1A_THE_NECROMANCERS_TOWER);
         assert.equal(result[i++], QuestCard.EFDG1B_THE_NECROMANCERS_TOWER);
         assert.equal(result[i++], QuestCard.EFDG2A_THROUGH_THE_CAVERNS);
         assert.equal(result[i++], QuestCard.EFDG2B_THROUGH_THE_CAVERNS);
         assert.equal(result[i++], QuestCard.EFDG3A_OUT_OF_THE_DUNGEONS);
         assert.equal(result[i++], QuestCard.EFDG3B_OUT_OF_THE_DUNGEONS);

         assert.equal(result[i++], QuestCard.THFG1A_THE_HUNT_BEGINS);
         assert.equal(result[i++], QuestCard.THFG1B_THE_HUNT_BEGINS);
         assert.equal(result[i++], QuestCard.THFG2A_A_NEW_TERROR_ABROAD);
         assert.equal(result[i++], QuestCard.THFG2B_A_NEW_TERROR_ABROAD);
         assert.equal(result[i++], QuestCard.THFG3A_ON_THE_TRAIL);
         assert.equal(result[i++], QuestCard.THFG3B_ON_THE_TRAIL);

         assert.equal(result[i++], QuestCard.CATC1A_GRIMBEORNS_QUEST);
         assert.equal(result[i++], QuestCard.CATC1B_GRIMBEORNS_QUEST);
         assert.equal(result[i++], QuestCard.CATC2A_AGAINST_THE_TROLLS);
         assert.equal(result[i++], QuestCard.CATC2B_AGAINST_THE_TROLLS);

         assert.equal(result[i++], QuestCard.AJTR1A_THE_WOUNDED_EAGLE);
         assert.equal(result[i++], QuestCard.AJTR1B_THE_WOUNDED_EAGLE);
         assert.equal(result[i++], QuestCard.AJTR2A_RADAGASTS_REQUEST);
         assert.equal(result[i++], QuestCard.AJTR2B_RADAGASTS_REQUEST);
         assert.equal(result[i++], QuestCard.AJTR3A_RETURN_TO_RHOSGOBEL);
         assert.equal(result[i++], QuestCard.AJTR3B_RETURN_TO_RHOSGOBEL);

         assert.equal(result[i++], QuestCard.THOEM1A_THE_HILLS_OF_EMYN_MUIL);
         assert.equal(result[i++], QuestCard.THOEM1B_THE_HILLS_OF_EMYN_MUIL);

         assert.equal(result[i++], QuestCard.TDM1A_INTO_THE_MARSHES);
         assert.equal(result[i++], QuestCard.TDM1B_INTO_THE_MARSHES);
         assert.equal(result[i++], QuestCard.TDM2A_THE_CAPTURE);
         assert.equal(result[i++], QuestCard.TDM2B_THE_CAPTURE);
      });

      QUnit.test("QuestCard.keysByScenario()", function(assert)
      {
         // Run.
         var result = QuestCard.keysByScenario(Scenario.PASSAGE_THROUGH_MIRKWOOD);

         // Verify.
         assert.ok(result);
         assert.equal(result.length, 7);
      });
   });
