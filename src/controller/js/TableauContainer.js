import InputValidator from "../../common/js/InputValidator.js";
import CardComparator from "../../view/js/CardComparator.js";
import CardInstancesArea from "../../view/js/CardInstancesArea.js";

function mapStateToProps(state, ownProps)
{
   InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

   var agent = ownProps.agent;
   var cardInstances = agent.tableau().toJS();
   cardInstances.sort(CardComparator.TypeHitPointsName);

   return (
   {
      cardInstances: cardInstances,
      label: "Tableau",
      resourceBase: state.resourceBase,
   });
}

export default ReactRedux.connect(mapStateToProps)(CardInstancesArea);