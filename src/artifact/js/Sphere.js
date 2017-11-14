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
   };

   Sphere.keys = function()
   {
      return Object.keys(Sphere.properties);
   };

   Sphere.values = function()
   {
      return Object.values(Sphere.properties);
   };

   Sphere.keys().forEach(function(sphereKey)
   {
      var sphere = Sphere.properties[sphereKey];
      sphere.image = "sphere/" + sphere.name + "24.png";
   });

   if (Object.freeze)
   {
      Object.freeze(Sphere);
   }

   return Sphere;
});
