"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/AgentLabel"],
   function(ReactRedux, InputValidator, AgentLabel)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

         var agent = ownProps.agent;

         return (
         {
            agentName: agent.name(),
            threatLevel: agent.threatLevel(),
         });
      }

      return ReactRedux.connect(mapStateToProps)(AgentLabel);
   });
