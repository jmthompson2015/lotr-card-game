import ArrayAugments from "../../common/js/ArrayAugments.js";
import InputValidator from "../../common/js/InputValidator.js";
import ObjectAugments from "../../common/js/ObjectAugments.js";

class InputPanel extends React.Component
{
   constructor(props)
   {
      super(props);

      var selected;

      switch (this.props.type)
      {
         case InputPanel.Type.CHECKBOX:
            selected = [];
            break;
         case InputPanel.Type.TEXT:
            selected = {};
            break;
      }

      if (this.props.initialValues)
      {
         switch (this.props.type)
         {
            case InputPanel.Type.CHECKBOX:
               selected.lotrAddAll(this.props.initialValues);
               break;
            case InputPanel.Type.RADIO:
               selected = this.props.initialValues;
               break;
            case InputPanel.Type.TEXT:
               Object.lotrMerge(selected, this.props.initialValues);
               break;
            default:
               throw "Unknown input type: " + this.props.type;
         }
      }

      this.state = {
         selected: selected,
      };

      this.handleChange = this.handleChange.bind(this);
   }

   render()
   {
      this.validateProps();

      var inputProps = this.createInputProps();
      var values = this.props.values;

      var rows = values.map(function(value, i)
      {
         return this.createRow(i, value, inputProps);
      }, this);

      return ReactDOMFactories.table(
      {
         className: this.props.panelClass,
      }, ReactDOMFactories.tbody(
      {}, rows));
   }

   createInputProps()
   {
      var answer = {
         name: this.props.name, // needed for radio
         onChange: this.handleChange,
         type: this.props.type,
      };

      var clientProps = this.props.clientProps;

      if (clientProps)
      {
         Object.lotrMerge(answer, clientProps);
      }

      return answer;
   }

   createRow(i, value, inputProps)
   {
      var selected = this.state.selected;
      var labelFunction = this.props.labelFunction;
      var label = (labelFunction ? labelFunction(value) : value);
      var type = this.props.type;

      inputProps.id = i;

      switch (type)
      {
         case InputPanel.Type.CHECKBOX:
            inputProps.defaultChecked = selected.includes(value);
            break;
         case InputPanel.Type.RADIO:
            inputProps.defaultChecked = (value === selected);
            break;
         case InputPanel.Type.TEXT:
            inputProps.defaultValue = selected[i];
            break;
         default:
            throw "Unknown input type: " + type;
      }

      var input = ReactDOMFactories.input(inputProps);
      var cells = [];

      if (type === InputPanel.Type.CHECKBOX || type === InputPanel.Type.RADIO)
      {
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, input));
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
            className: "ph1",
         }, label));
      }
      else if (type === InputPanel.Type.TEXT)
      {
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
            className: "ph1",
         }, label));
         cells.push(ReactDOMFactories.td(
         {
            key: cells.length,
         }, input));
      }

      return ReactDOMFactories.tr(
      {
         key: "row" + value + i,
         className: "striped--light-gray",
      }, cells);
   }

   handleChange(event)
   {
      var source = event.target;
      var id = event.target.id;
      var selected = this.state.selected;

      switch (this.props.type)
      {
         case InputPanel.Type.CHECKBOX:
            var mySelected = this.props.values[id];
            if (source.checked)
            {
               selected.push(mySelected);
            }
            else
            {
               selected.lotrRemove(mySelected);
            }
            break;
         case InputPanel.Type.RADIO:
            selected = this.props.values[id];
            break;
         case InputPanel.Type.TEXT:
            selected[id] = source.key;
            break;
         default:
            throw "Unknown input type: " + this.props.type;
      }

      this.setState(
         {
            selected: selected,
         },
         this.props.onChange(event, selected));
   }

   validateProps()
   {
      if (this.props.type === InputPanel.Type.RADIO)
      {
         InputValidator.validateNotNull("name", this.props.name);
      }
   }
}

InputPanel.propTypes = {
   // Function called when the selection changes.
   onChange: PropTypes.func.isRequired,
   // Input type. (e.g. "checkbox", "radio", "text")
   type: PropTypes.string.isRequired,
   // Option values.
   values: PropTypes.array.isRequired,

   // Client properties.
   clientProps: PropTypes.object,
   // Initial values.
   initialValues: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.object]),
   // Function which returns the label for a value. Defaults to simply return the value.
   labelFunction: PropTypes.func,
   // Button name. (required for radio)
   name: PropTypes.string,
   // Panel CSS class.
   panelClass: PropTypes.string,
};

InputPanel.defaultProps = {
   panelClass: "inputPanel2",
};

InputPanel.Type = {
   CHECKBOX: "checkbox",
   RADIO: "radio",
   TEXT: "text",
};

export default InputPanel;