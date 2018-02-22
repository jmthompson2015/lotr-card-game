import CardInstancesArea from "../../view/js/CardInstancesArea.js";

function mapStateToProps(state)
{
   var environment = state.environment;
   var cardInstances = environment.stagingArea().toJS();
   var threat = environment.stagingThreat();

   return (
   {
      cardInstances: cardInstances,
      label: "Staging Area (threat: " + threat + ")",
      resourceBase: state.resourceBase,
   });
}

export default ReactRedux.connect(mapStateToProps)(CardInstancesArea);