import Logger from "../../common/js/Logger.js";
import EncounterSet from "../../artifact/js/EncounterSet.js";
import QuestCard from "../../artifact/js/QuestCard.js";
import CardImage from "../../view/js/CardImage.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

class QuestGallery extends React.Component
{
   render()
   {
      var cardKeys = QuestCard.keysByEncounterSet(this.props.encounterSetKey);
      var resourceBase = "../../../src/view/resource/";
      var cells = [];

      cardKeys.forEach(function(cardKey)
      {
         var element = React.createElement(CardImage,
         {
            key: "cardInstance" + cardKey,
            card: QuestCard.properties[cardKey],
            resourceBase: resourceBase,
            width: 200,
         });
         cells.push(element);
      });

      return ReactDOMFactories.div(
      {}, cells);
   }
}

var rows = [];

EncounterSet.keys().forEach(function(encounterSetKey)
{
   var encounterSet = EncounterSet.properties[encounterSetKey];

   rows.push(ReactDOMFactories.h2(
   {
      key: "cardHeader" + rows.length,
   }, encounterSet.name));

   rows.push(React.createElement(QuestGallery,
   {
      key: "cardGallery" + rows.length,
      encounterSetKey: encounterSetKey,
   }));
});

var mainPanel = ReactDOMFactories.div(
{}, rows);
ReactDOM.render(mainPanel, document.getElementById("mainPanel"));