"use strict";

require(["react", "react-dom", "react-dom-factories", "react-redux", "redux", "common/js/Logger", "model/js/Action", "model/js/Agent", "model/js/Game",
        "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "view/js/EnvironmentUI"
      ],
   function(React, ReactDOM, DOM, ReactRedux, Redux, Logger, Action, Agent, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, EnvironmentUI)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var game = createGame();
      var store = game.store();
      store.dispatch(Action.setResourceBase(resourceBase));
      var environment = store.getState().environment;

      var element = React.createElement(ReactRedux.Provider,
      {
         store: store,
      }, React.createElement(EnvironmentUI,
      {
         environment: environment,
      }));

      ReactDOM.render(DOM.div(
      {
         className: "center dt tc",
      }, element), document.getElementById("panel"));

      function createGame(callback)
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
         var playerData = [
            {
               agent: new Agent(store, "Adam"),
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
          },
            {
               agent: new Agent(store, "Bruce"),
               playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
          },
            {
               agent: new Agent(store, "Charlie"),
               playerDeck: PlayerDeckBuilder.CoreSpiritDeckBuilder.buildDeck(store),
          },
            {
               agent: new Agent(store, "David"),
               playerDeck: PlayerDeckBuilder.CoreTacticsDeckBuilder.buildDeck(store),
          }, ];

         return new Game(store, scenarioDeck, playerData, 10, callback);
      }
   });