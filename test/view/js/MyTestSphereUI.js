import Logger from "../../../src/common/js/Logger.js";
import Sphere from "../../../src/artifact/js/Sphere.js";
import SphereUI from "../../../src/view/js/SphereUI.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";
var sphereKeys = Sphere.keys();
var className = "ba bg-near-white f6 tl";
var rows = [];

sphereKeys.forEach(function(sphereKey)
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

   cells.push(ReactDOMFactories.td(
   {
      key: "standard",
      className: className,
   }, image0));
   cells.push(ReactDOMFactories.td(
   {
      key: "standard+name",
      className: className,
   }, image1));
   cells.push(ReactDOMFactories.td(
   {
      key: "small",
      className: className,
   }, image2));
   cells.push(ReactDOMFactories.td(
   {
      key: "small+name",
      className: className,
   }, image3));

   rows.push(ReactDOMFactories.tr(
   {
      key: rows.length,
   }, cells));
});

ReactDOM.render(ReactDOMFactories.table(
{
   className: "center",
}, ReactDOMFactories.tbody(
{}, rows)), document.getElementById("panel"));