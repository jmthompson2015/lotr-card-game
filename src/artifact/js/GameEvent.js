"use strict";

define(function()
{
   var GameEvent = {
      CARD_DRAWN: "cardDrawn",
      QUEST_CARD_DRAWN: "questCardDrawn",
      QUEST_SUCCEEDED: "questSucceeded",
      SHADOW_CARD_REVEALED: "shadowCardRevealed",
      TRAVELED: "traveled",
      WOUNDED: "wounded",

      properties:
      {
         "cardDrawn":
         {
            name: "Card drawn",
            key: "cardDrawn",
         },
         "questCardDrawn":
         {
            name: "Quest card drawn",
            key: "questCardDrawn",
         },
         "questSucceeded":
         {
            name: "Quest succeeded",
            key: "questSucceeded",
         },
         "shadowCardRevealed":
         {
            name: "Shadow card revealed",
            key: "shadowCardRevealed",
         },
         "traveled":
         {
            name: "Traveled",
            key: "traveled",
         },
         "wounded":
         {
            name: "Wounded",
            key: "wounded",
         },
      },
   };

   GameEvent.keys = function()
   {
      return Object.keys(GameEvent.properties);
   };

   GameEvent.values = function()
   {
      return Object.values(GameEvent.properties);
   };

   if (Object.freeze)
   {
      Object.freeze(GameEvent);
   }

   return GameEvent;
});
