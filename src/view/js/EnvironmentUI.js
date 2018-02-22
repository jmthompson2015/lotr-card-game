import ActiveLocationContainer from "../../controller/js/ActiveLocationContainer.js";
import ActiveQuestContainer from "../../controller/js/ActiveQuestContainer.js";
import AgentAreaContainer from "../../controller/js/AgentAreaContainer.js";
import StagingAreaContainer from "../../controller/js/StagingAreaContainer.js";
import StatusBarContainer from "../../controller/js/StatusBarContainer.js";

var EnvironmentUI = createReactClass(
{
   render: function()
   {
      var environment = this.props.environment;

      var statusBar = React.createElement(StatusBarContainer);

      var cell = React.createElement(ActiveQuestContainer,
      {});
      var questArea = ReactDOMFactories.div(
      {
         key: "questArea",
         className: "dt fl pa1",
      }, cell);

      cell = React.createElement(ActiveLocationContainer,
      {});
      var locationArea = ReactDOMFactories.div(
      {
         key: "locationArea",
         className: "dt fl pa1",
      }, cell);

      cell = React.createElement(StagingAreaContainer,
      {});
      var stagingArea = ReactDOMFactories.div(
      {
         key: "stagingArea",
         className: "dt fl pa1",
      }, cell);

      // Agent Area for each agent.
      var agents = environment.agents();
      var cells = agents.reduce(function(accumulator, agent)
      {
         var cell = React.createElement(AgentAreaContainer,
         {
            agent: agent,
         });
         accumulator.push(ReactDOMFactories.div(
         {
            key: "agent" + agent.id(),
         }, cell));
         return accumulator;
      }, []);

      var agentsArea = ReactDOMFactories.div(
      {
         key: "agentsArea",
         className: "dt fl",
      }, cells);

      var areas = ReactDOMFactories.div(
      {
         key: "areas",
      }, questArea, locationArea, stagingArea, agentsArea);

      return ReactDOMFactories.div(
      {
         key: "environmentUI",
      }, statusBar, areas);
   },
});

EnvironmentUI.propTypes = {
   environment: PropTypes.object.isRequired,
};

export default EnvironmentUI;