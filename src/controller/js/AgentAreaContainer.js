"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/AgentArea"],
   function(ReactRedux, InputValidator, AgentArea)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.agent", ownProps.agent);

         return (
         {
            agent: ownProps.agent,
            resourceBase: state.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(AgentArea);
   });
