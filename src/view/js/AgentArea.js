import AgentLabelContainer from "../../controller/js/AgentLabelContainer.js";
import EngagementAreaContainer from "../../controller/js/EngagementAreaContainer.js";
import HandContainer from "../../controller/js/HandContainer.js";
import TableauContainer from "../../controller/js/TableauContainer.js";

var AgentArea = createReactClass(
{
   render: function()
   {
      var agent = this.props.agent;
      var agentLabel = this.createAgentLabel();
      var engagementArea = this.createEngagementArea();
      var tableauUI = this.createTableauUI();
      var handUI = this.createHandUI();
      var inputPanel = ReactDOMFactories.div(
      {
         key: "inputPanel" + agent.id(),
         id: "inputPanel" + agent.id(),
      });

      var areas = ReactDOMFactories.div(
      {
         key: "areas",
      }, engagementArea, tableauUI, handUI);

      var panel = ReactDOMFactories.div(
      {
         key: "panel",
      }, agentLabel, areas, inputPanel);

      return ReactDOMFactories.div(
      {
         key: "agentArea",
         className: "bg-lotr-green overflow-auto",
      }, panel);
   },
});

AgentArea.prototype.createAgentLabel = function()
{
   var agent = this.props.agent;

   var label = React.createElement(AgentLabelContainer,
   {
      key: "agentLabelContainer",
      agent: agent,
   });

   return ReactDOMFactories.div(
   {
      key: "agentLabel",
   }, label);
};

AgentArea.prototype.createEngagementArea = function()
{
   var agent = this.props.agent;

   var cardInstancesArea = React.createElement(EngagementAreaContainer,
   {
      key: "engagementAreaContainer",
      agent: agent,
   });

   return ReactDOMFactories.div(
   {
      key: "engagementArea",
      className: "fl pa1",
   }, cardInstancesArea);
};

AgentArea.prototype.createHandUI = function()
{
   var agent = this.props.agent;

   var cardInstancesArea = React.createElement(HandContainer,
   {
      key: "handContainer",
      agent: agent,
   });

   return ReactDOMFactories.div(
   {
      key: "handUI",
      className: "fl pa1",
   }, cardInstancesArea);
};

AgentArea.prototype.createTableauUI = function()
{
   var agent = this.props.agent;

   var cardInstancesArea = React.createElement(TableauContainer,
   {
      key: "tableauContainer",
      agent: agent,
   });

   return ReactDOMFactories.div(
   {
      key: "tableauUI",
      className: "fl pa1",
   }, cardInstancesArea);
};

AgentArea.propTypes = {
   agent: PropTypes.object.isRequired,
};

export default AgentArea;