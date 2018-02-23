import CardComparator from "./CardComparator.js";
import SingleCardChooser from "./SingleCardChooser.js";

class LocationChooser extends React.Component
{
   render()
   {
      return React.createElement(SingleCardChooser,
      {
         cardInstances: this.props.cardInstances,
         onChange: this.props.onChange,
         title: "Select Travel Location",
         comparator: CardComparator.ThreatQuestName,
         labelFunction: labelFunction,
      });
   }
}

function labelFunction(value)
{
   return value.card().name + " (threat " + value.threat() + ", quest " + value.questPoints() + ")";
}

LocationChooser.propTypes = {
   cardInstances: PropTypes.array.isRequired,
};

export default LocationChooser;