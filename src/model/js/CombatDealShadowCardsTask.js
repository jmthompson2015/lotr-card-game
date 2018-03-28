import InputValidator from "../../common/js/InputValidator.js";
import Action from "./Action.js";

function CombatDealShadowCardsTask(store, agent)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("agent", agent);

   this.store = function()
   {
      return store;
   };

   this.agent = function()
   {
      return agent;
   };
}

CombatDealShadowCardsTask.prototype.doIt = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   var store = this.store();
   var agent = this.agent();
   var engagementArea = agent.engagementArea();

   if (engagementArea.length > 0)
   {
      engagementArea.forEach(function(cardInstance)
      {
         store.dispatch(Action.dealShadowCard(cardInstance));
      });
   }

   callback();
};

export default CombatDealShadowCardsTask;