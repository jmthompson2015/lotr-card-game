import Phase from "../../artifact/js/Phase.js";
import StatusBarUI from "../../view/js/StatusBarUI.js";

function mapStateToProps(state)
{
   var environment = state.environment;
   var activeAgent = environment.activeAgent();
   var activeAgentName = (activeAgent ? activeAgent.name() : "");

   return (
   {
      round: state.round,
      phase: Phase.properties[state.phaseKey],
      activeAgentName: activeAgentName,
      userMessage: state.userMessage,
   });
}

export default ReactRedux.connect(mapStateToProps)(StatusBarUI);