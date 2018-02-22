import CardInstancesArea from "../../view/js/CardInstancesArea.js";

function mapStateToProps(state)
{
   var environment = state.environment;
   var cardInstance = environment.activeQuest();

   return (
   {
      cardInstances: (cardInstance ? [cardInstance] : []),
      label: "Active Quest",
      resourceBase: state.resourceBase,
   });
}

export default ReactRedux.connect(mapStateToProps)(CardInstancesArea);