"use strict";

define(["artifact/js/CardSet", "artifact/js/CardSubset"],
   function(CardSet, CardSubset)
   {
      var EncounterSet = {
         A_JOURNEY_TO_RHOSGOBEL: "aJourneyToRhosgobel",
         CONFLICT_AT_THE_CARROCK: "conflictAtTheCarrock",
         DOL_GULDUR_ORCS: "dolGuldurOrcs",
         ESCAPE_FROM_DOL_GULDUR: "escapeFromDolGuldur",
         JOURNEY_ALONG_THE_ANDUIN: "journeyAlongTheAnduin",
         PASSAGE_THROUGH_MIRKWOOD: "passageThroughMirkwood",
         SAURONS_REACH: "sauronsReach",
         SPIDERS_OF_MIRKWOOD: "spidersOfMirkwood",
         THE_HILLS_OF_EMYN_MUIL: "theHillsOfEmynMuil",
         THE_HUNT_FOR_GOLLUM: "theHuntForGollum",
         WILDERLANDS: "wilderlands",

         properties:
         {
            "aJourneyToRhosgobel":
            {
               name: "A Journey to Rhosgobel",
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
               key: "aJourneyToRhosgobel",
            },
            "conflictAtTheCarrock":
            {
               name: "Conflict at the Carrock",
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
               key: "conflictAtTheCarrock",
            },
            "dolGuldurOrcs":
            {
               name: "Dol Guldur Orcs",
               cardSetKey: CardSet.CORE,
               key: "dolGuldurOrcs",
            },
            "escapeFromDolGuldur":
            {
               name: "Escape from Dol Guldur",
               cardSetKey: CardSet.CORE,
               key: "escapeFromDolGuldur",
            },
            "journeyAlongTheAnduin":
            {
               name: "Journey Along the Anduin",
               cardSetKey: CardSet.CORE,
               key: "journeyAlongTheAnduin",
            },
            "passageThroughMirkwood":
            {
               name: "Passage Through Mirkwood",
               cardSetKey: CardSet.CORE,
               key: "passageThroughMirkwood",
            },
            "sauronsReach":
            {
               name: "Sauron's Reach",
               cardSetKey: CardSet.CORE,
               key: "sauronsReach",
            },
            "spidersOfMirkwood":
            {
               name: "Spiders of Mirkwood",
               cardSetKey: CardSet.CORE,
               key: "spidersOfMirkwood",
            },
            "theHillsOfEmynMuil":
            {
               name: "The Hills of Emyn Muil",
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
               key: "theHillsOfEmynMuil",
            },
            "theHuntForGollum":
            {
               name: "The Hunt for Gollum",
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
               key: "theHuntForGollum",
            },
            "wilderlands":
            {
               name: "Wilderlands",
               cardSetKey: CardSet.CORE,
               key: "wilderlands",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(EncounterSet.properties);
         },
      };

      EncounterSet.keys().forEach(function(cardKey)
      {
         var card = EncounterSet.properties[cardKey];
         card.cardSet = CardSet.properties[card.cardSetKey];
         if (card.cardSubsetKey)
         {
            card.cardSubset = CardSubset.properties[card.cardSubsetKey];
         }
      });

      if (Object.freeze)
      {
         Object.freeze(EncounterSet);
      }

      return EncounterSet;
   });
