"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/CardInstancesArea"],
   function(createReactClass, PropTypes, React, DOM, CardInstancesArea)
   {
      var AgentArea = createReactClass(
      {
         render: function()
         {
            var agentLabel = this.createAgentLabel();
            var engagementArea = this.createEngagementArea();
            var tableauUI = this.createTableauUI();
            var handUI = this.createHandUI();

            var areas = DOM.div(
            {
               key: "agentAreas",
            }, engagementArea, tableauUI, handUI);

            var panel = DOM.div(
            {}, agentLabel, areas);

            return DOM.div(
            {
               className: "bg-lotr-green overflow-auto",
            }, panel);
         },
      });

      AgentArea.prototype.createAgentLabel = function()
      {
         var agent = this.props.agent;
         var label = DOM.div(
         {
            key: "agentLabel",
            className: "b dtc f5 tc",
         }, "Agent: " + agent.name());
         var threat = DOM.div(
         {
            key: "agentThreat",
            className: "b dtc f5 tc",
         }, "Threat Level: " + agent.threatLevel());

         var panel = DOM.div(
         {
            className: "bg-lotr-dark dt lotr-light w-100",
         }, label, threat);

         return DOM.div(
         {}, panel);
      };

      AgentArea.prototype.createEngagementArea = function()
      {
         var agent = this.props.agent;
         var engagementArea = agent.engagementArea().toJS();
         var answer;

         if (engagementArea.length > 0)
         {
            var cardInstancesArea = React.createElement(CardInstancesArea,
            {
               cardInstances: engagementArea,
               label: "Engagement Area",
               resourceBase: this.props.resourceBase,
            });

            answer = DOM.div(
            {
               key: "engagement",
               className: "fl pa1",
            }, cardInstancesArea);
         }
         else
         {
            answer = DOM.span(
            {}, "");
         }

         return answer;
      };

      AgentArea.prototype.createHandUI = function()
      {
         var agent = this.props.agent;
         var hand = agent.hand().toJS();
         var answer;

         if (hand.length > 0)
         {
            var cardInstancesArea = React.createElement(CardInstancesArea,
            {
               cardInstances: hand,
               label: "Hand",
               resourceBase: this.props.resourceBase,
            });

            answer = DOM.div(
            {
               key: "hand",
               className: "fl pa1",
            }, cardInstancesArea);
         }
         else
         {
            answer = DOM.span(
            {}, "");
         }

         return answer;
      };

      AgentArea.prototype.createTableauUI = function()
      {
         var agent = this.props.agent;
         var heroDeck = agent.heroDeck().toJS();
         var tableau = agent.tableau().toJS();
         var array = heroDeck.concat(tableau);
         var answer;

         if (array.length > 0)
         {
            var cardInstancesArea = React.createElement(CardInstancesArea,
            {
               cardInstances: array,
               label: "Tableau",
               resourceBase: this.props.resourceBase,
            });

            answer = DOM.div(
            {
               key: agent.name() + "Tableau",
               className: "fl pa1",
            }, cardInstancesArea);
         }
         else
         {
            answer = DOM.span(
            {}, "");
         }

         return answer;
      };

      AgentArea.propTypes = {
         agent: PropTypes.object.isRequired,
         resourceBase: PropTypes.string.isRequired,
      };

      return AgentArea;
   });
