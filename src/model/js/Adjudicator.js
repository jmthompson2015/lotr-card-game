import InputValidator from "../../common/js/InputValidator.js";
import AttachmentCard from "../../artifact/js/AttachmentCard.js";
import Action from "./Action.js";

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

   return !cardInstance.hasAttachment(AttachmentCard.FOREST_SNARE);
};

Adjudicator.prototype.isGameOver = function()
{
   var store = this.store();
   var questDeck = store.getState().questDeck;
   var activeQuestId = store.getState().activeQuestId;
   var agents = store.getState().agents;

   return ((questDeck.length === 0 && activeQuestId === undefined) || Object.keys(agents).length === 0);
};

export default Adjudicator;