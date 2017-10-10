"use strict";

define(["artifact/js/CardSet", "artifact/js/CardSubset"],
   function(CardSet, CardSubset)
   {
      var EncounterSet = {
         DOL_GULDUR_ORCS: "dolGuldurOrcs",
         JOURNEY_DOWN_THE_ANDUIN: "journeyDownTheAnduin",
         PASSAGE_THROUGH_MIRKWOOD: "passageThroughMirkwood",
         SAURONS_REACH: "sauronsReach",
         SPIDERS_OF_MIRKWOOD: "spidersOfMirkwood",
         THE_HUNT_FOR_GOLLUM: "theHuntForGollum",
         WILDERLANDS: "wilderlands",

         properties:
         {
            "dolGuldurOrcs":
            {
               name: "Dol Guldur Orcs",
               cardSetKey: CardSet.CORE,
               key: "dolGuldurOrcs",
            },
            "journeyDownTheAnduin":
            {
               name: "Journey Down the Anduin",
               cardSetKey: CardSet.CORE,
               key: "journeyDownTheAnduin",
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
            "theHuntForGollum":
            {
               name: "The Hunt for Gollum",
               cardSetKey: CardSet.CORE,
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
