"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/AgentArea",
  "controller/js/ActiveLocationContainer", "controller/js/ActiveQuestContainer", "controller/js/StagingAreaContainer"],
   function(createReactClass, PropTypes, React, DOM, AgentArea, ActiveLocationContainer, ActiveQuestContainer, StagingAreaContainer)
   {
      var EnvironmentUI = createReactClass(
      {
         render: function()
         {
            var environment = this.props.environment;
            var resourceBase = this.props.resourceBase;
            var questArea;
            var cell;

            if (environment.questDeck().size > 0)
            {
               cell = React.createElement(ActiveQuestContainer,
               {
                  resourceBase: resourceBase,
               });
               questArea = DOM.div(
               {
                  className: "dt fl pa1",
               }, cell);
            }

            var locationArea;

            if (environment.activeLocation() !== undefined)
            {
               cell = React.createElement(ActiveLocationContainer,
               {
                  resourceBase: resourceBase,
               });
               locationArea = DOM.div(
               {
                  className: "dt fl pa1",
               }, cell);
            }

            var stagingArea;

            if (environment.stagingArea().size > 0)
            {
               cell = React.createElement(StagingAreaContainer,
               {
                  resourceBase: resourceBase,
               });
               stagingArea = DOM.div(
               {
                  className: "dt fl pa1",
               }, cell);
            }

            // Agent Area for each agent.
            var agents = environment.agents();
            var cells = agents.reduce(function(accumulator, agent, i)
            {
               var cell = React.createElement(AgentArea,
               {
                  agent: agent,
                  resourceBase: resourceBase,
               });
               accumulator.push(DOM.div(
               {
                  key: "agent" + agent.name() + i,
               }, cell));
               return accumulator;
            }, []);

            var agentArea = DOM.div(
            {
               key: "agentsArea",
               className: "dt fl",
            }, cells);

            var areas = DOM.div(
            {}, questArea, locationArea, stagingArea, agentArea);

            return DOM.div(
            {}, areas);
         },
      });

      EnvironmentUI.propTypes = {
         environment: PropTypes.object.isRequired,
         resourceBase: PropTypes.string.isRequired,
      };

      return EnvironmentUI;
   });
