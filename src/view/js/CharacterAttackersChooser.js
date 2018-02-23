import CardComparator from "./CardComparator.js";
import MultipleCardChooser from "./MultipleCardChooser.js";

class CharacterAttackersChooser extends React.Component
{
   render()
   {
      var defenderInstance = this.props.defenderInstance;
      var remainingPoints = defenderInstance.remainingHitPoints();
      var message = "Defender: " + defenderInstance.card().name + " (hit points " + remainingPoints + ", defense " + defenderInstance.defense() + ")";

      return React.createElement(MultipleCardChooser,
      {
         cardInstances: this.props.cardInstances,
         onChange: this.props.onChange,
         title: "Select Attackers",
         comparator: CardComparator.AttackName,
         labelFunction: labelFunction,
         message: message,
      });
   }
}

function labelFunction(value)
{
   return value.card().name + " (attack " + value.attack() + ")";
}

CharacterAttackersChooser.propTypes = {
   cardInstances: PropTypes.array.isRequired,
   defenderInstance: PropTypes.object.isRequired,
   onChange: PropTypes.func.isRequired,
};

export default CharacterAttackersChooser;