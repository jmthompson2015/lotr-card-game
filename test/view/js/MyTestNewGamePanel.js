"use strict";

require(["react", "react-dom", "react-dom-factories", "common/js/Logger", "view/js/NewGamePanel"],
   function(React, ReactDOM, DOM, Logger, NewGamePanel)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var newGamePanel = React.createElement(NewGamePanel,
      {
         callback: callback,
      });

      ReactDOM.render(DOM.div(
      {}, newGamePanel), document.getElementById("panel"));

      function callback(scenarioDeck, playerData)
      {
         LOGGER.info("callback() scenarioDeck = " + JSON.stringify(scenarioDeck));
         LOGGER.info("callback() playerData = " + JSON.stringify(playerData));
      }
   });