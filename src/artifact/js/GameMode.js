"use strict";

define(["immutable"], function(Immutable)
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

   GameMode.createMap = function(easyCountIn, standardCountIn, nightmareCountIn)
   {
      var easyCount = (easyCountIn !== undefined ? easyCountIn : 0);
      var standardCount = (standardCountIn !== undefined ? standardCountIn : 0);
      var nightmareCount = (nightmareCountIn !== undefined ? nightmareCountIn : 0);

      var map = {};
      map[GameMode.EASY] = easyCount;
      map[GameMode.STANDARD] = standardCount;
      map[GameMode.NIGHTMARE] = nightmareCount;

      return Immutable.Map(map);
   };

   if (Object.freeze)
   {
      Object.freeze(GameMode);
   }

   return GameMode;
});
