"use strict";

require(["react", "react-dom", "react-dom-factories", "common/js/Logger", "artifact/js/Sphere", "view/js/TokenPanel"],
   function(React, ReactDOM, DOM, Logger, Sphere, TokenPanel)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var element = React.createElement(TokenPanel,
      {
         bonusAttack: 3,
         bonusDefense: 4,
         bonusHitPoints: 5,
         bonusThreat: -2,
         bonusWillpower: 1,
         resourceBase: resourceBase,
         progressCount: 3,
         resourceCount: 2,
         woundCount: 4,
      });

      ReactDOM.render(element, document.getElementById("panel"));
   });