"use strict";

require(["react", "react-dom", "react-dom-factories", "common/js/Logger", "artifact/js/Phase", "view/js/StatusBarUI"],
   function(React, ReactDOM, DOM, Logger, Phase, StatusBarUI)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var element = React.createElement(StatusBarUI,
      {
         activeAgentName: "Bob",
         phase: Phase.properties[Phase.COMBAT_ATTACK_DETERMINE_DAMAGE],
         round: 12,
         userMessage: "Somebody attacked someone.",
      });
      ReactDOM.render(element, document.getElementById("statusBarPanel"));
   });