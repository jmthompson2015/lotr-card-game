"use strict";

define(["common/js/InputValidator", "artifact/js/AttachmentCard", "model/js/Action"],
   function(InputValidator, AttachmentCard, Action)
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

      Adjudicator.prototype.canAttack = function(cardInstance)
      {
         InputValidator.validateNotNull("cardInstance", cardInstance);

         var answer = true;
         var attachments = cardInstance.attachments();

         if (attachments.size > 0)
         {
            var attachmentKeys = attachments.map(function(attachmentInstance)
            {
               return attachmentInstance.card().key;
            });

            answer = !attachmentKeys.includes(AttachmentCard.FOREST_SNARE);
         }

         return answer;
      };

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
