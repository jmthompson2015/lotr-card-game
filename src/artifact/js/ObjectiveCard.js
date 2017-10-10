"use strict";

define(["artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/ImageNameCreator", "artifact/js/Trait"],
   function(CardType, EncounterSet, ImageNameCreator, Trait)
   {
      var ObjectiveCard = {
         SIGNS_OF_GOLLUM: "signsOfGollum",

         properties:
         {
            "signsOfGollum":
            {
               name: "Signs of Gollum",
               traitKeys: [Trait.CLUE],
               encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
               key: "signsOfGollum",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(ObjectiveCard.properties);
         },
      };

      ObjectiveCard.keys().forEach(function(cardKey)
      {
         var card = ObjectiveCard.properties[cardKey];
         card.cardTypeKey = CardType.OBJECTIVE;
         card.cardType = CardType.properties[card.cardTypeKey];
         card.encounterSet = EncounterSet.properties[card.encounterSetKey];

         if (!card.image)
         {
            card.image = ImageNameCreator.create(card);
         }
      });

      if (Object.freeze)
      {
         Object.freeze(ObjectiveCard);
      }

      return ObjectiveCard;
   });
