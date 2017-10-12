"use strict";

define(["common/js/InputValidator", "artifact/js/CardResolver", "model/js/Action"],
   function(InputValidator, CardResolver, Action)
   {
      function CardInstance(store, card, idIn, isNewIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("card", card);
         // idIn optional. default: determined from store

         var id = idIn;

         if (isNaN(id))
         {
            id = store.getState().nextCardId;
            store.dispatch(Action.incrementNextCardId());
         }

         this.store = function()
         {
            return store;
         };

         this.id = function()
         {
            return id;
         };

         this.card = function()
         {
            return card;
         };

         var isNew = (isNewIn !== undefined ? isNewIn : true);

         if (isNew)
         {
            this._save();
         }
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      CardInstance.prototype.toString = function()
      {
         return "CardInstance " + this.id() + " " + this.card().name;
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      CardInstance.prototype._save = function()
      {
         var store = this.store();
         var id = this.id();
         var card = this.card();

         store.dispatch(Action.setCardInstance(id, card));
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      CardInstance.get = function(store, id)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("id", id);

         var values = store.getState().cardInstances.get(id);
         var answer;

         if (values !== undefined)
         {
            var cardTypeKey = values.get("cardTypeKey");
            var cardKey = values.get("cardKey");
            var card = CardResolver.get(cardTypeKey, cardKey);
            var isNew = false;

            answer = new CardInstance(store, card, id, isNew);
         }

         return answer;
      };

      return CardInstance;
   });
