"use strict";

define(["common/js/ArrayAugments", "common/js/InputValidator",
  "artifact/js/CardResolver", "artifact/js/CardType", "artifact/js/EnemyCard", "artifact/js/GameMode", "artifact/js/LocationCard", "artifact/js/ObjectiveCard", "artifact/js/QuestCard", "artifact/js/Scenario", "artifact/js/TreacheryCard",
  "model/js/CardInstance"],
   function(ArrayAugments, InputValidator, CardResolver, CardType, EnemyCard, GameMode, LocationCard, ObjectiveCard, QuestCard, Scenario, TreacheryCard, CardInstance)
   {
      var DeckBuilders = [];

      var PassageThroughMirkwoodDeckBuilder = new ScenarioDeckBuilder("Passage Through Mirkwood (Core #1)", 2011, "Passage Through Mirkwood",
         function(store)
         {
            var questKeys = QuestCard.keysByScenario(Scenario.PASSAGE_THROUGH_MIRKWOOD);

            // Choose one of the 3B paths randomly.
            var removeMe = [QuestCard.PTM3B1_BEORNS_PATH, QuestCard.PTM3B2_DONT_LEAVE_THE_PATH].lotrRandomElement();
            questKeys.lotrRemove(removeMe);

            return questKeys.map(function(cardKey)
            {
               var card = QuestCard.properties[cardKey];
               return new CardInstance(store, card);
            });
         },
         function(store, gameModeKey)
         {
            return encounterBuildFunction(store, gameModeKey, Scenario.PASSAGE_THROUGH_MIRKWOOD);
         });
      DeckBuilders.push(PassageThroughMirkwoodDeckBuilder);

      var TheHuntForGollumDeckBuilder = new ScenarioDeckBuilder("The Hunt for Gollum", 2011, "The Hunt for Gollum",
         function(store)
         {
            return questBuildFunction(store, Scenario.THE_HUNT_FOR_GOLLUM);
         },
         function(store, gameModeKey)
         {
            return encounterBuildFunction(store, gameModeKey, Scenario.THE_HUNT_FOR_GOLLUM);
         });
      DeckBuilders.push(TheHuntForGollumDeckBuilder);

      function ScenarioDeckBuilder(name, year, description, questBuildFunction, encounterBuildFunction)
      {
         InputValidator.validateNotNull("name", name);
         InputValidator.validateNotNull("year", year);
         InputValidator.validateNotNull("description", description);
         InputValidator.validateNotNull("questBuildFunction", questBuildFunction);
         InputValidator.validateNotNull("encounterBuildFunction", encounterBuildFunction);

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

         this.buildDeck = function(store, gameModeKeyIn)
         {
            InputValidator.validateNotNull("store", store);
            // gameModeKeyIn optional. default: GameMode.STANDARD

            var gameModeKey = (gameModeKeyIn !== undefined ? gameModeKeyIn : GameMode.STANDARD);

            var questInstances = questBuildFunction(store);
            var encounterInstances = encounterBuildFunction(store, gameModeKey);

            return (
            {
               questInstances: questInstances,
               encounterInstances: encounterInstances
            });
         };
      }

      function createCards(store, cardTypeKey, cardKey, gameModeKey)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("cardTypeKey", cardTypeKey);
         InputValidator.validateNotNull("cardKey", cardKey);
         InputValidator.validateNotNull("gameModeKey", gameModeKey);

         var card = CardResolver.get(cardTypeKey, cardKey);
         var gameModeMap = card.gameModeMap;
         var count = determineCount(gameModeMap, gameModeKey);
         var answer = [];

         for (var i = 0; i < count; i++)
         {
            answer.push(new CardInstance(store, card));
         }

         return answer;
      }

      function determineCount(gameModeMap, gameModeKey)
      {
         InputValidator.validateNotNull("gameModeMap", gameModeMap);
         InputValidator.validateNotNull("gameModeKey", gameModeKey);

         var count = gameModeMap.get(GameMode.EASY);

         if (gameModeKey === GameMode.STANDARD || gameModeKey === GameMode.NIGHTMARE)
         {
            count += gameModeMap.get(GameMode.STANDARD);
         }

         if (gameModeKey === GameMode.NIGHTMARE)
         {
            count += gameModeMap.get(GameMode.NIGHTMARE);
         }

         return count;
      }

      function encounterBuildFunction(store, gameModeKey, scenarioKey)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("gameModeKey", gameModeKey);
         InputValidator.validateNotNull("scenarioKey", scenarioKey);

         var enemyKeys = EnemyCard.keysByScenario(scenarioKey);
         var enemyTokens = enemyKeys.reduce(function(accumulator, cardKey)
         {
            return accumulator.concat(createCards(store, CardType.ENEMY, cardKey, gameModeKey));
         }, []);

         var locationKeys = LocationCard.keysByScenario(scenarioKey);
         var locationTokens = locationKeys.reduce(function(accumulator, cardKey)
         {
            return accumulator.concat(createCards(store, CardType.LOCATION, cardKey, gameModeKey));
         }, []);

         var objectiveKeys = ObjectiveCard.keysByScenario(scenarioKey);
         var objectiveTokens = objectiveKeys.reduce(function(accumulator, cardKey)
         {
            return accumulator.concat(createCards(store, CardType.OBJECTIVE, cardKey, gameModeKey));
         }, []);

         var treacheryKeys = TreacheryCard.keysByScenario(scenarioKey);
         var treacheryTokens = treacheryKeys.reduce(function(accumulator, cardKey)
         {
            return accumulator.concat(createCards(store, CardType.TREACHERY, cardKey, gameModeKey));
         }, []);

         return enemyTokens.concat(locationTokens.concat(objectiveTokens.concat(treacheryTokens)));
      }

      function questBuildFunction(store, scenarioKey)
      {
         var questKeys = QuestCard.keysByScenario(scenarioKey);

         return questKeys.map(function(cardKey)
         {
            var card = QuestCard.properties[cardKey];
            return new CardInstance(store, card);
         });
      }

      return (
      {
         PassageThroughMirkwoodDeckBuilder: PassageThroughMirkwoodDeckBuilder,
         TheHuntForGollumDeckBuilder: TheHuntForGollumDeckBuilder,
         DeckBuilders: DeckBuilders,
         ScenarioDeckBuilder: ScenarioDeckBuilder,
      });
   });