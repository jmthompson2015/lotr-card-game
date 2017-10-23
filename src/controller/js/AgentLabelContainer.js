"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/AgentLabel"],
   function(ReactRedux, InputValidator, AgentLabel)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

         var agent = ownProps.agent;
         var environment = state.environment;
         var firstAgent = environment.agentQueue()[0];
         var isFirstAgent = (agent.id() === firstAgent.id());

         return (
         {
            agentName: agent.name(),
            isFirstAgent: isFirstAgent,
            resourceBase: state.resourceBase,
            threatLevel: agent.threatLevel(),
         });
      }

      return ReactRedux.connect(mapStateToProps)(AgentLabel);
   });
