import CardComparator from "./CardComparator.js";
import SingleCardChooser from "./SingleCardChooser.js";

class EnemyDefenderChooser extends React.Component
{
   render()
   {
      return React.createElement(SingleCardChooser,
      {
         cardInstances: this.props.cardInstances,
         onChange: this.props.onChange,
         title: "Select Enemy Defender",
         comparator: CardComparator.DefenseName,
         labelFunction: labelFunction,
      });
   }
}

function labelFunction(value)
{
   return value.card().name + " (defense " + value.defense() + ")";
}

EnemyDefenderChooser.propTypes = {
   cardInstances: PropTypes.array.isRequired,
   onChange: PropTypes.func.isRequired,
};

export default EnemyDefenderChooser;