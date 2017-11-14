"use strict";

define(["immutable", "common/js/InputValidator", "artifact/js/CardType", "artifact/js/Sphere",
  "model/js/Action", "model/js/AgentAction", "model/js/CardAction", "model/js/CardInstance", "model/js/SimpleAgentStrategy"],
   function(Immutable, InputValidator, CardType, Sphere, Action, AgentAction, CardAction, CardInstance, SimpleAgentStrategy)
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
            store.dispatch(AgentAction.incrementNextAgentId());
         }

         this.id = function()
         {
            return id;
         };

         var strategy = (strategyIn !== undefined ? strategyIn : SimpleAgentStrategy);

         this._strategy = function()
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

      Agent.prototype.attackers = function()
      {
         var isReady = true;
         var characters = this.tableauCharacters(isReady);

         return characters.sort(function(a, b)
         {
            return b.attack() - a.attack();
         });
      };

      Agent.prototype.defenders = function()
      {
         var isReady = true;
         var characters = this.tableauCharacters(isReady);

         return characters.sort(function(a, b)
         {
            return b.defense() - a.defense();
         });
      };

      Agent.prototype.engagementArea = function()
      {
         var store = this.store();
         var ids = store.getState().agentEngagementArea.get(this.id());

         return CardInstance.idsToCardInstances(store, ids);
      };

      Agent.prototype.hand = function(cardTypeKey, sphereKey, maxCost)
      {
         var store = this.store();
         var ids = store.getState().agentHand.get(this.id());

         var answer = CardInstance.idsToCardInstances(store, ids);

         if (cardTypeKey !== undefined)
         {
            answer = answer.filter(function(cardInstance)
            {
               return cardInstance.card().cardTypeKey === cardTypeKey;
            });
         }

         if (sphereKey !== undefined)
         {
            answer = answer.filter(function(cardInstance)
            {
               return cardInstance.card().sphereKey === sphereKey;
            });
         }

         if (maxCost !== undefined)
         {
            answer = answer.filter(function(cardInstance)
            {
               return cardInstance.card().cost <= maxCost;
            });
         }

         return answer;
      };

      Agent.prototype.playerDeck = function(cardTypeKey)
      {
         var store = this.store();
         var ids = store.getState().agentPlayerDeck.get(this.id());

         var answer = CardInstance.idsToCardInstances(store, ids);

         if (cardTypeKey !== undefined)
         {
            answer = answer.filter(function(cardInstance)
            {
               return cardInstance.card().cardTypeKey === cardTypeKey;
            });
         }

         return answer;
      };

      Agent.prototype.questers = function()
      {
         var isReady = true;
         var characters = this.tableauCharacters(isReady);

         return characters.sort(function(a, b)
         {
            return b.willpower() - a.willpower();
         });
      };

      Agent.prototype.resourceMap = function()
      {
         var heroes = this.tableauHeroes();

         var answer = Sphere.keys().reduce(function(accumulator, sphereKey)
         {
            var value = heroes.reduce(function(accumulator2, cardInstance)
            {
               var resources = 0;
               var sphereKeys = cardInstance.sphereKeys();
               if (sphereKeys.includes(sphereKey))
               {
                  resources = cardInstance.resources();
               }
               return accumulator2 + resources;
            }, 0);

            accumulator[sphereKey] = value;

            return accumulator;
         },
         {});

         return Immutable.Map(answer);
      };

      Agent.prototype.tableau = function(cardTypeKey, isReady, sphereKey)
      {
         var store = this.store();
         var ids = store.getState().agentTableau.get(this.id());

         var answer = CardInstance.idsToCardInstances(store, ids);

         if (cardTypeKey !== undefined)
         {
            answer = answer.filter(function(cardInstance)
            {
               return cardInstance.card().cardTypeKey === cardTypeKey;
            });
         }

         if (isReady !== undefined)
         {
            answer = answer.filter(function(cardInstance)
            {
               return cardInstance.isReady() === isReady;
            });
         }

         if (sphereKey !== undefined)
         {
            answer = answer.filter(function(cardInstance)
            {
               return cardInstance.sphereKeys().includes(sphereKey);
            });
         }

         return answer;
      };

      Agent.prototype.tableauAllies = function(isReady, sphereKey)
      {
         return this.tableau(CardType.ALLY, isReady, sphereKey);
      };

      Agent.prototype.tableauCharacters = function(isReady, sphereKey)
      {
         var heroes = this.tableauHeroes(isReady, sphereKey);
         var allies = this.tableauAllies(isReady, sphereKey);

         return heroes.concat(allies);
      };

      Agent.prototype.tableauHeroes = function(isReady, sphereKey)
      {
         return this.tableau(CardType.HERO, isReady, sphereKey);
      };

      Agent.prototype.threatLevel = function()
      {
         var store = this.store();
         var answer = store.getState().agentThreat.get(this.id());

         return (answer !== undefined ? answer : 0);
      };

      Agent.prototype.toString = function()
      {
         return "Agent " + this.id() + " " + this.name() + " " + this._strategy().shortName;
      };

      //////////////////////////////////////////////////////////////////////////
      // Behavior methods.

      Agent.prototype.chooseCardToPlay = function(possibleCards, callback)
      {
         this._strategy().chooseCardToPlay(this, possibleCards, callback);
      };

      Agent.prototype.chooseCharacterAttackers = function(characters, defender, callback)
      {
         this._strategy().chooseCharacterAttackers(this, characters, defender, callback);
      };

      Agent.prototype.chooseCharacterDefender = function(attacker, characters, callback)
      {
         return this._strategy().chooseCharacterDefender(this, attacker, characters, callback);
      };

      Agent.prototype.chooseCharacterForAttachment = function(attachmentInstance, characters, callback)
      {
         return this._strategy().chooseCharacterForAttachment(this, attachmentInstance, characters, callback);
      };

      Agent.prototype.chooseEnemyDefender = function(enemies, callback)
      {
         return this._strategy().chooseEnemyDefender(this, enemies, callback);
      };

      Agent.prototype.chooseEngagedEnemyForAttachment = function(attachmentInstance, enemies, callback)
      {
         return this._strategy().chooseEngagedEnemyForAttachment(this, attachmentInstance, enemies, callback);
      };

      Agent.prototype.chooseHeroForAttachment = function(attachmentInstance, heroes, callback)
      {
         return this._strategy().chooseHeroForAttachment(this, attachmentInstance, heroes, callback);
      };

      Agent.prototype.chooseLocation = function(locations, callback)
      {
         return this._strategy().chooseLocation(this, locations, callback);
      };

      Agent.prototype.chooseQuesters = function(questInstance, characters, callback)
      {
         return this._strategy().chooseQuesters(this, questInstance, characters, callback);
      };

      Agent.prototype.chooseOptionalEngagementEnemy = function(enemies, callback)
      {
         return this._strategy().chooseOptionalEngagementEnemy(this, enemies, callback);
      };

      Agent.prototype.chooseUndefendedAttackHero = function(attacker, heroes, callback)
      {
         return this._strategy().chooseUndefendedAttackHero(this, attacker, heroes, callback);
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      Agent.prototype.addCardWounds = function(cardInstance, damage, callback)
      {
         cardInstance.addWounds(damage, callback);

         if (this.tableauHeroes().size === 0)
         {
            // I'm dead.
            LOGGER.warn("Agent " + this.name() + " has no heroes: he's dead.");
            var store = this.store();
            store.dispatch(Action.setUserMessage("Agent " + this.name() + " has no heroes: he's dead."));
            this.processAgentDeath();
         }

         if (callback)
         {
            callback();
         }
      };

      Agent.prototype.addThreat = function(value)
      {
         var store = this.store();
         store.dispatch(AgentAction.addThreat(this, value));

         if (this.threatLevel() >= 50)
         {
            // I'm dead.
            LOGGER.warn("Agent " + this.name() + " has threat " + this.threatLevel() + ": he's dead.");
            store.dispatch(Action.setUserMessage("Agent " + this.name() + " has threat " + this.threatLevel() + ": he's dead."));
            this.processAgentDeath();
         }
      };

      Agent.prototype.drawPlayerCard = function(cardKey)
      {
         InputValidator.validateIsString("cardKey", cardKey);

         var store = this.store();
         var playerDeck = this.playerDeck();
         var cardKeys = CardInstance.cardInstancesToKeys(playerDeck);
         var index = cardKeys.indexOf(cardKey);

         if (index >= 0)
         {
            store.dispatch(AgentAction.drawPlayerCard(this, index));
         }
      };

      Agent.prototype.processAgentDeath = function()
      {
         // See core rules p. 22 Player Elimination.
         // Discard hand.
         var store = this.store();
         var hand = this.hand();
         hand.forEach(function(cardInstance)
         {
            store.dispatch(AgentAction.discardFromHand(this, cardInstance));
         }, this);

         // Discard tableau cards.
         var tableau = this.tableau();
         tableau.forEach(function(cardInstance)
         {
            cardInstance.prepareForDiscard(this);
            store.dispatch(AgentAction.discardFromTableau(this, cardInstance));
         }, this);

         // Discard player deck.
         var playerDeck = this.playerDeck();
         playerDeck.forEach(function(cardInstance)
         {
            store.dispatch(AgentAction.discardFromPlayerDeck(this, cardInstance));
         }, this);

         // Return engagement cards to staging area with wounds.
         var engagementArea = this.engagementArea();
         engagementArea.forEach(function(cardInstance)
         {
            store.dispatch(Action.agentEngagementToStaging(this, cardInstance));
            store.dispatch(CardAction.setReady(cardInstance, true));
         }, this);

         // Remove agent.
         store.dispatch(Action.deleteAgent(this));
      };

      Agent.prototype._save = function()
      {
         var store = this.store();
         var id = this.id();
         var values = Immutable.Map(
         {
            id: id,
            name: this.name(),
            strategy: this._strategy(),
         });

         store.dispatch(Action.addAgent(id, values));
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
