import InputValidator from "../../common/js/InputValidator.js";
import Phase from "../../artifact/js/Phase.js";
import Action from "./Action.js";
import CombatTask from "./CombatTask.js";
import EncounterTask from "./EncounterTask.js";
import PlanningTask from "./PlanningTask.js";
import QuestTask from "./QuestTask.js";
import RefreshTask from "./RefreshTask.js";
import ResourceTask from "./ResourceTask.js";
import TravelTask from "./TravelTask.js";

function Engine(store, environment, adjudicator, callback)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("environment", environment);
   InputValidator.validateNotNull("adjudicator", adjudicator);
   // callback optional.

   this.store = function()
   {
      return store;
   };

   this.environment = function()
   {
      return environment;
   };

   this.adjudicator = function()
   {
      return adjudicator;
   };

   this.callback = function()
   {
      return callback;
   };
}

//////////////////////////////////////////////////////////////////////////
// Phase methods.

Engine.prototype.performResourcePhase = function()
{
   var store = this.store();
   store.dispatch(Action.incrementRound());

   if (this.isGameOver())
   {
      this.processGameOver();
   }
   else
   {
      store.dispatch(Action.enqueuePhase(Phase.RESOURCE_START));

      var task = new ResourceTask(store);
      var callback = this.finishResourceQueue.bind(this);
      var delay = store.getState().delay;

      setTimeout(function()
      {
         task.doIt(callback);
      }, delay);
   }
};

Engine.prototype.finishResourceQueue = function()
{
   var store = this.store();
   store.dispatch(Action.enqueuePhase(Phase.RESOURCE_END));
   var phaseCallback = this.performPlanningPhase.bind(this);
   var delay = store.getState().delay;

   setTimeout(function()
   {
      phaseCallback();
   }, delay);
};

Engine.prototype.performPlanningPhase = function()
{
   if (this.isGameOver())
   {
      this.processGameOver();
   }
   else
   {
      var store = this.store();
      store.dispatch(Action.enqueuePhase(Phase.PLANNING_START));

      var task = new PlanningTask(store);
      var callback = this.finishPlanningQueue.bind(this);
      var delay = store.getState().delay;

      setTimeout(function()
      {
         task.doIt(callback);
      }, delay);
   }
};

Engine.prototype.finishPlanningQueue = function()
{
   var store = this.store();
   store.dispatch(Action.enqueuePhase(Phase.PLANNING_END));
   var phaseCallback = this.performQuestPhase.bind(this);
   var delay = store.getState().delay;

   setTimeout(function()
   {
      phaseCallback();
   }, delay);
};

Engine.prototype.performQuestPhase = function()
{
   if (this.isGameOver())
   {
      this.processGameOver();
   }
   else
   {
      var store = this.store();
      store.dispatch(Action.enqueuePhase(Phase.QUEST_START));

      var task = new QuestTask(store);
      var callback = this.finishQuestQueue.bind(this);
      var delay = store.getState().delay;

      setTimeout(function()
      {
         task.doIt(callback);
      }, delay);
   }
};

Engine.prototype.finishQuestQueue = function()
{
   var store = this.store();
   store.dispatch(Action.enqueuePhase(Phase.QUEST_END));
   var phaseCallback = this.performTravelPhase.bind(this);
   var delay = store.getState().delay;

   setTimeout(function()
   {
      phaseCallback();
   }, delay);
};

Engine.prototype.performTravelPhase = function()
{
   if (this.isGameOver())
   {
      this.processGameOver();
   }
   else
   {
      var store = this.store();
      store.dispatch(Action.enqueuePhase(Phase.TRAVEL_START));

      var task = new TravelTask(store);
      var callback = this.finishTravelPhase.bind(this);
      var delay = store.getState().delay;

      setTimeout(function()
      {
         task.doIt(callback);
      }, delay);
   }
};

Engine.prototype.finishTravelPhase = function()
{
   var store = this.store();
   store.dispatch(Action.enqueuePhase(Phase.TRAVEL_END));
   var phaseCallback = this.performEncounterPhase.bind(this);
   var delay = store.getState().delay;

   setTimeout(function()
   {
      phaseCallback();
   }, delay);
};

Engine.prototype.performEncounterPhase = function()
{
   if (this.isGameOver())
   {
      this.processGameOver();
   }
   else
   {
      var store = this.store();
      store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_START));

      var task = new EncounterTask(store);
      var callback = this.finishEncounterPhase.bind(this);
      var delay = store.getState().delay;

      setTimeout(function()
      {
         task.doIt(callback);
      }, delay);
   }
};

Engine.prototype.finishEncounterPhase = function()
{
   var store = this.store();
   store.dispatch(Action.enqueuePhase(Phase.ENCOUNTER_END));
   var phaseCallback = this.performCombatPhase.bind(this);
   var delay = store.getState().delay;

   setTimeout(function()
   {
      phaseCallback();
   }, delay);
};

Engine.prototype.performCombatPhase = function()
{
   if (this.isGameOver())
   {
      this.processGameOver();
   }
   else
   {
      var store = this.store();
      store.dispatch(Action.enqueuePhase(Phase.COMBAT_START));
      var delay = store.getState().delay;

      var task = new CombatTask(store);
      var callback = this.finishCombatPhase.bind(this);

      setTimeout(function()
      {
         task.doIt(callback);
      }, delay);
   }
};

Engine.prototype.finishCombatPhase = function()
{
   var store = this.store();
   store.dispatch(Action.enqueuePhase(Phase.COMBAT_END));
   var phaseCallback = this.performRefreshPhase.bind(this);
   var delay = store.getState().delay;

   setTimeout(function()
   {
      phaseCallback();
   }, delay);
};

Engine.prototype.performRefreshPhase = function()
{
   if (this.isGameOver())
   {
      this.processGameOver();
   }
   else
   {
      var store = this.store();
      store.dispatch(Action.enqueuePhase(Phase.REFRESH_START));

      var task = new RefreshTask(store);
      var callback = this.finishRefreshPhase.bind(this);
      var delay = store.getState().delay;

      setTimeout(function()
      {
         task.doIt(callback);
      }, delay);
   }
};

Engine.prototype.finishRefreshPhase = function()
{
   var store = this.store();
   store.dispatch(Action.enqueuePhase(Phase.REFRESH_END));
   var phaseCallback = this.performResourcePhase.bind(this);
   var delay = store.getState().delay;

   setTimeout(function()
   {
      phaseCallback();
   }, delay);
};

//////////////////////////////////////////////////////////////////////////
// Utility methods.

Engine.prototype.isGameOver = function()
{
   return this.adjudicator().isGameOver();
};

Engine.prototype.processGameOver = function()
{
   LOGGER.info("Game over.");

   var callback = this.callback();

   if (callback)
   {
      callback();
   }
};

export default Engine;