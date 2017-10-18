"use strict";

define(["common/js/InputValidator", "artifact/js/Phase", "model/js/Action"],
   function(InputValidator, Phase, Action)
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

         var characters = agent.tableauCharacters().toJS();
         var queueCallback = this.setQuesters.bind(this);
         var taskCallback = function(questers)
         {
            queueCallback(questers, callback);
         };
         agent.chooseQuesters(characters, taskCallback);
      };

      QuestTask.prototype.setQuesters = function(questers, callback)
      {
         InputValidator.validateNotNull("callback", callback);

         if (questers && questers.length > 0)
         {
            var store = this.store();
            questers.forEach(function(cardInstance)
            {
               store.dispatch(Action.setCardQuesting(cardInstance, true));
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
            store.dispatch(Action.drawEncounterCard());
         });

         // 3. Quest resolution.
         var questers = environment.questers();

         var questerWillpower = questers.reduce(function(accumulator, cardInstance)
         {
            return accumulator + cardInstance.card().willpower;
         }, 0);

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

         if (questerWillpower > stagingThreat)
         {
            // Successful quest.
            LOGGER.info("Quest succeeded.");
            var progress = questerWillpower - stagingThreat;
            var activeLocation = environment.activeLocation();
            if (activeLocation)
            {
               store.dispatch(Action.addCardProgress(activeLocation, progress));
            }
            else
            {
               var activeQuest = environment.questDeck().get(0);
               store.dispatch(Action.addCardProgress(activeQuest, progress));
            }
         }
         else if (stagingThreat > questerWillpower)
         {
            // Unsuccessful quest.
            LOGGER.info("Quest failed.");
            var threat = stagingThreat - questerWillpower;
            agents.forEach(function(agent)
            {
               store.dispatch(Action.addAgentThreat(agent, threat));
            });
         }

         // 4. Cleanup.
         questers.forEach(function(cardInstance)
         {
            store.dispatch(Action.setCardQuesting(cardInstance, false));
         });

         callback();
      };

      return QuestTask;
   });
