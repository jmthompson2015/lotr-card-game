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

   if (oldFromDeck.length > 0)
   {
      var oldToDeck = getDeck(state, toName, toId);
      LOGGER.debug("oldToDeck = " + oldToDeck);

      var index = oldFromDeck.indexOf(transferInstanceId);
      LOGGER.debug("index = " + index);

      if (index < 0)
      {
         throw "Can't find transferInstanceId " + transferInstanceId + " in deck " + fromName;
      }

      var newFromDeck = oldFromDeck.slice();
      newFromDeck.splice(index, 1);
      LOGGER.debug("newFromDeck = " + newFromDeck);
      var newToDeck = oldToDeck.slice();
      newToDeck.push(transferInstanceId);
      LOGGER.debug("newToDeck = " + newToDeck);

      var newObject = {};
      if (fromId === undefined)
      {
         newObject[fromName] = newFromDeck;
      }
      else
      {
         newObject[fromName] = Object.assign(
         {}, state[fromName]);
         newObject[fromName][fromId] = newFromDeck;
      }
      // newObject[fromName] = (fromId === undefined ? newFromDeck : Object.assign(
      // {}, state[fromName])[fromId] = newFromDeck);
      if (toId === undefined)
      {
         newObject[toName] = newToDeck;
      }
      else
      {
         newObject[toName] = Object.assign(
         {}, state[toName]);
         newObject[toName][toId] = newToDeck;
      }
      // newObject[toName] = (toId === undefined ? newToDeck : Object.assign(
      // {}, state[toName])[toId] = newToDeck);

      LOGGER.debug("newObject = " + JSON.stringify(newObject));

      return Object.assign(
      {}, state, newObject);
   }

   LOGGER.warn(fromName + "[" + fromId + "] empty");
   return state;
};

function getDeck(state, deckName, id)
{
   var answer;

   if (id === undefined)
   {
      answer = (state[deckName] ? state[deckName] : []);
   }
   else
   {
      answer = (state[deckName][id] ? state[deckName][id] : []);
   }

   return answer;
}

if (Object.freeze)
{
   Object.freeze(TransferReducer);
}

export default TransferReducer;