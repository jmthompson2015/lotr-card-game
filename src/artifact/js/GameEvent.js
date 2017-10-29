"use strict";

define(function()
{
   var GameEvent = {
      OBJECTIVE_CARD_DRAWN: "objectiveCardDrawn",
      QUEST_CARD_DRAWN: "questCardDrawn",
      QUEST_SUCCEEDED: "questSucceeded",

      properties:
      {
         "objectiveCardDrawn":
         {
            name: "Objective card drawn",
            key: "objectiveCardDrawn",
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
