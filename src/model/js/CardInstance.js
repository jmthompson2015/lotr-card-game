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

      CardInstance.prototype.attachments = function()
      {
         var store = this.store();
         var ids = store.getState().cardAttachments.get(this.id());

         return CardInstance.idsToCardInstances(store, ids);
      };

      CardInstance.prototype.isExhausted = function()
      {
         return !this.isReady();
      };

      CardInstance.prototype.isReady = function()
      {
         var store = this.store();
         var answer = store.getState().cardIsReady.get(this.id());

         return (answer !== undefined ? answer : true);
      };

      CardInstance.prototype.progress = function()
      {
         var store = this.store();
         var answer = store.getState().cardProgress.get(this.id());

         return (answer !== undefined ? answer : 0);
      };

      CardInstance.prototype.resourceMap = function()
      {
         var store = this.store();
         var answer = store.getState().cardResources.get(this.id());

         return (answer !== undefined ? answer : Immutable.Map());
      };

      CardInstance.prototype.shadowCard = function()
      {
         var answer;
         var store = this.store();
         var shadowCardId = store.getState().cardShadowCard.get(this.id());

         if (shadowCardId !== undefined)
         {
            answer = CardInstance.get(store, shadowCardId);
         }

         return answer;
      };

      CardInstance.prototype.toString = function()
      {
         var questString = (this.card().questPoints !== undefined ? " {" + this.card().questPoints + "}" : "");
         var engagementString = (this.card().engagementCost !== undefined ? " (" + this.card().engagementCost + ")" : "");
         var costString = (this.card().cost !== undefined ? " [" + this.card().cost + "]" : "");

         return "CardInstance " + this.id() + " " + this.card().name + questString + engagementString + costString;
      };

      CardInstance.prototype.wounds = function()
      {
         var store = this.store();
         var answer = store.getState().cardWounds.get(this.id());

         return (answer !== undefined ? answer : 0);
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
