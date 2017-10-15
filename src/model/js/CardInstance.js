"use strict";

define(["immutable", "common/js/InputValidator", "artifact/js/CardResolver", "model/js/Action"],
   function(Immutable, InputValidator, CardResolver, Action)
   {
      function CardInstance(store, card, idIn, isNewIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("card", card);
         // idIn optional. default: determined from store
         // isNewIn optional. default: true

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

      CardInstance.prototype.isExhausted = function()
      {
         var store = this.store();
         var answer = store.getState().isExhausted.get(this.id());

         return (answer !== undefined ? answer : false);
      };

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
         var values = Immutable.Map(
         {
            id: id,
            cardKey: card.key,
            cardTypeKey: card.cardTypeKey,
         });

         store.dispatch(Action.setCardInstance(id, values));
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      CardInstance.cardInstancesToIds = function(cardInstances)
      {
         InputValidator.validateNotNull("cardInstances", cardInstances);

         return cardInstances.map(function(cardInstance)
         {
            return cardInstance.id();
         });
      };

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

      CardInstance.idsToCardInstances = function(store, ids)
      {
         InputValidator.validateNotNull("store", store);
         // ids optional.

         var answer;

         if (ids !== undefined)
         {
            answer = ids.map(function(id)
            {
               return CardInstance.get(store, id);
            });
         }
         else
         {
            answer = Immutable.List();
         }

         return answer;
      };

      return CardInstance;
   });
