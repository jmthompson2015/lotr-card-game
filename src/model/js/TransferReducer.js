import InputValidator from "../../common/js/InputValidator.js";

var TransferReducer = {};

TransferReducer.reduce = function(state, fromName, fromId, transferInstanceId, toName, toId)
{
   InputValidator.validateNotNull("state", state);
   InputValidator.validateIsString("fromName", fromName);
   // fromId optional.
   InputValidator.validateIsNumber("transferInstanceId", transferInstanceId);
   InputValidator.validateIsString("toName", toName);
   // toId optional.

   var oldFromDeck = getDeck(state, fromName, fromId);
   LOGGER.debug("oldFromDeck = " + oldFromDeck);

   if (oldFromDeck.size > 0)
   {
      var oldToDeck = getDeck(state, toName, toId);
      LOGGER.debug("oldToDeck = " + oldToDeck);

      var index = oldFromDeck.indexOf(transferInstanceId);
      LOGGER.debug("index = " + index);

      if (index < 0)
      {
         throw "Can't find transferInstanceId " + transferInstanceId + " in deck " + fromName;
      }

      var newFromDeck = oldFromDeck.delete(index);
      LOGGER.debug("newFromDeck = " + newFromDeck);
      var newToDeck = oldToDeck.push(transferInstanceId);
      LOGGER.debug("newToDeck = " + newToDeck);

      var newObject = {};
      newObject[fromName] = (fromId === undefined ? newFromDeck : state[fromName].set(fromId, newFromDeck));
      newObject[toName] = (toId === undefined ? newToDeck : state[toName].set(toId, newToDeck));

      LOGGER.debug("newObject = " + JSON.stringify(newObject));

      return Object.assign(
      {}, state, newObject);
   }

   LOGGER.warn(fromName + ".get(" + fromId + ") empty");
   return state;
};

function getDeck(state, deckName, id)
{
   var answer;

   if (id === undefined)
   {
      answer = (state[deckName] ? state[deckName] : Immutable.List());
   }
   else
   {
      answer = (state[deckName].get(id) ? state[deckName].get(id) : Immutable.List());
   }

   return answer;
}

if (Object.freeze)
{
   Object.freeze(TransferReducer);
}

export default TransferReducer;