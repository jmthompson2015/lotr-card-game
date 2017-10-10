"use strict";

define(function()
{
   var Sphere = {
      BAGGINS: "baggins",
      FELLOWSHIP: "fellowship",
      LEADERSHIP: "leadership",
      LORE: "lore",
      NEUTRAL: "neutral",
      SPIRIT: "spirit",
      TACTICS: "tactics",

      properties:
      {
         "baggins":
         {
            name: "Baggins",
            key: "baggins",
         },
         "fellowship":
         {
            name: "Fellowship",
            key: "fellowship",
         },
         "leadership":
         {
            name: "Leadership",
            key: "leadership",
         },
         "lore":
         {
            name: "Lore",
            key: "lore",
         },
         "neutral":
         {
            name: "Neutral",
            key: "neutral",
         },
         "spirit":
         {
            name: "Spirit",
            key: "spirit",
         },
         "tactics":
         {
            name: "Tactics",
            key: "tactics",
         },
      },

      keys: function()
      {
         return Object.getOwnPropertyNames(Sphere.properties);
      },
   };

   if (Object.freeze)
   {
      Object.freeze(Sphere);
   }

   return Sphere;
});
