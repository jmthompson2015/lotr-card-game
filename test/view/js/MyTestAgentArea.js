"use strict";

require(["react", "react-dom", "react-dom-factories", "react-redux", "redux", "common/js/Logger",
        "model/js/Action", "model/js/Agent", "model/js/Game", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder",
        "view/js/AgentArea"
      ],
   function(React, ReactDOM, DOM, ReactRedux, Redux, Logger,
      Action, Agent, Game, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, AgentArea)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var game = createGame();
      var store = game.store();
      store.dispatch(Action.setResourceBase(resourceBase));
      var environment = store.getState().environment;
      var agent = environment.agents().toJS().lotrRandomElement();
      var cardInstance = environment.stagingArea().get(0);
      store.dispatch(Action.agentEngageCard(agent, cardInstance));

      var element = React.createElement(ReactRedux.Provider,
      {
         store: store,
      }, React.createElement(AgentArea,
      {
         agent: agent,
         resourceBase: resourceBase,
      }));

      ReactDOM.render(DOM.div(
      {
         className: "br-red center dt tc",
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