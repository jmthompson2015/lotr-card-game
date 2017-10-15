"use strict";

define(["immutable", "common/js/InputValidator", "model/js/Action", "model/js/CardInstance", "model/js/SimpleAgentStrategy"],
   function(Immutable, InputValidator, Action, CardInstance, SimpleAgentStrategy)
   {
      function Agent(store, name, idIn, strategyIn, isNewIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsString("name", name);
         // idIn optional. default: determined from store
         // strategyIn optional. default: SimpleAgentStrategy
         // isNewIn optional. default: true

         this.store = function()
         {
            return store;
         };

         this.name = function()
         {
            return name;
         };

         var id = idIn;

         if (isNaN(id))
         {
            id = store.getState().nextAgentId;
            store.dispatch(Action.incrementNextAgentId());
         }

         this.id = function()
         {
            return id;
         };

         var strategy = (strategyIn !== undefined ? strategyIn : SimpleAgentStrategy);

         this.strategy = function()
         {
            return strategy;
         };

         var isNew = (isNewIn !== undefined ? isNewIn : true);

         if (isNew)
         {
            this._save();
         }
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      Agent.prototype.agentClass = Agent;

      Agent.prototype.engagementArea = function()
      {
         var store = this.store();
         var ids = store.getState().agentEngagementArea.get(this.id());

         return CardInstance.idsToCardInstances(store, ids);
      };

      Agent.prototype.hand = function()
      {
         var store = this.store();
         var ids = store.getState().agentHand.get(this.id());

         return CardInstance.idsToCardInstances(store, ids);
      };

      Agent.prototype.heroDeck = function()
      {
         var store = this.store();
         var ids = store.getState().agentHeroDeck.get(this.id());

         return CardInstance.idsToCardInstances(store, ids);
      };

      Agent.prototype.playerDeck = function()
      {
         var store = this.store();
         var ids = store.getState().agentPlayerDeck.get(this.id());

         return CardInstance.idsToCardInstances(store, ids);
      };

      Agent.prototype.tableau = function()
      {
         var store = this.store();
         var ids = store.getState().agentTableau.get(this.id());

         return CardInstance.idsToCardInstances(store, ids);
      };

      Agent.prototype.threatLevel = function()
      {
         var store = this.store();
         var answer = store.getState().agentThreat.get(this.id());

         return (answer !== undefined ? answer : 0);
      };

      Agent.prototype.toString = function()
      {
         return "Agent " + this.id() + " " + this.name();
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      Agent.prototype._save = function()
      {
         var store = this.store();
         var id = this.id();
         var values = Immutable.Map(
         {
            id: id,
            name: this.name(),
            strategy: this.strategy(),
         });

         store.dispatch(Action.setAgent(id, values));
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      Agent.get = function(store, id)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("id", id);

         var values = store.getState().agents.get(id);
         var answer;

         if (values !== undefined)
         {
            var name = values.get("name");
            var strategy = values.get("strategy");
            var isNew = false;

            answer = new Agent(store, name, id, strategy, isNew);
         }

         return answer;
      };

      return Agent;
   });
