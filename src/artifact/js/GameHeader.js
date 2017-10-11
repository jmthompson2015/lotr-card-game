"use strict";

define(function()
{
   var GameHeader = {
      FORCED: "forced",
      SHADOW: "shadow",
      TRAVEL: "travel",
      WHEN_REVEALED: "whenRevealed",

      properties:
      {
         "forced":
         {
            name: "Forced",
            key: "forced",
         },
         "shadow":
         {
            name: "Shadow",
            key: "shadow",
         },
         "travel":
         {
            name: "Travel",
            key: "travel",
         },
         "whenRevealed":
         {
            name: "When Revealed",
            key: "whenRevealed",
         },
      },

      keys: function()
      {
         return Object.getOwnPropertyNames(GameHeader.properties);
      },
   };

   if (Object.freeze)
   {
      Object.freeze(GameHeader);
   }

   return GameHeader;
});
