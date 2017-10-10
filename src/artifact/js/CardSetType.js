"use strict";

define(function()
{
   var CardSetType = {
      ADVENTURE_PACK: "adventurePack",
      CORE: "core",
      CYCLE: "cycle",
      DELUXE: "deluxe",
      SAGA: "saga",

      properties:
      {
         "adventurePack":
         {
            name: "Adventure Pack",
            key: "adventurePack",
         },
         "core":
         {
            name: "Core",
            key: "core",
         },
         "cycle":
         {
            name: "Cycle",
            key: "cycle",
         },
         "deluxe":
         {
            name: "Deluxe",
            key: "deluxe",
         },
         "saga":
         {
            name: "Saga",
            key: "saga",
         },
      },

      keys: function()
      {
         return Object.getOwnPropertyNames(CardSetType.properties);
      },
   };

   if (Object.freeze)
   {
      Object.freeze(CardSetType);
   }

   return CardSetType;
});
