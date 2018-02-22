import InputValidator from "../../common/js/InputValidator.js";
import CardTable from "./CardTable.js";

function mapStateToProps(state, ownProps)
{
   InputValidator.validateNotNull("resourceBase", ownProps.resourceBase);

   return (
   {
      isFilterShown: state.isFilterShown,
      filters: state.filters,
      resourceBase: ownProps.resourceBase,
      rowData: state.filteredTableRows,
   });
}

export default ReactRedux.connect(mapStateToProps)(CardTable);