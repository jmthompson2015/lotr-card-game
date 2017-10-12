"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/GameHeader", "artifact/js/GameMode", "artifact/js/Scenario", "artifact/js/Trait"],
   function(InputValidator, CardType, EncounterSet, GameHeader, GameMode, Scenario, Trait)
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
               gameModeMap: GameMode.createMap(4),
               gameText: [
                  {
                     headerKey: GameHeader.RESPONSE,
                     text: "After the players quest successfully, the players may claim Signs of Gollum if it has no attached encounters. When claimed, attach Signs of Gollum to any hero committed to the quest. (Counts as a Condition attachment with: 'Forced: After attached hero is damaged or leaves play, return this card to the top of the encounter deck.')",
                  }],
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

         keysByScenario: function(scenarioKey)
         {
            InputValidator.validateNotNull("scenarioKey", scenarioKey);

            var scenario = Scenario.properties[scenarioKey];
            var encounterSetKeys = scenario.encounterSetKeys;
            var keys = ObjectiveCard.keys();

            return keys.filter(function(cardKey)
            {
               var card = ObjectiveCard.properties[cardKey];

               return encounterSetKeys.includes(card.encounterSetKey);
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
