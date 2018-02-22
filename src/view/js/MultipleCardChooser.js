import Button from "./Button.js";
import InputPanel from "./InputPanel.js";
import OptionPane from "./OptionPane.js";

var MultipleCardChooser = createReactClass(
{
   getInitialState: function()
   {
      return (
      {
         selected: [],
      });
   },

   render: function()
   {
      var cardInstances = this.props.cardInstances;

      if (this.props.comparator)
      {
         cardInstances.sort(this.props.comparator);
      }

      var inputPanel = this.createInputPanel(cardInstances);
      var cancelButton = this.createCancelButton();
      var okButton = this.createOkButton();
      var buttons = ReactDOMFactories.span(
      {}, [cancelButton, okButton]);

      return React.createElement(OptionPane,
      {
         panelClass: "bg-lotr-light",
         title: this.props.title,
         titleClass: "bg-lotr-dark",
         message: this.props.message,
         messageClass: "ma2 pa2",
         initialInput: inputPanel,
         buttons: buttons,
         buttonsClass: "pa2 tr",
      });
   },
});

MultipleCardChooser.prototype.cancel = function()
{
   var selected;
   var isAccepted = false;

   this.props.onChange(selected, isAccepted);
};

MultipleCardChooser.prototype.createCancelButton = function()
{
   return React.createElement(Button,
   {
      key: "cancelButton",
      name: "Cancel",
      onClick: this.cancel.bind(this),
   });
};

MultipleCardChooser.prototype.createInputPanel = function(cardInstances)
{
   return React.createElement(InputPanel,
   {
      type: InputPanel.Type.CHECKBOX,
      values: cardInstances,
      name: "selectCards",
      labelFunction: this.props.labelFunction,
      onChange: this.handleChange.bind(this),
      panelClass: "f6 tl",
   });
};

MultipleCardChooser.prototype.createOkButton = function()
{
   return React.createElement(Button,
   {
      key: "okButton",
      name: "OK",
      onClick: this.ok.bind(this),
   });
};

MultipleCardChooser.prototype.handleChange = function(event, selected)
{
   this.setState(
   {
      selected: selected,
   });
};

MultipleCardChooser.prototype.ok = function()
{
   var selected = this.state.selected;
   var isAccepted = (selected !== undefined);

   this.props.onChange(selected, isAccepted);
};

function defaultComparator(a, b)
{
   var aa = a.card().name;
   var bb = b.card().name;

   return (aa === bb ? 0 : (aa > bb ? 1 : -1));
}

function defaultLabelFunction(value)
{
   var card = value.card();

   return card.name + " (" + card.cardType.name + ")";
}

MultipleCardChooser.propTypes = {
   cardInstances: PropTypes.array.isRequired,
   onChange: PropTypes.func.isRequired,
   title: PropTypes.string.isRequired,

   comparator: PropTypes.func,
   labelFunction: PropTypes.func,
   message: PropTypes.string,
   myKey: PropTypes.string,
};

MultipleCardChooser.defaultProps = {
   comparator: defaultComparator,
   labelFunction: defaultLabelFunction,
   message: "",
   myKey: "multipleCardChooser",
};

export default MultipleCardChooser;