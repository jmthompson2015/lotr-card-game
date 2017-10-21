"use strict";

define(["common/js/InputValidator", "artifact/js/CardType", "model/js/Action", "controller/js/HumanAgentStrategy"],
   function(InputValidator, CardType, Action, HumanAgentStrategy)
   {
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
            var locations = environment.stagingArea(CardType.LOCATION).toJS();

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
      };

      TravelTask.prototype.finish = function(location, callback)
      {
         var store = this.store();
         store.dispatch(Action.setActiveLocation(location));

         callback();
      };

      return TravelTask;
   });
