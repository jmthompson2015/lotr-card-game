"use strict";

define(function()
{
   var CardType = {
      ATTACHMENT: "attachment",
      ALLY: "ally",
      ENEMY: "enemy",
      EVENT: "event",
      HERO: "hero",
      LOCATION: "location",
      OBJECTIVE: "objective",
      QUEST: "quest",
      TREACHERY: "treachery",

      properties:
      {
         "attachment":
         {
            name: "Attachment",
            key: "attachment",
         },
         "ally":
         {
            name: "Ally",
            key: "ally",
         },
         "enemy":
         {
            name: "Enemy",
            key: "enemy",
         },
         "event":
         {
            name: "Event",
            key: "event",
         },
         "hero":
         {
            name: "Hero",
            key: "hero",
         },
         "location":
         {
            name: "Location",
            key: "location",
         },
         "objective":
         {
            name: "Objective",
            key: "objective",
         },
         "quest":
         {
            name: "Quest",
            key: "quest",
         },
         "treachery":
         {
            name: "Treachery",
            key: "treachery",
         },
      },

      keys: function()
      {
         return Object.getOwnPropertyNames(CardType.properties);
      },
   };

   if (Object.freeze)
   {
      Object.freeze(CardType);
   }

   return CardType;
});
