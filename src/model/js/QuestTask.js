import InputValidator from "../../common/js/InputValidator.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import Phase from "../../artifact/js/Phase.js";
import Action from "./Action.js";
import CardAction from "./CardAction.js";
import QueueProcessor from "./QueueProcessor.js";

function QuestTask(store)
{
   InputValidator.validateNotNull("store", store);

   this.store = function()
   {
      return store;
   };
}

QuestTask.prototype.doIt = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   // 1. Commit characters to quest.
   var store = this.store();

   store.dispatch(Action.enqueuePhase(Phase.QUEST_COMMIT_CHARACTERS_START));
   var environment = store.getState().environment;

   var queue = environment.agentQueue();
   var queueCallback2 = this.setQuesters.bind(this);
   var elementFunction = function(agent, queueCallback)
   {
      store.dispatch(Action.setActiveAgent(agent));
      var environment = store.getState().environment;
      var questInstance = environment.activeQuest();
      var characters = agent.questers();
      var taskCallback = function(questers)
      {
         queueCallback2(questers, queueCallback);
      };

      agent.chooseQuesters(questInstance, characters, taskCallback);
   };
   var resolveQuest = this.resolveQuest.bind(this);
   var finishFunction = function(finishCallback)
   {
      store.dispatch(Action.setActiveAgent(undefined));
      store.dispatch(Action.enqueuePhase(Phase.QUEST_COMMIT_CHARACTERS_END));
      resolveQuest(finishCallback);
   };
   var delay = store.getState().delay;

   var queueProcessor = new QueueProcessor(queue, callback, elementFunction, finishFunction, delay);
   queueProcessor.processQueue();
};

QuestTask.prototype.setQuesters = function(questers, callback)
{
   InputValidator.validateNotNull("callback", callback);

   if (questers && questers.length > 0)
   {
      var store = this.store();

      questers.forEach(function(cardInstance)
      {
         store.dispatch(CardAction.setReady(cardInstance, false));
         store.dispatch(CardAction.setQuesting(cardInstance, true));
      });
   }

   callback();
};

QuestTask.prototype.resolveQuest = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   // 2. Staging: encounter deck reveals one card per player.
   var store = this.store();
   var environment = store.getState().environment;
   var agents = environment.agentQueue();

   agents.forEach(function()
   {
      var beforeSize = environment.stagingArea().length;
      if (store.getState().encounterDeck.length === 0)
      {
         store.dispatch(Action.refillEncounterDeck());
      }
      store.dispatch(Action.drawEncounterCard());
      var afterSize = environment.stagingArea().length;
      if (afterSize > beforeSize)
      {
         store.dispatch(Action.enqueueEvent(GameEvent.CARD_PLAYED,
         {
            cardInstance: environment.stagingArea()[environment.stagingArea().length - 1],
         }));
      }
   });

   // 3. Quest resolution.
   var questers = environment.questers();

   var questerWillpower = questers.reduce(function(accumulator, cardInstance)
   {
      return accumulator + cardInstance.willpower();
   }, 0);

   LOGGER.debug("questerWillpower = " + questerWillpower);

   var stagingCards = environment.stagingArea();

   var stagingThreat = stagingCards.reduce(function(accumulator, cardInstance)
   {
      if (isNaN(cardInstance.card().threat))
      {
         return accumulator;
      }
      else
      {
         return accumulator + cardInstance.card().threat;
      }
   }, 0);

   LOGGER.debug("stagingThreat = " + stagingThreat);

   if (questerWillpower > stagingThreat)
   {
      // Successful quest.
      var progress = questerWillpower - stagingThreat;
      LOGGER.info("Quest succeeded. progress = " + progress);
      store.dispatch(Action.setUserMessage("Quest succeeded. progress: " + progress));
      var activeLocation = environment.activeLocation();
      var neededProgress;

      if (activeLocation !== undefined)
      {
         neededProgress = activeLocation.card().questPoints - activeLocation.progress();
         var myProgress = Math.min(neededProgress, progress);
         LOGGER.debug("applying " + myProgress + " progress to " + activeLocation);
         store.dispatch(CardAction.addProgress(activeLocation, myProgress));
         neededProgress = activeLocation.card().questPoints - activeLocation.progress();
         if (neededProgress === 0)
         {
            store.dispatch(Action.discardActiveLocation());
         }
         progress -= myProgress;
      }

      LOGGER.info("1 progress = " + progress);

      if (progress > 0)
      {
         var activeQuest = environment.activeQuest();
         LOGGER.debug("applying " + progress + " to " + activeQuest);
         store.dispatch(CardAction.addProgress(activeQuest, progress));
         neededProgress = activeQuest.card().questPoints - activeQuest.progress();
         var finishQuestPhase = this.finishQuestPhase.bind(this);
         var myCallback = function()
         {
            finishQuestPhase(callback);
         };

         if (neededProgress <= 0)
         {
            environment.advanceTheQuest(myCallback);
            return;
         }
      }
   }
   else if (stagingThreat > questerWillpower)
   {
      // Unsuccessful quest.
      var threat = stagingThreat - questerWillpower;
      LOGGER.info("Quest failed. threat = " + threat);
      store.dispatch(Action.setUserMessage("Quest failed. threat: " + threat));

      agents.forEach(function(agent)
      {
         agent.addThreat(threat);
      });
   }
   else
   {
      LOGGER.info("Quest tied: no progress, no threat.");
      store.dispatch(Action.setUserMessage("Quest tied: no progress, no threat."));
   }
   //
   //  // 4. Cleanup.
   //  questers.forEach(function(cardInstance)
   //  {
   //     store.dispatch(CardAction.setQuesting(cardInstance, false));
   //  });
   //
   //  callback();

   this.finishQuestPhase(callback);
};

QuestTask.prototype.finishQuestPhase = function(callback)
{
   var store = this.store();
   var environment = store.getState().environment;
   var questers = environment.questers();

   // 4. Cleanup.
   questers.forEach(function(cardInstance)
   {
      store.dispatch(CardAction.setQuesting(cardInstance, false));
   });

   callback();
};

export default QuestTask;