import CardComparator from "./CardComparator.js";
import SingleCardChooser from "./SingleCardChooser.js";

var PlayCardChooser = createReactClass(
{
   render: function()
   {
      return React.createElement(SingleCardChooser,
      {
         cardInstances: this.props.cardInstances,
         onChange: this.props.onChange,
         title: "Select Card to Play",
         comparator: CardComparator.TypeCostSphereName,
         labelFunction: labelFunction,
      });
   },
});

function labelFunction(value)
{
   var card = value.card();
   return card.name + " (" + card.cardType.name + ", " + card.sphere.name + " " + card.cost + ")";
}

PlayCardChooser.propTypes = {
   cardInstances: PropTypes.array.isRequired,
   onChange: PropTypes.func.isRequired,
};

export default PlayCardChooser;