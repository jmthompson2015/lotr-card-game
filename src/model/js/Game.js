"use strict";

define(["common/js/InputValidator", "artifact/js/EnemyCard", "artifact/js/LocationCard", "artifact/js/Scenario",
  "model/js/Action", "model/js/Engine", "model/js/Environment"],
   function(InputValidator, EnemyCard, LocationCard, Scenario, Action, Engine, Environment)
   {
      function Game(store, scenarioDeck, playerData)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("scenarioDeck", scenarioDeck);
         InputValidator.validateIsArray("playerData", playerData);

         // Setup.
         // 1. Shuffle Decks
         var environment = new Environment(store, scenarioDeck, playerData);

         // 2. Place Heroes and Set Initial Threat Levels
         playerData.forEach(function(data)
         {
            var agent = data.agent;
            var heroInstances = data.playerDeck.heroInstances;
            var initialThreat = heroInstances.reduce(function(accumulator, cardInstance)
            {
               return accumulator + cardInstance.card().threatCost;
            }, 0);
            store.dispatch(Action.setAgentThreat(agent, initialThreat));
         });

         // 3. Setup Token Bank

         // 4. Determine First Player
         store.dispatch(Action.setFirstAgent(playerData[0].agent));

         // 5. Draw Setup Hand
         playerData.forEach(function(data)
         {
            var agent = data.agent;
            for (var i = 0; i < 6; i++)
            {
               store.dispatch(Action.drawPlayerCard(agent));
            }
         });

         // 6. Set Quest Cards

         // 7. Follow Scenario Setup Instructions
         if (scenarioDeck.scenarioKey === Scenario.PASSAGE_THROUGH_MIRKWOOD)
         {
            // Setup: Search the encounter deck for 1 copy of the Forest Spider
            // and 1 copy of the Old Forest Road, and add them to the staging area.
            // Then Shuffle the encounter deck.
            environment.drawEncounterCard(EnemyCard.FOREST_SPIDER);
            environment.drawEncounterCard(LocationCard.OLD_FOREST_ROAD);

            var encounterDeck = environment.encounterDeck().toJS();
            encounterDeck.lotrShuffle();
            store.dispatch(Action.setEncounterDeck(encounterDeck));
         }

         var engine = new Engine(store, environment);

         this.store = function()
         {
            return store;
         };

         this.engine = function()
         {
            return engine;
         };
      }

      Game.prototype.start = function()
      {
         var engine = this.engine();

         setTimeout(function()
         {
            engine.performResourcePhase();
         }, 0);
      };

      return Game;
   });
