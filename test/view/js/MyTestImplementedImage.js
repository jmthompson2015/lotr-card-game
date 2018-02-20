"use strict";

require(["react", "react-dom", "react-dom-factories", "common/js/Logger", "view/js/ImplementedImage"],
   function(React, ReactDOM, DOM, Logger, ImplementedImage)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";

      var element1 = React.createElement(ImplementedImage,
      {
         resourceBase: resourceBase,
         isImplemented: true,
      });
      ReactDOM.render(element1, document.getElementById("panel1"));

      var element2 = React.createElement(ImplementedImage,
      {
         resourceBase: resourceBase,
         isImplemented: false,
      });
      ReactDOM.render(element2, document.getElementById("panel2"));

      var element3 = React.createElement(ImplementedImage,
      {
         resourceBase: resourceBase,
      });
      ReactDOM.render(element3, document.getElementById("panel3"));
   });