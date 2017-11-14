"use strict";

define(["create-react-class", "prop-types", "react-dom-factories"],
   function(createReactClass, PropTypes, DOM)
   {
      var AgentLabel = createReactClass(
      {
         render: function()
         {
            var firstAgentToken = DOM.div(
            {
               className: (this.props.isFirstAgent ? "" : "dn"),
               title: "First Player",
            }, DOM.img(
            {
               className: "dtc tc",
               src: this.props.resourceBase + "token/FirstPlayerToken32.png",
            }));
            var label = DOM.div(
            {
               key: "agentLabel",
               className: "b dtc f5 tc v-mid",
            }, "Agent: " + this.props.agentName);
            var threat = DOM.div(
            {
               key: "agentThreat",
               className: "b dtc f5 tc v-mid",
            }, "Threat Level: " + this.props.threatLevel);

            var panel = DOM.div(
            {
               key: "panel",
               className: "bg-lotr-dark dt lotr-light w-100",
            }, firstAgentToken, label, threat);

            return DOM.div(
            {
               key: "agentLabel",
            }, panel);
         },
      });

      AgentLabel.propTypes = {
         agentName: PropTypes.string.isRequired,
         isFirstAgent: PropTypes.bool.isRequired,
         resourceBase: PropTypes.string.isRequired,
         threatLevel: PropTypes.number.isRequired,
      };

      return AgentLabel;
   });
