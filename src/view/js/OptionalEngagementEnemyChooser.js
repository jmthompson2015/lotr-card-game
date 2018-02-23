import CardComparator from "./CardComparator.js";
import SingleCardChooser from "./SingleCardChooser.js";

class OptionalEngagementEnemyChooser extends React.Component
{
   render()
   {
      return React.createElement(SingleCardChooser,
      {
         cardInstances: this.props.cardInstances,
         onChange: this.props.onChange,
         title: "Select Enemy",
         comparator: CardComparator.DefenseName,
         labelFunction: labelFunction,
         message: "for optional engagement",
      });
   }
}

function labelFunction(value)
{
   return value.card().name + " (defense " + value.defense() + ")";
}

OptionalEngagementEnemyChooser.propTypes = {
   cardInstances: PropTypes.array.isRequired,
};

export default OptionalEngagementEnemyChooser;