"use strict";

define(["artifact/js/EncounterSet"], function(EncounterSet)
{
   var Scenario = {
      PASSAGE_THROUGH_MIRKWOOD: "passageThroughMirkwood",
      THE_HUNT_FOR_GOLLUM: "theHuntForGollum",

      properties:
      {
         "passageThroughMirkwood":
         {
            name: "Passage Through Mirkwood",
            encounterSetKeys: [EncounterSet.PASSAGE_THROUGH_MIRKWOOD, EncounterSet.SPIDERS_OF_MIRKWOOD,
                        EncounterSet.DOL_GULDUR_ORCS],
            key: "passageThroughMirkwood",
         },
         "theHuntForGollum":
         {
            name: "The Hunt for Gollum",
            encounterSetKeys: [EncounterSet.THE_HUNT_FOR_GOLLUM, EncounterSet.JOURNEY_DOWN_THE_ANDUIN,
                        EncounterSet.SAURONS_REACH],
            key: "theHuntForGollum",
         },
      },

      keys: function()
      {
         return Object.getOwnPropertyNames(Scenario.properties);
      },
   };

   if (Object.freeze)
   {
      Object.freeze(Scenario);
   }

   return Scenario;
});
