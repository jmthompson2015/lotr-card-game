import InputValidator from "../../common/js/InputValidator.js";
import AgentAction from "./AgentAction.js";
import CardAction from "./CardAction.js";

function ResourceTask(store)
{
   InputValidator.validateNotNull("store", store);

   this.store = function()
   {
      return store;
   };
}

ResourceTask.prototype.doIt = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   var store = this.store();
   var environment = store.getState().environment;
   var agents = environment.agentQueue();

   agents.forEach(function(agent)
   {
      // Add one resource to each hero's pool.
      var cardInstances = agent.tableauHeroes();

      cardInstances.forEach(function(cardInstance)
      {
         store.dispatch(CardAction.addResources(cardInstance));
      });

      // Draw one card.
      store.dispatch(AgentAction.drawPlayerCard(agent));
   });

   callback();
};

export default ResourceTask;