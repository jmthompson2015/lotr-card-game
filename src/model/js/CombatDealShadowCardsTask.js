"use strict";

define(["common/js/InputValidator", "model/js/Action"],
   function(InputValidator, Action)
   {
      function CombatDealShadowCardsTask(store, agent)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("agent", agent);

         this.store = function()
         {
            return store;
         };

         this.agent = function()
         {
            return agent;
         };
      }

      CombatDealShadowCardsTask.prototype.doIt = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var store = this.store();
         var agent = this.agent();
         var engagementArea = agent.engagementArea();

         if (engagementArea.size > 0)
         {
            engagementArea.forEach(function(cardInstance)
            {
               store.dispatch(Action.dealShadowCard(cardInstance));
            });
         }

         callback();
      };

      return CombatDealShadowCardsTask;
   });
