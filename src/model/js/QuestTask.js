"use strict";

define(["common/js/InputValidator", "artifact/js/Phase", "model/js/Action", "model/js/CardAction"],
   function(InputValidator, Phase, Action, CardAction)
   {
      function QuestTask(store)
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

      QuestTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         // 1. Commit characters to quest.
         var store = this.store();

         store.dispatch(Action.enqueuePhase(Phase.QUEST_COMMIT_CHARACTERS_START));
         var environment = store.getState().environment;
         this.queue(environment.agentQueue());
         this.processQuestQueue(callback);
      };

      QuestTask.prototype.processQuestQueue = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();

         if (this.queue().length === 0)
         {
            store.dispatch(Action.setActiveAgent(undefined));
            store.dispatch(Action.enqueuePhase(Phase.QUEST_COMMIT_CHARACTERS_END));
            this.finishQuestPhase(callback);
            return;
         }

         var agent = this.queue().shift();
         store.dispatch(Action.setActiveAgent(agent));

         var environment = store.getState().environment;
         var questInstance = environment.questDeck().first();
         var characters = agent.questers().toJS();
         var queueCallback = this.setQuesters.bind(this);
         var taskCallback = function(questers)
         {
            queueCallback(questers, callback);
         };

         agent.chooseQuesters(questInstance, characters, taskCallback);
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

         this.processQuestQueue(callback);
      };

      QuestTask.prototype.finishQuestPhase = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         // 2. Staging: encounter deck reveals one card per player.
         var store = this.store();
         var environment = store.getState().environment;
         var agents = environment.agentQueue();

         agents.forEach(function()
         {
            if (store.getState().encounterDeck.size === 0)
            {
               store.dispatch(Action.refillEncounterDeck());
            }
            store.dispatch(Action.drawEncounterCard());
         });

         // 3. Quest resolution.
         var questers = environment.questers();

         var questerWillpower = questers.reduce(function(accumulator, cardInstance)
         {
            return accumulator + cardInstance.card().willpower;
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
               var activeQuest = environment.questDeck().get(0);
               LOGGER.debug("applying " + progress + " to " + activeQuest);
               store.dispatch(CardAction.addProgress(activeQuest, progress));
               neededProgress = activeQuest.card().questPoints - activeQuest.progress();
               if (neededProgress === 0)
               {
                  store.dispatch(Action.discardActiveQuest());
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

         // 4. Cleanup.
         questers.forEach(function(cardInstance)
         {
            store.dispatch(CardAction.setQuesting(cardInstance, false));
         });

         callback();
      };

      return QuestTask;
   });
