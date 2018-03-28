import InputValidator from "../../common/js/InputValidator.js";
import CardComparator from "../../view/js/CardComparator.js";
import CardInstancesArea from "../../view/js/CardInstancesArea.js";

function mapStateToProps(state, ownProps)
{
   InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

   var agent = ownProps.agent;
   var cardInstances = agent.hand();
   cardInstances.sort(CardComparator.TypeCostSphereName);

   return (
   {
      cardInstances: cardInstances,
      isExpanded: false,
      label: "Hand",
      resourceBase: state.resourceBase,
   });
}

export default ReactRedux.connect(mapStateToProps)(CardInstancesArea);