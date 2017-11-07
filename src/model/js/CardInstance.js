"use strict";

define(["immutable", "common/js/InputValidator", "artifact/js/CardResolver", "artifact/js/CardType", "artifact/js/GameEvent", "artifact/js/LocationCard", "model/js/Action", "model/js/AgentAction", "model/js/CardAction"],
   function(Immutable, InputValidator, CardResolver, CardType, GameEvent, LocationCard, Action, AgentAction, CardAction)
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
            store.dispatch(CardAction.incrementNextCardId());
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

      CardInstance.prototype.hasTrait = function(traitKey)
      {
         InputValidator.validateIsString("traitKey", traitKey);

         var traitKeys = this.card().traitKeys;

         return traitKeys !== undefined && traitKeys.includes(traitKey);
      };

      CardInstance.prototype.isEncounterType = function()
      {
         return CardType.isEncounterType(this.card().cardTypeKey);
      };

      CardInstance.prototype.isExhausted = function()
      {
         return !this.isReady();
      };

      CardInstance.prototype.isFaceUp = function()
      {
         var store = this.store();
         var answer = store.getState().cardIsFaceUp.get(this.id());

         return (answer !== undefined ? answer : true);
      };

      CardInstance.prototype.isPlayerType = function()
      {
         return CardType.isPlayerType(this.card().cardTypeKey);
      };

      CardInstance.prototype.isQuestType = function()
      {
         return CardType.isQuestType(this.card().cardTypeKey);
      };

      CardInstance.prototype.isReady = function()
      {
         var store = this.store();
         var answer = store.getState().cardIsReady.get(this.id());

         return (answer !== undefined ? answer : true);
      };

      CardInstance.prototype.isUsed = function()
      {
         var store = this.store();
         var answer = store.getState().cardIsUsed.get(this.id());

         return (answer !== undefined ? answer : false);
      };

      CardInstance.prototype.progress = function()
      {
         var store = this.store();
         var answer = store.getState().cardProgress.get(this.id());

         return (answer !== undefined ? answer : 0);
      };

      CardInstance.prototype.remainingHitPoints = function()
      {
         var card = this.card();
         var hitPoints = (card.hitPoints !== undefined ? card.hitPoints : 0);
         var wounds = this.wounds();

         return (hitPoints - wounds);
      };

      CardInstance.prototype.resourceMap = function()
      {
         var store = this.store();
         var answer = store.getState().cardResources.get(this.id());

         return (answer !== undefined ? answer : Immutable.Map());
      };

      CardInstance.prototype.shadowCards = function()
      {
         var store = this.store();
         var ids = store.getState().cardShadowCards.get(this.id());

         return CardInstance.idsToCardInstances(store, ids);
      };

      CardInstance.prototype.threat = function()
      {
         var store = this.store();
         var environment = store.getState().environment;
         var card = this.card();
         var answer;

         switch (card.key)
         {
            case LocationCard.AMON_HEN:
            case LocationCard.AMON_LHAW:
               answer = 2 * environment.agents().size;
               break;
            case LocationCard.RHOSGOBEL:
               answer = environment.agents().size;
               break;
            case LocationCard.THE_OLD_FORD:
               answer = environment.cardsInPlay().filter(function(cardInstance)
               {
                  return cardInstance.card().cardTypeKey === CardType.ALLY;
               }).length;
               break;
            default:
               answer = (card.threat !== undefined ? card.threat : 0);
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

      CardInstance.prototype.addWounds = function(woundCount, callback)
      {
         InputValidator.validateIsNumber("woundCount", woundCount);
         // callback optional.

         var store = this.store();
         store.dispatch(CardAction.addWounds(this, woundCount));

         if (this.remainingHitPoints() <= 0)
         {
            var message = this.card().cardType.name + " " + this.card().name + " killed.";
            LOGGER.info(message);
            store.dispatch(Action.setUserMessage(message));
            var environment = store.getState().environment;
            var agent = environment.agentWhoControls(this);
            this.prepareForDiscard(agent);

            if (this.isEncounterType())
            {
               store.dispatch(Action.agentDiscardEnemyCard(agent, this));
            }
            else if (this.isPlayerType())
            {
               store.dispatch(AgentAction.discardFromTableau(agent, this));
            }
         }

         store.dispatch(Action.enqueueEvent(GameEvent.WOUNDED,
         {
            cardInstance: this,
            woundCount: woundCount,
         }, callback));
      };

      CardInstance.prototype.prepareForDiscard = function(agent)
      {
         var store = this.store();

         var attachments = this.attachments();

         attachments.forEach(function(attachmentInstance)
         {
            store.dispatch(AgentAction.discardAttachmentCard(agent, this, attachmentInstance));
         }, this);

         var shadowCards = this.shadowCards();

         shadowCards.forEach(function(shadowInstance)
         {
            store.dispatch(Action.discardShadowCard(this, shadowInstance));
         }, this);

         store.dispatch(CardAction.deleteFaceUp(this));
         store.dispatch(CardAction.deleteProgress(this));
         store.dispatch(CardAction.deleteQuesting(this));
         store.dispatch(CardAction.deleteReady(this));
         store.dispatch(CardAction.deleteResources(this, Immutable.Map()));
         store.dispatch(CardAction.deleteWounds(this));
      };

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

         store.dispatch(Action.addCardInstance(id, values));
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
