"use strict";

define(["immutable", "common/js/InputValidator", "model/js/Action"],
   function(Immutable, InputValidator, Action)
   {
      function SimpleAgent(store, name, idIn, isNewIn)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsString("name", name);
         // idIn optional. default: determined from store
         // isNewIn optional. default: true

         var id = idIn;

         if (isNaN(id))
         {
            id = store.getState().nextAgentId;
            store.dispatch(Action.incrementNextAgentId());
         }

         this.store = function()
         {
            return store;
         };

         this.name = function()
         {
            return name;
         };

         this.id = function()
         {
            return id;
         };

         var isNew = (isNewIn !== undefined ? isNewIn : true);

         if (isNew)
         {
            this._save();
         }
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      SimpleAgent.prototype.agentClass = SimpleAgent;

      SimpleAgent.prototype.toString = function()
      {
         return "SimpleAgent " + this.id() + " " + this.name();
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      SimpleAgent.prototype._save = function()
      {
         var store = this.store();
         var id = this.id();
         var values = Immutable.Map(
         {
            id: id,
            name: this.name(),
            agentClass: SimpleAgent,
         });

         store.dispatch(Action.setAgent(id, values));
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      SimpleAgent.get = function(store, id)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateIsNumber("id", id);

         var values = store.getState().agents.get(id);
         var answer;

         if (values !== undefined)
         {
            var name = values.get("name");
            var isNew = false;

            answer = new SimpleAgent(store, name, id, isNew);
         }

         return answer;
      };

      return SimpleAgent;
   });
