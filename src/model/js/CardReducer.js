"use strict";

define(["immutable", "model/js/CardAction"],
   function(Immutable, CardAction)
   {
      var CardReducer = {};

      CardReducer.reduce = function(state, action)
      {
         LOGGER.debug("CardReducer.root() type = " + action.type);

         var cardId;
         var oldAttachments, oldBonus, oldProgress, oldResources, oldWounds;

         switch (action.type)
         {
            case CardAction.ADD_PHASE_BONUS_ATTACK:
               cardId = action.cardInstance.id();
               oldBonus = (state.cardPhaseBonusAttack.get(cardId) !== undefined ? state.cardPhaseBonusAttack.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardPhaseBonusAttack: state.cardPhaseBonusAttack.set(cardId, oldBonus + action.value),
               });
            case CardAction.ADD_PHASE_BONUS_DEFENSE:
               cardId = action.cardInstance.id();
               oldBonus = (state.cardPhaseBonusDefense.get(cardId) !== undefined ? state.cardPhaseBonusDefense.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardPhaseBonusDefense: state.cardPhaseBonusDefense.set(cardId, oldBonus + action.value),
               });
            case CardAction.ADD_PHASE_BONUS_HIT_POINTS:
               cardId = action.cardInstance.id();
               oldBonus = (state.cardPhaseBonusHitPoints.get(cardId) !== undefined ? state.cardPhaseBonusHitPoints.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardPhaseBonusHitPoints: state.cardPhaseBonusHitPoints.set(cardId, oldBonus + action.value),
               });
            case CardAction.ADD_PHASE_BONUS_THREAT:
               cardId = action.cardInstance.id();
               oldBonus = (state.cardPhaseBonusThreat.get(cardId) !== undefined ? state.cardPhaseBonusThreat.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardPhaseBonusThreat: state.cardPhaseBonusThreat.set(cardId, oldBonus + action.value),
               });
            case CardAction.ADD_PHASE_BONUS_WILLPOWER:
               cardId = action.cardInstance.id();
               oldBonus = (state.cardPhaseBonusWillpower.get(cardId) !== undefined ? state.cardPhaseBonusWillpower.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardPhaseBonusWillpower: state.cardPhaseBonusWillpower.set(cardId, oldBonus + action.value),
               });
            case CardAction.ADD_PROGRESS:
               cardId = action.cardInstance.id();
               oldProgress = (state.cardProgress.get(cardId) !== undefined ? state.cardProgress.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardProgress: state.cardProgress.set(cardId, Math.max(oldProgress + action.value, 0)),
               });
            case CardAction.ADD_RESOURCES:
               cardId = action.cardInstance.id();
               oldResources = (state.cardResources.get(cardId) !== undefined ? state.cardResources.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardResources: state.cardResources.set(cardId, Math.max(oldResources + action.value, 0)),
               });
            case CardAction.ADD_ROUND_BONUS_ATTACK:
               cardId = action.cardInstance.id();
               oldBonus = (state.cardRoundBonusAttack.get(cardId) !== undefined ? state.cardRoundBonusAttack.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardRoundBonusAttack: state.cardRoundBonusAttack.set(cardId, oldBonus + action.value),
               });
            case CardAction.ADD_ROUND_BONUS_DEFENSE:
               cardId = action.cardInstance.id();
               oldBonus = (state.cardRoundBonusDefense.get(cardId) !== undefined ? state.cardRoundBonusDefense.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardRoundBonusDefense: state.cardRoundBonusDefense.set(cardId, oldBonus + action.value),
               });
            case CardAction.ADD_ROUND_BONUS_HIT_POINTS:
               cardId = action.cardInstance.id();
               oldBonus = (state.cardRoundBonusHitPoints.get(cardId) !== undefined ? state.cardRoundBonusHitPoints.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardRoundBonusHitPoints: state.cardRoundBonusHitPoints.set(cardId, oldBonus + action.value),
               });
            case CardAction.ADD_ROUND_BONUS_THREAT:
               cardId = action.cardInstance.id();
               oldBonus = (state.cardRoundBonusThreat.get(cardId) !== undefined ? state.cardRoundBonusThreat.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardRoundBonusThreat: state.cardRoundBonusThreat.set(cardId, oldBonus + action.value),
               });
            case CardAction.ADD_ROUND_BONUS_WILLPOWER:
               cardId = action.cardInstance.id();
               oldBonus = (state.cardRoundBonusWillpower.get(cardId) !== undefined ? state.cardRoundBonusWillpower.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardRoundBonusWillpower: state.cardRoundBonusWillpower.set(cardId, oldBonus + action.value),
               });
            case CardAction.ADD_WOUNDS:
               cardId = action.cardInstance.id();
               oldWounds = (state.cardWounds.get(cardId) !== undefined ? state.cardWounds.get(cardId) : 0);
               return Object.assign(
               {}, state,
               {
                  cardWounds: state.cardWounds.set(cardId, Math.max(oldWounds + action.value, 0)),
               });
            case CardAction.ATTACH:
               LOGGER.info("Attach: " + action.attachmentInstance + " to " + action.cardInstance);
               cardId = action.cardInstance.id();
               oldAttachments = (state.cardAttachments.get(cardId) !== undefined ? state.cardAttachments.get(cardId) : Immutable.List());
               return Object.assign(
               {}, state,
               {
                  cardAttachments: state.cardAttachments.set(cardId, oldAttachments.push(action.attachmentInstance.id())),
               });
            case CardAction.CLEAR_PHASE_BONUSES:
               // LOGGER.info("CLEAR_PHASE_BONUSES");
               return Object.assign(
               {}, state,
               {
                  cardPhaseBonusThreat: Immutable.Map(),
                  cardPhaseBonusWillpower: Immutable.Map(),
                  cardPhaseBonusAttack: Immutable.Map(),
                  cardPhaseBonusDefense: Immutable.Map(),
                  cardPhaseBonusHitPoints: Immutable.Map(),
               });
            case CardAction.CLEAR_ROUND_BONUSES:
               // LOGGER.info("CLEAR_ROUND_BONUSES");
               return Object.assign(
               {}, state,
               {
                  cardRoundBonusThreat: Immutable.Map(),
                  cardRoundBonusWillpower: Immutable.Map(),
                  cardRoundBonusAttack: Immutable.Map(),
                  cardRoundBonusDefense: Immutable.Map(),
                  cardRoundBonusHitPoints: Immutable.Map(),
               });
            case CardAction.DELETE_FACE_UP:
               return Object.assign(
               {}, state,
               {
                  cardIsFaceUp: state.cardIsFaceUp.delete(action.cardInstance.id()),
               });
            case CardAction.DELETE_PROGRESS:
               return Object.assign(
               {}, state,
               {
                  cardProgress: state.cardProgress.delete(action.cardInstance.id()),
               });
            case CardAction.DELETE_QUESTING:
               return Object.assign(
               {}, state,
               {
                  cardIsQuesting: state.cardIsQuesting.delete(action.cardInstance.id()),
               });
            case CardAction.DELETE_READY:
               return Object.assign(
               {}, state,
               {
                  cardIsReady: state.cardIsReady.delete(action.cardInstance.id()),
               });
            case CardAction.DELETE_RESOURCES:
               return Object.assign(
               {}, state,
               {
                  cardResources: state.cardResources.delete(action.cardInstance.id()),
               });
            case CardAction.DELETE_WOUNDS:
               return Object.assign(
               {}, state,
               {
                  cardWounds: state.cardWounds.delete(action.cardInstance.id()),
               });
            case CardAction.INCREMENT_NEXT_CARD_ID:
               return Object.assign(
               {}, state,
               {
                  nextCardId: state.nextCardId + 1,
               });
            case CardAction.SET_FACE_UP:
               return Object.assign(
               {}, state,
               {
                  cardIsFaceUp: state.cardIsFaceUp.set(action.cardInstance.id(), action.isFaceUp),
               });
            case CardAction.SET_PROGRESS:
               return Object.assign(
               {}, state,
               {
                  cardProgress: state.cardProgress.set(action.cardInstance.id(), action.value),
               });
            case CardAction.SET_QUESTING:
               return Object.assign(
               {}, state,
               {
                  cardIsQuesting: state.cardIsQuesting.set(action.cardInstance.id(), action.isQuesting),
               });
            case CardAction.SET_READY:
               return Object.assign(
               {}, state,
               {
                  cardIsReady: state.cardIsReady.set(action.cardInstance.id(), action.isReady),
               });
            case CardAction.SET_RESOURCES:
               return Object.assign(
               {}, state,
               {
                  cardResources: state.cardResources.set(action.cardInstance.id(), action.value),
               });
            case CardAction.SET_USED:
               return Object.assign(
               {}, state,
               {
                  cardIsUsed: state.cardIsUsed.set(action.cardInstance.id(), action.isUsed),
               });
            case CardAction.SET_WOUNDS:
               return Object.assign(
               {}, state,
               {
                  cardWounds: state.cardWounds.set(action.cardInstance.id(), action.value),
               });
            default:
               LOGGER.warn("CardReducer.root: Unhandled action type: " + action.type);
               return state;
         }
      };

      if (Object.freeze)
      {
         Object.freeze(CardReducer);
      }

      return CardReducer;
   });
