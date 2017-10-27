"use strict";

define(["common/js/InputValidator", "artifact/js/EncounterSet"],
   function(InputValidator, EncounterSet)
   {
      var Scenario = {
         CONFLICT_AT_THE_CARROCK: "conflictAtTheCarrock",
         PASSAGE_THROUGH_MIRKWOOD: "passageThroughMirkwood",
         JOURNEY_ALONG_THE_ANDUIN: "journeyAlongTheAnduin",
         ESCAPE_FROM_DOL_GULDUR: "escapeFromDolGuldur",
         THE_HUNT_FOR_GOLLUM: "theHuntForGollum",

         properties:
         {
            "conflictAtTheCarrock":
            {
               name: "Conflict at the Carrock",
               encounterSetKeys: [EncounterSet.CONFLICT_AT_THE_CARROCK, EncounterSet.JOURNEY_ALONG_THE_ANDUIN, EncounterSet.WILDERLANDS],
               key: "conflictAtTheCarrock",
            },
            "passageThroughMirkwood":
            {
               name: "Passage Through Mirkwood",
               encounterSetKeys: [EncounterSet.PASSAGE_THROUGH_MIRKWOOD, EncounterSet.SPIDERS_OF_MIRKWOOD, EncounterSet.DOL_GULDUR_ORCS],
               key: "passageThroughMirkwood",
            },
            "journeyAlongTheAnduin":
            {
               name: "Journey Along the Anduin",
               encounterSetKeys: [EncounterSet.JOURNEY_ALONG_THE_ANDUIN, EncounterSet.SAURONS_REACH, EncounterSet.DOL_GULDUR_ORCS, EncounterSet.WILDERLANDS],
               key: "journeyAlongTheAnduin",
            },
            "escapeFromDolGuldur":
            {
               name: "Escape from Dol Guldur",
               encounterSetKeys: [EncounterSet.ESCAPE_FROM_DOL_GULDUR, EncounterSet.SPIDERS_OF_MIRKWOOD, EncounterSet.DOL_GULDUR_ORCS],
               key: "escapeFromDolGuldur",
            },
            "theHuntForGollum":
            {
               name: "The Hunt for Gollum",
               encounterSetKeys: [EncounterSet.THE_HUNT_FOR_GOLLUM, EncounterSet.JOURNEY_ALONG_THE_ANDUIN, EncounterSet.SAURONS_REACH],
               key: "theHuntForGollum",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(Scenario.properties);
         },
      };

      Scenario.findByCardSet = function(cardSetKey)
      {
         InputValidator.validateIsString("cardSetKey", cardSetKey);

         return Scenario.keys().filter(function(scenarioKey)
         {
            var scenario = Scenario.properties[scenarioKey];
            var encounterSet = EncounterSet.properties[scenario.encounterSetKeys[0]];

            return encounterSet.cardSetKey === cardSetKey;
         });
      };

      if (Object.freeze)
      {
         Object.freeze(Scenario);
      }

      return Scenario;
   });
