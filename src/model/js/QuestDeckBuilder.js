"use strict";

define(["common/js/ArrayAugments", "common/js/InputValidator", "artifact/js/QuestCard", "artifact/js/Scenario", "model/js/CardInstance"],
   function(ArrayAugments, InputValidator, QuestCard, Scenario, CardInstance)
   {
      var DeckBuilders = [];

      var PassageThroughMirkwoodDeckBuilder = new QuestDeckBuilder("Passage Through Mirkwood (Core #1)", 2011, "Passage Through Mirkwood",
         function(store)
         {
            var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;
            var questKeys = QuestCard.keysByScenario(scenarioKey);

            // Choose one of the 3B paths randomly.
            var removeMe = [QuestCard.PTM3B1_BEORNS_PATH, QuestCard.PTM3B2_DONT_LEAVE_THE_PATH].lotrRandomElement();
            questKeys.lotrRemove(removeMe);

            return questKeys.map(function(cardKey)
            {
               var card = QuestCard.properties[cardKey];
               return new CardInstance(store, card);
            });
         });
      DeckBuilders.push(PassageThroughMirkwoodDeckBuilder);

      var TheHuntForGollumDeckBuilder = new QuestDeckBuilder("The Hunt for Gollum", 2011, "The Hunt for Gollum",
         function(store)
         {
            var scenarioKey = Scenario.THE_HUNT_FOR_GOLLUM;
            var questKeys = QuestCard.keysByScenario(scenarioKey);

            return questKeys.map(function(cardKey)
            {
               var card = QuestCard.properties[cardKey];
               return new CardInstance(store, card);
            });
         });
      DeckBuilders.push(TheHuntForGollumDeckBuilder);

      function QuestDeckBuilder(name, year, description, buildFunction)
      {
         InputValidator.validateNotNull("name", name);
         InputValidator.validateNotNull("year", year);
         InputValidator.validateNotNull("description", description);
         InputValidator.validateNotNull("buildFunction", buildFunction);

         this.name = function()
         {
            return name;
         };

         this.year = function()
         {
            return year;
         };

         this.description = function()
         {
            return description;
         };

         this.buildDeck = function(store)
         {
            InputValidator.validateNotNull("store", store);

            return buildFunction(store);
         };
      }

      return (
      {
         PassageThroughMirkwoodDeckBuilder: PassageThroughMirkwoodDeckBuilder,
         TheHuntForGollumDeckBuilder: TheHuntForGollumDeckBuilder,
         DeckBuilders: DeckBuilders,
         QuestDeckBuilder: QuestDeckBuilder,
      });
   });
