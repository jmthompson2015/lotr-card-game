import InputValidator from "../../common/js/InputValidator.js";
import FilterUI from "./FilterUI.js";

function mapStateToProps(state, ownProps)
{
   InputValidator.validateNotNull("resourceBase", ownProps.resourceBase);

   return (
   {
      filters: state.filters,
      resourceBase: ownProps.resourceBase,
   });
}

export default ReactRedux.connect(mapStateToProps)(FilterUI);