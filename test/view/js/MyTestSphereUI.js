"use strict";

require(["react", "react-dom", "react-dom-factories", "common/js/Logger", "artifact/js/Sphere", "view/js/SphereUI"],
   function(React, ReactDOM, DOM, Logger, Sphere, SphereUI)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var sphereKeys = Sphere.keys();
      var className = "ba bg-near-white f6 tl";
      var rows = [];

      sphereKeys.forEach(function(sphereKey, i)
      {
         var sphere = Sphere.properties[sphereKey];

         var image0 = React.createElement(SphereUI,
         {
            sphere: sphere,
            resourceBase: resourceBase,
         });
         var image1 = React.createElement(SphereUI,
         {
            sphere: sphere,
            resourceBase: resourceBase,
            showName: true,
         });
         var image2 = React.createElement(SphereUI,
         {
            sphere: sphere,
            resourceBase: resourceBase,
            isSmall: true,
         });
         var image3 = React.createElement(SphereUI,
         {
            sphere: sphere,
            resourceBase: resourceBase,
            isSmall: true,
            showName: true,
         });

         var cells = [];

         cells.push(DOM.td(
         {
            key: "standard",
            className: className,
         }, image0));
         cells.push(DOM.td(
         {
            key: "standard+name",
            className: className,
         }, image1));
         cells.push(DOM.td(
         {
            key: "small",
            className: className,
         }, image2));
         cells.push(DOM.td(
         {
            key: "small+name",
            className: className,
         }, image3));

         rows.push(DOM.tr(
         {
            key: rows.length,
         }, cells));
      });

      ReactDOM.render(DOM.table(
      {
         className: "center",
      }, DOM.tbody(
      {}, rows)), document.getElementById("panel"));
   });