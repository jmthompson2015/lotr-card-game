"use strict";

require(["react", "react-dom", "react-dom-factories", "react-redux", "model/js/Game", "view/js/EnvironmentUI", "view/js/NewGamePanel"],
   function(React, ReactDOM, DOM, ReactRedux, Game, EnvironmentUI, NewGamePanel)
   {
      var resourceBase = "view/resource/";

      var newGamePanel = React.createElement(NewGamePanel,
      {
         callback: startNewGame,
         resourceBase: resourceBase,
      });

      ReactDOM.render(newGamePanel, document.getElementById("inputArea"));
      var game;

      function startNewGame(scenarioDeck, playerData, delayIn, engineCallback)
      {
         LOGGER.info("startNewGame() start");

         for (var i = 0; i < 4; i++)
         {
            LOGGER.info("agent" + (i + 1) + " = " + (playerData[i] ? playerData[i].agent : playerData[i]));
         }

         var element = document.getElementById("inputArea");
         element.innerHTML = "";

         var store = playerData[0].agent.store();
         game = new Game(store, scenarioDeck, playerData, delayIn, engineCallback);
         createEnvironmentUI(game.engine(), game.engine().environment(), resourceBase, store);

         game.start();

         LOGGER.info("startNewGame() end");
      }

      function createEnvironmentUI(engine, environment, resourceBase, store)
      {
         var element = React.createElement(ReactRedux.Provider,
         {
            store: store,
         }, React.createElement(EnvironmentUI,
         {
            environment: environment,
         }));

         ReactDOM.render(DOM.div(
         {}, element), document.getElementById("panel"));
      }
   });
