"use strict";

require(["react", "react-dom", "react-redux", "redux", "common/js/Logger", "model/js/Action", "model/js/Agent", "model/js/Game",
				"model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "controller/js/AgentAreaContainer"
			],
   function(React, ReactDOM, ReactRedux, Redux, Logger, Action, Agent, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, AgentAreaContainer)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var game = createGame();
      var store = game.store();
      store.dispatch(Action.setResourceBase(resourceBase));
      var environment = game.engine().environment();
      var agent1 = environment.agents().first();
      var cardInstance = environment.stagingArea().first();
      store.dispatch(Action.agentEngageCard(agent1, cardInstance));

      var element = React.createElement(ReactRedux.Provider,
      {
         store: store,
      }, React.createElement(AgentAreaContainer,
      {
         agent: agent1,
      }));

      ReactDOM.render(element, document.getElementById("panel"));

      function createGame(callback)
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         var playerData = [
            {
               agent: new Agent(store, "agent1"),
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
					},
            {
               agent: new Agent(store, "agent2"),
               playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
					},
            {
               agent: new Agent(store, "agent3"),
               playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
					}, ];

         return new Game(store, scenarioDeck, playerData, 10, callback);
      }
   });