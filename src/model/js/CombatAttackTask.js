import InputValidator from "../../common/js/InputValidator.js";
import Action from "./Action.js";
import CardAction from "./CardAction.js";

function CombatAttackTask(store, agent)
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

CombatAttackTask.prototype.doIt = function(callback)
{
   InputValidator.validateNotNull("callback", callback);

   // 1a. Declare target of attack.
   var agent = this.agent();
   var enemies = agent.engagementArea();
   LOGGER.debug("CombatAttackTask enemies = " + enemies);

   if (enemies.length === 1)
   {
      this.declareAttackers(enemies[0], callback);
   }
   else if (enemies.length > 1)
   {
      var declareAttackersFunction = this.declareAttackers.bind(this);
      var myCallback = function(defender)
      {
         declareAttackersFunction(defender, callback);
      };

      agent.chooseEnemyDefender(enemies, myCallback);
   }
   else
   {
      this.finishCombatAttackTask(callback);
   }
};

CombatAttackTask.prototype.declareAttackers = function(defender, callback)
{
   LOGGER.debug("CombatAttackTask defender = " + defender);

   if (defender)
   {
      // 1b. Declare attackers.
      var agent = this.agent();
      var characters = agent.attackers();
      LOGGER.debug("CombatAttackTask characters = " + characters);

      if (characters.length > 0)
      {
         var determineAttackStrengthFunction = this.determineAttackStrength.bind(this);
         var myCallback = function(attackers)
         {
            determineAttackStrengthFunction(attackers, defender, callback);
         };

         agent.chooseCharacterAttackers(characters, defender, myCallback);
      }
      else
      {
         this.determineAttackStrength([], defender, callback);
      }
   }
   else
   {
      this.finishCombatAttackTask(callback);
   }
};

CombatAttackTask.prototype.determineAttackStrength = function(attackers, defender, callback)
{
   LOGGER.debug("CombatAttackTask attackers = " + attackers);

   if (attackers)
   {
      var store = this.store();

      attackers.forEach(function(cardInstance)
      {
         store.dispatch(CardAction.setReady(cardInstance, false));
      });

      // 2. Determine attack strength.
      var attack = attackers.reduce(function(accumulator, cardInstance, i)
      {
         LOGGER.debug(i + " CombatAttackTask attack = " + cardInstance + " " + cardInstance.attack());
         return accumulator + cardInstance.attack();
      }, 0);
      LOGGER.debug("CombatAttackTask attack = " + attack);

      // 3. Determine combat damage.
      var defense = defender.defense();
      LOGGER.debug("CombatAttackTask defense = " + defense);
      var damage = attack - defense;
      LOGGER.debug("CombatAttackTask damage = " + damage);
      store.dispatch(Action.setUserMessage("Attacker combat damage: " + damage));

      if (damage > 0)
      {
         defender.addWounds(damage);
      }
   }

   this.finishCombatAttackTask(callback);
};

CombatAttackTask.prototype.finishCombatAttackTask = function(callback)
{
   // Discard shadow cards.
   var store = this.store();
   LOGGER.debug("0 cardShadowCards = " + store.getState().cardShadowCards);
   var agent = this.agent();
   var engagementArea = agent.engagementArea();
   engagementArea.forEach(function(cardInstance)
   {
      var shadowCards = cardInstance.shadowCards();

      shadowCards.forEach(function(shadowInstance)
      {
         store.dispatch(Action.discardShadowCard(cardInstance, shadowInstance));
      });
   });
   LOGGER.debug("encounterDiscard = " + store.getState().encounterDiscard);
   LOGGER.debug("1 cardShadowCards = " + store.getState().cardShadowCards);

   callback();
};

export default CombatAttackTask;