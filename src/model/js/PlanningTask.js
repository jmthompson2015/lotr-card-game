"use strict";

define(["immutable", "common/js/InputValidator", "artifact/js/CardType", "model/js/Action", "model/js/AgentAction", "model/js/CardAction"],
   function(Immutable, InputValidator, CardType, Action, AgentAction, CardAction)
   {
      function PlanningTask(store)
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

      PlanningTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         var environment = store.getState().environment;
         this.queue(environment.agentQueue());
         this.processPlanningQueue(callback);
      };

      PlanningTask.prototype.processPlanningQueue = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            this.finishPlanningPhase(callback);
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         this.processAgent(agent, callback);
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
            var available = (resourceMap.get(sphereKey) !== undefined ? resourceMap.get(sphereKey) : 0);

            if (cost <= available)
            {
               accumulator = accumulator.push(cardInstance);
            }

            return accumulator;
         }, Immutable.List());

         if (possibleCards.size > 0)
         {
            var queueCallback = this.finishProcessAgent.bind(this);
            var agentCallback = function(cardsToPlay)
            {
               queueCallback(agent, cardsToPlay, callback);
            };

            agent.chooseCardToPlay(possibleCards.toJS(), agentCallback);
         }
         else
         {
            this.processPlanningQueue(callback);
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
               for (var i = 0; i < heroes.size; i++)
               {
                  var myCardInstance = heroes.get(i);

                  if (cost > 0 && myCardInstance.resourceMap().get(sphereKey) > 0)
                  {
                     store.dispatch(CardAction.addResource(myCardInstance, sphereKey, -1));
                     cost--;
                  }
               }
            }

            // Play the card.
            if (cardInstance.card().cardTypeKey === CardType.ATTACHMENT)
            {
               // FIXME: need target instance from user.
               var targetInstance = agent.tableauHeroes().get(0);
               store.dispatch(AgentAction.playAttachmentCard(agent, targetInstance, cardInstance));
            }
            // else if (cardInstance.card().cardTypeKey === CardType.EVENT)
            // {
            //    // Don't add to tableau.
            // }
            else
            {
               store.dispatch(AgentAction.playCard(agent, cardInstance));
            }

            this.processAgent(agent, callback);
         }
         else
         {
            this.processPlanningQueue(callback);
         }
      };

      PlanningTask.prototype.finishPlanningPhase = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         callback();
      };

      return PlanningTask;
   });
