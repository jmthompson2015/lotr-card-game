"use strict";

require(["react", "react-dom", "react-redux", "redux", "common/js/Logger", "artifact/js/Sphere", "model/js/Action", "model/js/Agent", "model/js/CardAction",
				"model/js/Environment", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder",
				"controller/js/TokenPanelContainer"
			],
   function(React, ReactDOM, ReactRedux, Redux, Logger, Sphere, Action, Agent, CardAction, Environment, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder,
      TokenPanelContainer)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var game = createGame();
      var environment = game.engine().environment();
      var store = environment.store();
      var resourceBase = "../../../src/view/resource/";
      store.dispatch(Action.setResourceBase(resourceBase));
      var cardInstance = environment.stagingArea().get(0);
      LOGGER.info("cardInstance = " + cardInstance);
      store.dispatch(CardAction.addWounds(cardInstance));
      store.dispatch(CardAction.addProgress(cardInstance, 2));
      store.dispatch(CardAction.addResources(cardInstance, 3));

      var element = React.createElement(ReactRedux.Provider,
      {
         store: store,
      }, React.createElement(TokenPanelContainer,
      {
         cardInstance: cardInstance,
      }));
      ReactDOM.render(element, document.getElementById("inputArea"));

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