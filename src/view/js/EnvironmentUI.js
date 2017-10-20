"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories",
  "controller/js/ActiveLocationContainer", "controller/js/ActiveQuestContainer", "controller/js/AgentAreaContainer", "controller/js/StagingAreaContainer", "controller/js/StatusBarContainer"],
   function(createReactClass, PropTypes, React, DOM, ActiveLocationContainer, ActiveQuestContainer, AgentAreaContainer, StagingAreaContainer, StatusBarContainer)
   {
      var EnvironmentUI = createReactClass(
      {
         render: function()
         {
            var environment = this.props.environment;
            var resourceBase = this.props.resourceBase;

            var statusBar = React.createElement(StatusBarContainer);

            var cell = React.createElement(ActiveQuestContainer,
            {
               resourceBase: resourceBase,
            });
            var questArea = DOM.div(
            {
               key: "questArea",
               className: "dt fl pa1",
            }, cell);

            cell = React.createElement(ActiveLocationContainer,
            {
               resourceBase: resourceBase,
            });
            var locationArea = DOM.div(
            {
               key: "locationArea",
               className: "dt fl pa1",
            }, cell);

            cell = React.createElement(StagingAreaContainer,
            {
               resourceBase: resourceBase,
            });
            var stagingArea = DOM.div(
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
                  resourceBase: resourceBase,
               });
               accumulator.push(DOM.div(
               {
                  key: "agent" + agent.id(),
               }, cell));
               return accumulator;
            }, []);

            var agentsArea = DOM.div(
            {
               key: "agentsArea",
               className: "dt fl",
            }, cells);

            var areas = DOM.div(
            {
               key: "areas",
            }, questArea, locationArea, stagingArea, agentsArea);

            return DOM.div(
            {
               key: "environmentUI",
            }, statusBar, areas);
         },
      });

      EnvironmentUI.propTypes = {
         environment: PropTypes.object.isRequired,
         resourceBase: PropTypes.string.isRequired,
      };

      return EnvironmentUI;
   });
