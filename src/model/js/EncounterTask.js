import InputValidator from "../../common/js/InputValidator.js";
import Phase from "../../artifact/js/Phase.js";
import Action from "./Action.js";
import EncounterEngagementCheckTask from "./EncounterEngagementCheckTask.js";
import EncounterOptionalEngagementTask from "./EncounterOptionalEngagementTask.js";
import QueueProcessor from "./QueueProcessor.js";

function EncounterTask(store)
{
   InputValidator.validateNotNull("store", store);

   this.store = function()
   {
      return store;
   };

   var queue = [];

   this.queue = function(queueIn)
   {
      if (queueIn !== undefined)
      {
         queue = queueIn;
      }

      return queue;
   };
}

EncounterTask.prototype.doIt = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   var store = this.store();
   store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_START));
   var environment = store.getState().environment;

   var queue = environment.agentQueue();
   var elementFunction = function(agent, queueCallback)
   {
      store.dispatch(Action.setActiveAgent(agent));
      var task = new EncounterOptionalEngagementTask(store, agent);
      setTimeout(function()
      {
         task.doIt(queueCallback);
      }, delay);
   };
   var phaseCallback = this.performEncounterPhase2.bind(this);
   var finishFunction = function(finishCallback)
   {
      store.dispatch(Action.setActiveAgent(undefined));
      store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_OPTIONAL_ENGAGEMENT_END));
      phaseCallback(finishCallback);
   };
   var delay = store.getState().delay;

   var queueProcessor = new QueueProcessor(queue, callback, elementFunction, finishFunction, delay);
   queueProcessor.processQueue();
};

EncounterTask.prototype.performEncounterPhase2 = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   var store = this.store();
   store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_ENGAGEMENT_CHECK_START));
   var environment = store.getState().environment;
   this.queue(environment.agentQueue());
   this.processEncounterQueue2(callback);
};

EncounterTask.prototype.processEncounterQueue2 = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   var store = this.store();
   var delay = store.getState().delay;

   if (this.queue().length === 0)
   {
      var environment = store.getState().environment;
      var enemies = environment.stagingEnemies();
      var minEnemyEngagement = (enemies.length > 0 ? enemies[enemies.length - 1].card().engagementCost : 1000);
      var maxAgentThreat = environment.agents().reduce(function(accumulator, agent)
      {
         return Math.max(accumulator, agent.threatLevel());
      }, 0);

      if (minEnemyEngagement > maxAgentThreat)
      {
         // We're done.
         store.dispatch(Action.setActiveAgent(undefined));
         store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_ENGAGEMENT_CHECK_END));
         var phaseCallback = this.finishEncounterPhase.bind(this);

         setTimeout(function()
         {
            phaseCallback(callback);
         }, delay);
      }
      else
      {
         // We're not done yet.
         this.queue(environment.agentQueue());
         this.processEncounterQueue2(callback);
      }

      return;
   }

   var agent = this.queue().shift();
   store.dispatch(Action.setActiveAgent(agent));

   var task = new EncounterEngagementCheckTask(store, agent);
   var queueCallback = this.processEncounterQueue2.bind(this);
   var taskCallback = function()
   {
      queueCallback(callback);
   };

   setTimeout(function()
   {
      task.doIt(taskCallback);
   }, delay);
};

EncounterTask.prototype.finishEncounterPhase = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   callback();
};

export default EncounterTask;