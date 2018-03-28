import InputValidator from "../../common/js/InputValidator.js";
import CardInstancesArea from "../../view/js/CardInstancesArea.js";

function mapStateToProps(state, ownProps)
{
   InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

   var agent = ownProps.agent;
   var cardInstances = agent.engagementArea();

   return (
   {
      cardInstances: cardInstances,
      label: "Engagement Area",
      resourceBase: state.resourceBase,
   });
}

export default ReactRedux.connect(mapStateToProps)(CardInstancesArea);