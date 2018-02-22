import CardInstancesArea from "../../view/js/CardInstancesArea.js";

function mapStateToProps(state)
{
   var environment = state.environment;
   var cardInstance = environment.activeLocation();

   return (
   {
      cardInstances: (cardInstance ? [cardInstance] : []),
      label: "Active Location",
      resourceBase: state.resourceBase,
   });
}

export default ReactRedux.connect(mapStateToProps)(CardInstancesArea);