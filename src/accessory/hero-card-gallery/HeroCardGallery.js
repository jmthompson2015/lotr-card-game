import Logger from "../../common/js/Logger.js";
import HeroCard from "../../artifact/js/HeroCard.js";
import Sphere from "../../artifact/js/Sphere.js";
import CardImage from "../../view/js/CardImage.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var HeroGallery = createReactClass(
{
   render: function()
   {
      var cardKeys = HeroCard.keysBySphere(this.props.sphereKey);
      var resourceBase = "../../../src/view/resource/";
      var cells = [];

      cardKeys.forEach(function(cardKey)
      {
         var element = React.createElement(CardImage,
         {
            key: "cardInstance" + cardKey,
            card: HeroCard.properties[cardKey],
            resourceBase: resourceBase,
            width: 200,
         });
         cells.push(element);
      });

      return ReactDOMFactories.div(
      {}, cells);
   },
});

var rows = [];

Sphere.keys().forEach(function(sphereKey)
{
   var sphere = Sphere.properties[sphereKey];

   rows.push(ReactDOMFactories.h2(
   {
      key: "cardHeader" + rows.length,
   }, sphere.name));

   rows.push(React.createElement(HeroGallery,
   {
      key: "cardGallery" + rows.length,
      sphereKey: sphereKey,
   }));
});

var mainPanel = ReactDOMFactories.div(
{}, rows);
ReactDOM.render(mainPanel, document.getElementById("mainPanel"));