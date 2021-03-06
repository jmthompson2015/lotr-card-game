import InputValidator from "../../common/js/InputValidator.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import Action from "./Action.js";
import AgentAction from "./AgentAction.js";
import CardAction from "./CardAction.js";
import QueueProcessor from "./QueueProcessor.js";

function PlanningTask(store)
{
   InputValidator.validateNotNull("store", store);

   this.store = function()
   {
      return store;
   };
}

PlanningTask.prototype.doIt = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   var store = this.store();
   var environment = store.getState().environment;

   var queue = environment.agentQueue();
   var processAgent = this.processAgent.bind(this);
   var elementFunction = function(agent, queueCallback)
   {
      store.dispatch(Action.setActiveAgent(agent));
      processAgent(agent, queueCallback);
   };
   var finishPlanningPhase = this.finishPlanningPhase.bind(this);
   var finishFunction = function(finishCallback)
   {
      store.dispatch(Action.setActiveAgent(undefined));
      finishPlanningPhase(finishCallback);
   };
   var delay = store.getState().delay;

   var queueProcessor = new QueueProcessor(queue, callback, elementFunction, finishFunction, delay);
   queueProcessor.processQueue();
};

PlanningTask.prototype.processAgent = function(agent, callback)
{
   InputValidator.validateNotNull("callback", callback);

   var hand = agent.hand();
   var resourceMap = agent.resourceMap();

   var possibleCards = hand.reduce(function(accumulator, cardInstance)
   {
      var sphereKey = cardInstance.card().sphereKey;
      var cost = cardInstance.card().cost;
      var available = (resourceMap[sphereKey] !== undefined ? resourceMap[sphereKey] : 0);

      if (cost <= available)
      {
         accumulator.push(cardInstance);
      }

      return accumulator;
   }, []);

   if (possibleCards.length > 0)
   {
      var queueCallback = this.finishProcessAgent.bind(this);
      var agentCallback = function(cardsToPlay)
      {
         queueCallback(agent, cardsToPlay, callback);
      };

      agent.chooseCardToPlay(possibleCards, agentCallback);
   }
   else
   {
      callback();
   }
};

PlanningTask.prototype.finishProcessAgent = function(agent, cardInstance, callback)
{
   InputValidator.validateNotNull("callback", callback);

   if (cardInstance !== undefined)
   {
      // Pay for the card.
      var store = this.store();
      var cost = cardInstance.card().cost;
      var sphereKey = cardInstance.card().sphereKey;
      var heroes = agent.tableauHeroes(undefined, sphereKey);

      while (cost > 0)
      {
         for (var i = 0; i < heroes.length; i++)
         {
            var myCardInstance = heroes[i];

            if (cost > 0 && myCardInstance.resources() > 0)
            {
               store.dispatch(CardAction.addResources(myCardInstance, -1));
               cost--;
            }
         }
      }

      // Play the card.
      store.dispatch(AgentAction.playCard(agent, cardInstance));
      var processAgent = this.processAgent.bind(this);
      var myCallback = function()
      {
         processAgent(agent, callback);
      };
      store.dispatch(Action.enqueueEvent(GameEvent.CARD_PLAYED,
      {
         agent: agent,
         cardInstance: cardInstance,
      }, myCallback));
   }
   else
   {
      callback();
   }
};

PlanningTask.prototype.finishPlanningPhase = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   callback();
};

export default PlanningTask;