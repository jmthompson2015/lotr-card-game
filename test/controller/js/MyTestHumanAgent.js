"use strict";

require(["redux", "common/js/Logger", "model/js/Action", "model/js/Agent", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer",
				"model/js/ScenarioDeckBuilder", "controller/js/HumanAgentStrategy"
			],
   function(Redux, Logger, Action, Agent, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, HumanAgentStrategy)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var game = createGame();
      var environment = game.engine().environment();
      var store = environment.store();
      store.dispatch(Action.setResourceBase(resourceBase));
      var agent1 = environment.agents().first();
      var enemyInstance = environment.stagingArea().first();
      store.dispatch(Action.agentEngageCard(agent1, enemyInstance));
      var characters = agent1.defenders().toJS();

      // Run.
      agent1.chooseCharacterDefender(enemyInstance, characters, defenderCallback);

      function defenderCallback(defender)
      {
         LOGGER.info("defenderCallback() defender = " + defender);
      }

      function createGame(callback)
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         var playerData = [
            {
               agent: new Agent(store, "agent1", undefined, HumanAgentStrategy),
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
					}, ];

         return new Game(store, scenarioDeck, playerData, 10, callback);
      }
   });