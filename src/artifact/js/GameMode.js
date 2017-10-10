"use strict";

define(function()
{
   var GameMode = {
      EASY: "easy", // grey border
      STANDARD: "standard", // gold border
      NIGHTMARE: "nightmare",

      properties:
      {
         "easy":
         {
            name: "Easy",
            key: "easy",
         },
         "standard":
         {
            name: "Standard",
            key: "standard",
         },
         "nightmare":
         {
            name: "Nightmare",
            key: "nightmare",
         },
      },

      keys: function()
      {
         return Object.getOwnPropertyNames(GameMode.properties);
      },
   };

   if (Object.freeze)
   {
      Object.freeze(GameMode);
   }

   return GameMode;
});
