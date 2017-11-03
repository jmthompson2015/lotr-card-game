"use strict";

define(["common/js/InputValidator", "artifact/js/Phase",
  "model/js/Ability", "model/js/Action", "model/js/LocationAbility", "model/js/ObjectiveAbility", "model/js/Observer", "model/js/QuestAbility"],
   function(InputValidator, Phase, Ability, Action, LocationAbility, ObjectiveAbility, Observer, QuestAbility)
   {
      function PhaseObserver(store)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
         };
      }

      //////////////////////////////////////////////////////////////////////////
      // Creation methods.

      PhaseObserver.observeStore = function(store)
      {
         var observer = new PhaseObserver(store);

         var select = function(state)
         {
            return state.phaseQueue;
         };

         Observer.observeStore(store, select, observer.onChange.bind(observer));

         return observer;
      };

      //////////////////////////////////////////////////////////////////////////
      // Behavior methods.

      PhaseObserver.prototype.onChange = function(phaseQueue)
      {
         if (phaseQueue.size > 0)
         {
            var store = this.store();
            store.dispatch(Action.dequeuePhase());
            var phaseData = store.getState().phaseData;

            LOGGER.debug("phaseData = " + JSON.stringify(phaseData));

            if (phaseData !== undefined)
            {
               this.chooseAbility(phaseData);
            }
         }
      };

      PhaseObserver.prototype.chooseAbility = function(phaseData)
      {
         InputValidator.validateNotNull("phaseData", phaseData);

         var phaseKey = phaseData.get("phaseKey");
         var phaseContext = phaseData.get("phaseContext");
         var store = this.store();
         var environment = store.getState().environment;
         var abilityObjects = [LocationAbility, ObjectiveAbility, QuestAbility];
         var abilityObjectCount = abilityObjects.length;
         var ability;

         for (var i = 0; i < abilityObjectCount && ability === undefined; i++)
         {
            var abilityObject = abilityObjects[i];

            if (abilityObject[phaseKey])
            {
               var cardInstances = environment.cardsInPlay();
               var cardCount = cardInstances.length;

               for (var j = 0; j < cardCount; j++)
               {
                  var cardInstance = cardInstances[j];
                  var card = cardInstance.card();

                  if (abilityObject[phaseKey][card.key])
                  {
                     ability = new Ability(card.lotrType, card.key, abilityObject, phaseKey, phaseContext);
                     break;
                  }
               }
            }
         }

         if (ability && ability.conditionPasses(store))
         {
            var isAccepted = true;
            var that = this;
            var backFunction = function()
            {
               that.chooseAbility(phaseData);
            };
            var forwardFunction = function()
            {
               that.finishOnChange(phaseData);
            };

            this.finish(phaseData, ability, isAccepted, backFunction, forwardFunction);
         }
         else
         {
            this.finishOnChange(phaseData);
         }
      };

      PhaseObserver.prototype.finish = function(phaseData, ability, isAccepted, backFunction, forwardFunction)
      {
         InputValidator.validateNotNull("phaseData", phaseData);
         // ability optional.
         // isAccepted optional.
         InputValidator.validateNotNull("backFunction", backFunction);
         InputValidator.validateNotNull("forwardFunction", forwardFunction);

         if (ability !== undefined && isAccepted === true)
         {
            var store = this.store();
            var message = ability.sourceObject().name + " ability used.";
            LOGGER.info(message);
            store.dispatch(Action.setUserMessage(message));

            ability.executeConsequent(store, backFunction);
         }
         else
         {
            forwardFunction();
         }
      };

      PhaseObserver.prototype.finishOnChange = function(phaseData)
      {
         InputValidator.validateNotNull("phaseData", phaseData);

         var store = this.store();
         store.dispatch(Action.clearPhase());

         var callback = phaseData.get("phaseCallback");

         if (callback !== undefined)
         {
            callback(phaseData);
         }
      };

      if (Object.freeze)
      {
         Object.freeze(PhaseObserver);
      }

      return PhaseObserver;
   });
