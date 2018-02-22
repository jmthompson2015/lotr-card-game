import Logger from "../../../src/common/js/Logger.js";
import LabeledImage from "../../../src/view/js/LabeledImage.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var resourceBase = "../../../src/view/resource/";

ReactDOM.render(ReactDOMFactories.div(
{}, "table"), document.getElementById("titlePanel"));

var element = React.createElement(LabeledImage,
{
   src: "token/Progress32.png",
   resourceBase: resourceBase,
   label: "1",
   labelClass: "b white",
   title: "Progress",
});
ReactDOM.render(element, document.getElementById("progressPanel0"));

var element = React.createElement(LabeledImage,
{
   src: "token/Progress32.png",
   resourceBase: resourceBase,
   label: "1",
   labelClass: "b white",
   showOne: true,
   title: "Progress",
});
ReactDOM.render(element, document.getElementById("progressPanel"));

var element = React.createElement(LabeledImage,
{
   src: "token/Resource32.png",
   resourceBase: resourceBase,
   label: "2",
   labelClass: "b white",
   title: "Resource",
});
ReactDOM.render(element, document.getElementById("resourcePanel"));

var element = React.createElement(LabeledImage,
{
   src: "token/Wound32.png",
   resourceBase: resourceBase,
   label: "3",
   labelClass: "b white",
   title: "Wound",
});
ReactDOM.render(element, document.getElementById("woundPanel"));

var cells = [];
cells.push(ReactDOMFactories.div(
{}, "div"));
cells.push(ReactDOMFactories.div(
   {
      className: "dtc",
   },
   React.createElement(LabeledImage,
   {
      src: "token/Progress32.png",
      resourceBase: resourceBase,
      label: "1",
      labelClass: "b white",
      title: "Progress",
   })));
cells.push(ReactDOMFactories.div(
   {
      className: "dtc",
   },
   React.createElement(LabeledImage,
   {
      src: "token/Progress32.png",
      resourceBase: resourceBase,
      label: "1",
      labelClass: "b white",
      showOne: true,
      title: "Progress",
   })));
cells.push(ReactDOMFactories.div(
   {
      className: "dtc",
   },
   React.createElement(LabeledImage,
   {
      src: "token/Resource32.png",
      resourceBase: resourceBase,
      label: "2",
      labelClass: "b red",
      title: "Resource",
   })));
cells.push(ReactDOMFactories.div(
   {
      className: "dtc",
   },
   React.createElement(LabeledImage,
   {
      src: "token/Wound32.png",
      resourceBase: resourceBase,
      label: "3",
      labelClass: "b white",
      title: "Wound",
   })));

ReactDOM.render(ReactDOMFactories.div(
{
   className: "bg-near-white center dt",
}, cells), document.getElementById("panel"));