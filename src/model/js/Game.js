"use strict";

define(["immutable", "common/js/InputValidator", "artifact/js/GameMode", "artifact/js/Scenario",
   "model/js/Action", "model/js/Adjudicator", "model/js/AgentAction", "model/js/CardAction", "model/js/Engine", "model/js/Environment", "model/js/EventObserver", "model/js/PhaseObserver"],
   function(Immutable, InputValidator, GameMode, Scenario, Action, Adjudicator, AgentAction, CardAction, Engine, Environment, EventObserver, PhaseObserver)
   {
      function Game(store, scenarioDeck, playerData, engineCallback)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("scenarioDeck", scenarioDeck);
         InputValidator.validateIsArray("playerData", playerData);
         // engineCallback optional.

         this.store = function()
         {
            return store;
         };

         this.scenarioDeck = function()
         {
            return scenarioDeck;
         };

         this.playerData = function()
         {
            return playerData;
         };

         this.engineCallback = function()
         {
            return engineCallback;
         };

         var engine;

         this.engine = function()
         {
            return engine;
         };

         this.setEngine = function(engineIn)
         {
            InputValidator.validateNotNull("engine", engineIn);

            engine = engineIn;
         };

         // Setup.
         this.setUp();
      }

      Game.prototype.setUp = function()
      {
         var store = this.store();
         var scenarioDeck = this.scenarioDeck();
         var playerData = this.playerData();
         var engineCallback = this.engineCallback();
         store.dispatch(Action.setScenarioKey(scenarioDeck.scenarioKey));

         // 1. Shuffle Decks
         var environment = new Environment(store, scenarioDeck, playerData);
         var adjudicator = new Adjudicator(store);
         var engine = new Engine(store, environment, adjudicator, engineCallback);
         this.setEngine(engine);
         EventObserver.observeStore(store);
         PhaseObserver.observeStore(store);

         // 2. Place Heroes and Set Initial Threat Levels
         playerData.forEach(function(data)
         {
            var agent = data.agent;
            var heroInstances = data.playerDeck.heroInstances;
            var initialThreat = heroInstances.reduce(function(accumulator, cardInstance)
            {
               return accumulator + cardInstance.card().threatCost;
            }, 0);
            store.dispatch(AgentAction.setThreat(agent, initialThreat));
         });

         if (scenarioDeck.gameModeKey === GameMode.EASY)
         {
            // Add a resource to each hero.
            environment.agents().forEach(function(agent)
            {
               agent.tableauHeroes().forEach(function(cardInstance)
               {
                  store.dispatch(CardAction.addResource(cardInstance, cardInstance.card().sphereKey));
               });
            });
         }

         // 3. Setup Token Bank

         // 4. Determine First Player
         store.dispatch(Action.setFirstAgent(playerData[0].agent));

         // 5. Draw Setup Hand
         playerData.forEach(function(data)
         {
            var agent = data.agent;
            for (var i = 0; i < 6; i++)
            {
               store.dispatch(AgentAction.drawPlayerCard(agent));
            }
         });

         // 6. Set Quest Cards
         environment.advanceTheQuest(this.finishSetUp.bind(this));
      };

      Game.prototype.finishSetUp = function()
      {
         // 7. Follow Scenario Setup Instructions
      };

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
