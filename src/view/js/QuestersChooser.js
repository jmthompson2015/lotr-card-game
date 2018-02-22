import CardComparator from "./CardComparator.js";
import MultipleCardChooser from "./MultipleCardChooser.js";

var QuestersChooser = createReactClass(
{
   render: function()
   {
      var questInstance = this.props.questInstance;
      var remainingPoints = questInstance.card().questPoints - questInstance.progress();
      var message = "Quest: " + questInstance.card().name + " (quest " + remainingPoints + ")";

      return React.createElement(MultipleCardChooser,
      {
         cardInstances: this.props.cardInstances,
         onChange: this.props.onChange,
         title: "Select Questers",
         comparator: CardComparator.WillpowerDefenseAttackName,
         labelFunction: labelFunction,
         message: message,
      });
   },
});

function labelFunction(value)
{
   return value.card().name + " (willpower " + value.willpower() + ")";
}

QuestersChooser.propTypes = {
   cardInstances: PropTypes.array.isRequired,
   onChange: PropTypes.func.isRequired,
   questInstance: PropTypes.object.isRequired,
};

export default QuestersChooser;