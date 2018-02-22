import InputValidator from "../../common/js/InputValidator.js";
import AgentArea from "../../view/js/AgentArea.js";

function mapStateToProps(state, ownProps)
{
   InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

   return (
   {
      agent: ownProps.agent,
      resourceBase: state.resourceBase,
   });
}

export default ReactRedux.connect(mapStateToProps)(AgentArea);