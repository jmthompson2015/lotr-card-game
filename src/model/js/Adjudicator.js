"use strict";

define(["common/js/InputValidator", "model/js/Action"],
   function(InputValidator, Action)
   {
      function Adjudicator(store)
      {
         InputValidator.validateNotNull("store", store);

         this.store = function()
         {
            return store;
         };

         store.dispatch(Action.setAdjudicator(this));
      }

      Adjudicator.prototype.isGameOver = function()
      {
         var store = this.store();
         var questDeck = store.getState().questDeck;
         var activeQuestId = store.getState().activeQuestId;
         var agents = store.getState().agents;

         return ((questDeck.size === 0 && activeQuestId === undefined) || agents.size === 0);
      };

      return Adjudicator;
   });
