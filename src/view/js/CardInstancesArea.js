import CardInstanceUI from "./CardInstanceUI.js";
import ReactUtilities from "./ReactUtilities.js";

class CardInstancesArea extends React.Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         isExpanded: props.isExpanded,
      };
   }

   render()
   {
      var rows = [];

      rows.push(this.createLabelUI());
      rows.push(this.createCardInstanceCells());

      return ReactUtilities.createTable(rows, undefined, "bg-lotr-light");
   }
}

CardInstancesArea.prototype.createCardInstanceCells = function()
{
   var cardInstances = this.props.cardInstances;
   var resourceBase = this.props.resourceBase;
   var isExpanded = this.state.isExpanded;

   var cells = cardInstances.map(function(cardInstance, i)
   {
      var cardInstanceUI = React.createElement(CardInstanceUI,
      {
         key: cardInstance.toString() + i,
         cardInstance: cardInstance,
         resourceBase: resourceBase,
      });

      var myClassName;

      if (isExpanded || i === cardInstances.length - 1)
      {
         myClassName = "dtc pa1 v-mid";
      }
      else if (i < cardInstances.length - 1)
      {
         myClassName = "dn";
      }

      return ReactDOMFactories.div(
      {
         key: "cardCell" + i,
         className: myClassName,
      }, cardInstanceUI);
   });

   var cell = ReactUtilities.createCell(cells);

   return ReactUtilities.createRow(cell, "mainRow", "bg-lotr-medium");
};

CardInstancesArea.prototype.createLabelUI = function()
{
   var label = ReactUtilities.createCell(this.props.label, "labelCell", "b lotr-light tc");

   var cardCount = this.props.cardInstances.length;
   var isExpanded = this.state.isExpanded;
   var expandLabel = (cardCount > 1 ? (isExpanded ? "\u25B6" : "\u25BC") : "");
   var expandControl = ReactDOMFactories.div(
   {
      key: "expandCell",
      onClick: this.toggleExpand.bind(this),
   }, expandLabel);

   var row = ReactUtilities.createRow([label, expandControl], "labelExpandRow");
   var table = ReactUtilities.createTable(row, "labelExpandTable", "w-100");

   var tableCell = ReactUtilities.createCell(table, "tableCell");
   return ReactUtilities.createRow(tableCell, "labelRow", "bg-lotr-dark");
};

CardInstancesArea.prototype.toggleExpand = function()
{
   this.setState(
   {
      isExpanded: !this.state.isExpanded,
   });
};

CardInstancesArea.propTypes = {
   cardInstances: PropTypes.array.isRequired,
   resourceBase: PropTypes.string.isRequired,

   isExpanded: PropTypes.bool,
   label: PropTypes.string, // default: undefined
};

CardInstancesArea.defaultProps = {
   isExpanded: true,
};

export default CardInstancesArea;