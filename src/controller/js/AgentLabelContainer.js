import InputValidator from "../../common/js/InputValidator.js";
import AgentLabel from "../../view/js/AgentLabel.js";

function mapStateToProps(state, ownProps)
{
   InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

   var agent = ownProps.agent;
   var environment = state.environment;
   var firstAgent = environment.agentQueue()[0];
   var isFirstAgent = (firstAgent !== undefined && agent.id() === firstAgent.id());

   return (
   {
      agentName: agent.name(),
      isFirstAgent: isFirstAgent,
      resourceBase: state.resourceBase,
      threatLevel: agent.threatLevel(),
   });
}

export default ReactRedux.connect(mapStateToProps)(AgentLabel);