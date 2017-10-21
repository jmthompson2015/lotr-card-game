"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories",
  "controller/js/AgentLabelContainer", "controller/js/EngagementAreaContainer", "controller/js/HandContainer", "controller/js/TableauContainer"],
   function(createReactClass, PropTypes, React, DOM, AgentLabelContainer, EngagementAreaContainer, HandContainer, TableauContainer)
   {
      var AgentArea = createReactClass(
      {
         render: function()
         {
            var agent = this.props.agent;
            var agentLabel = this.createAgentLabel();
            var engagementArea = this.createEngagementArea();
            var tableauUI = this.createTableauUI();
            var handUI = this.createHandUI();
            var inputPanel = DOM.div(
            {
               key: "inputPanel" + agent.id(),
               id: "inputPanel" + agent.id(),
            });

            var areas = DOM.div(
            {
               key: "areas",
            }, engagementArea, tableauUI, handUI);

            var panel = DOM.div(
            {
               key: "panel",
            }, agentLabel, areas, inputPanel);

            return DOM.div(
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
            resourceBase: this.props.resourceBase,
         });

         return DOM.div(
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
            resourceBase: this.props.resourceBase,
         });

         return DOM.div(
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
            resourceBase: this.props.resourceBase,
         });

         return DOM.div(
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
            resourceBase: this.props.resourceBase,
         });

         return DOM.div(
         {
            key: "tableauUI",
            className: "fl pa1",
         }, cardInstancesArea);
      };

      AgentArea.propTypes = {
         agent: PropTypes.object.isRequired,
         resourceBase: PropTypes.string.isRequired,
      };

      return AgentArea;
   });
