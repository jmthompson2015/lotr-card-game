"use strict";

require(["react", "react-dom", "react-dom-factories", "react-redux", "redux", "common/js/Logger", "model/js/Action", "model/js/Agent", "model/js/CardAction", "model/js/Game",
				"model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "controller/js/CardImageContainer"
			],
   function(React, ReactDOM, DOM, ReactRedux, Redux, Logger, Action, Agent, CardAction, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, CardImageContainer)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var store = Redux.createStore(Reducer.root);
      store.dispatch(Action.setResourceBase(resourceBase));
      var game = createGame();
      var environment = game.engine().environment();
      var cardInstance0 = environment.stagingArea().get(0);
      var agent0 = environment.agents().get(0);
      var cardInstance1 = agent0.tableauHeroes().get(0);
      var cardInstance2 = agent0.tableauHeroes().get(1);
      store.dispatch(CardAction.setReady(cardInstance2, false));

      var cells = [];
      cells.push(React.createElement(ReactRedux.Provider,
      {
         key: "cell" + cells.length,
         store: store,
      }, React.createElement(CardImageContainer,
      {
         cardInstance: cardInstance0,
      })));

      cells.push(React.createElement(ReactRedux.Provider,
      {
         key: "cell" + cells.length,
         store: store,
      }, React.createElement(CardImageContainer,
      {
         cardInstance: cardInstance1,
      })));

      cells.push(React.createElement(ReactRedux.Provider,
      {
         key: "cell" + cells.length,
         store: store,
      }, React.createElement(CardImageContainer,
      {
         cardInstance: cardInstance2,
      })));

      ReactDOM.render(DOM.div(
      {}, cells), document.getElementById("panel"));

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