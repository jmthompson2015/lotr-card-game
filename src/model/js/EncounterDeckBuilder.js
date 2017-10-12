"use strict";

define(["common/js/InputValidator",
  "artifact/js/CardResolver", "artifact/js/CardType", "artifact/js/EnemyCard", "artifact/js/GameMode", "artifact/js/LocationCard", "artifact/js/ObjectiveCard", "artifact/js/Scenario", "artifact/js/TreacheryCard",
  "model/js/CardInstance"],
   function(InputValidator, CardResolver, CardType, EnemyCard, GameMode, LocationCard, ObjectiveCard, Scenario, TreacheryCard, CardInstance)
   {
      var DeckBuilders = [];

      var PassageThroughMirkwoodDeckBuilder = new EncounterDeckBuilder("Passage Through Mirkwood (Core #1)", 2011, "Passage Through Mirkwood",
         function(store, gameModeKey)
         {
            var scenarioKey = Scenario.PASSAGE_THROUGH_MIRKWOOD;

            return encounterBuildFunction(store, gameModeKey, scenarioKey);
         });
      DeckBuilders.push(PassageThroughMirkwoodDeckBuilder);

      var TheHuntForGollumDeckBuilder = new EncounterDeckBuilder("The Hunt for Gollum", 2011, "The Hunt for Gollum",
         function(store, gameModeKey)
         {
            var scenarioKey = Scenario.THE_HUNT_FOR_GOLLUM;

            return encounterBuildFunction(store, gameModeKey, scenarioKey);
         });
      DeckBuilders.push(TheHuntForGollumDeckBuilder);

      function EncounterDeckBuilder(name, year, description, buildFunction)
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

         this.buildDeck = function(store, gameModeKeyIn)
         {
            InputValidator.validateNotNull("store", store);
            // gameModeKeyIn optional. default: GameMode.STANDARD

            var gameModeKey = (gameModeKeyIn !== undefined ? gameModeKeyIn : GameMode.STANDARD);

            return buildFunction(store, gameModeKey);
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

      return (
      {
         PassageThroughMirkwoodDeckBuilder: PassageThroughMirkwoodDeckBuilder,
         TheHuntForGollumDeckBuilder: TheHuntForGollumDeckBuilder,
         DeckBuilders: DeckBuilders,
         EncounterDeckBuilder: EncounterDeckBuilder,
      });
   });
