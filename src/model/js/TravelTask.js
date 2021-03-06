import InputValidator from "../../common/js/InputValidator.js";
import CardType from "../../artifact/js/CardType.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import Action from "./Action.js";
import HumanAgentStrategy from "../../controller/js/HumanAgentStrategy.js";

function TravelTask(store)
{
   InputValidator.validateNotNull("store", store);

   this.store = function()
   {
      return store;
   };
}

TravelTask.prototype.doIt = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   var store = this.store();

   if (store.getState().activeLocationId === undefined)
   {
      // Pick a location from the staging area.
      var environment = store.getState().environment;
      var locations = environment.stagingArea(CardType.LOCATION);

      if (locations.length > 0)
      {
         // Ask the first HumanAgent, if any, or the first agent.
         var agents = environment.agentQueue();
         var agent;

         for (var i = 0; i < agents.length; i++)
         {
            var myAgent = agents[i];

            // FIXME: don't rely on controller.
            if (myAgent._strategy() === HumanAgentStrategy)
            {
               agent = myAgent;
               break;
            }
         }

         if (agent === undefined && agents.length > 0)
         {
            agent = agents[0];
         }

         var queueCallback = this.finish.bind(this);
         var locationCallback = function(location)
         {
            queueCallback(location, callback);
         };

         agent.chooseLocation(locations, locationCallback);
      }
      else
      {
         callback();
      }
   }
   else
   {
      callback();
   }
};

TravelTask.prototype.finish = function(location, callback)
{
   if (location)
   {
      var store = this.store();
      store.dispatch(Action.setActiveLocation(location));
      store.dispatch(Action.enqueueEvent(GameEvent.TRAVELED));
      store.dispatch(Action.setUserMessage("Travel to " + location.card().name));
   }

   callback();
};

export default TravelTask;