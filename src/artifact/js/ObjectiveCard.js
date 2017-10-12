"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/Trait"],
   function(InputValidator, CardType, EncounterSet, Trait)
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

         keysByEncounterSet: function(encounterSetKey)
         {
            InputValidator.validateNotNull("encounterSetKey", encounterSetKey);

            var keys = ObjectiveCard.keys();

            return keys.filter(function(cardKey)
            {
               var card = ObjectiveCard.properties[cardKey];

               return card.encounterSetKey === encounterSetKey;
            });
         },
      };

      ObjectiveCard.keys().forEach(function(cardKey)
      {
         var card = ObjectiveCard.properties[cardKey];
         card.cardTypeKey = CardType.OBJECTIVE;
         card.cardType = CardType.properties[card.cardTypeKey];
         card.encounterSet = EncounterSet.properties[card.encounterSetKey];

         var imagePath = card.name;
         imagePath = imagePath.replace(/ /g, "-");

         card.imagePath = imagePath;
      });

      if (Object.freeze)
      {
         Object.freeze(ObjectiveCard);
      }

      return ObjectiveCard;
   });
