import InputValidator from "../../common/js/InputValidator.js";
import Ability from "./Ability.js";
import Action from "./Action.js";
import AllyAbility from "./AllyAbility.js";
import AttachmentAbility from "./AttachmentAbility.js";
import EventAbility from "./EventAbility.js";
import HeroAbility from "./HeroAbility.js";
import LocationAbility from "./LocationAbility.js";
import ObjectiveAbility from "./ObjectiveAbility.js";
import Observer from "./Observer.js";
import QuestAbility from "./QuestAbility.js";
import ShadowAbility from "./ShadowAbility.js";
import TreacheryAbility from "./TreacheryAbility.js";

function EventObserver(store)
{
   InputValidator.validateNotNull("store", store);

   this.store = function()
   {
      return store;
   };
}

//////////////////////////////////////////////////////////////////////////
// Creation methods.

EventObserver.observeStore = function(store)
{
   var observer = new EventObserver(store);

   var select = function(state)
   {
      return state.eventQueue;
   };

   Observer.observeStore(store, select, observer.onChange.bind(observer));

   return observer;
};

//////////////////////////////////////////////////////////////////////////
// Behavior methods.

EventObserver.prototype.onChange = function(eventQueue)
{
   if (eventQueue.length > 0)
   {
      var store = this.store();
      store.dispatch(Action.dequeueEvent());
      var eventData = store.getState().eventData;

      LOGGER.debug("eventData = " + JSON.stringify(eventData));

      if (eventData !== undefined)
      {
         this.chooseAbility(eventData);
      }
   }
};

EventObserver.prototype.chooseAbility = function(eventData)
{
   InputValidator.validateNotNull("eventData", eventData);

   var eventKey = eventData.eventKey;
   var eventContext = eventData.eventContext;
   var store = this.store();
   var cardInstance = (eventContext ? eventContext.cardInstance : undefined);
   var card = (cardInstance ? cardInstance.card() : undefined);
   var abilityObjectCount = EventObserver.ABILITY_OBJECTS.length;
   var ability;

   if (card)
   {
      for (var i = 0; i < abilityObjectCount && ability === undefined; i++)
      {
         var abilityObject = EventObserver.ABILITY_OBJECTS[i];

         if (abilityObject[eventKey] && abilityObject[eventKey][card.key])
         {
            ability = new Ability(card.lotrType, card.key, abilityObject, eventKey, eventContext);
            break;
         }
      }
   }

   if (ability && ability.conditionPasses(store))
   {
      var isAccepted = true;
      var that = this;
      var backFunction = function()
      {
         that.chooseAbility(eventData);
      };
      var forwardFunction = function()
      {
         that.finishOnChange(eventData);
      };

      this.finish(eventData, ability, isAccepted, backFunction, forwardFunction);
   }
   else
   {
      this.finishOnChange(eventData);
   }
};

EventObserver.prototype.finish = function(eventData, ability, isAccepted, backFunction, forwardFunction)
{
   InputValidator.validateNotNull("eventData", eventData);
   // ability optional.
   // isAccepted optional.
   InputValidator.validateNotNull("backFunction", backFunction);
   InputValidator.validateNotNull("forwardFunction", forwardFunction);

   if (ability !== undefined && isAccepted === true)
   {
      var store = this.store();
      var message = ability.sourceObject().name + " ability used.";
      LOGGER.info(message);
      store.dispatch(Action.setUserMessage(message));

      ability.executeConsequent(store, backFunction);
   }
   else
   {
      forwardFunction();
   }
};

EventObserver.prototype.finishOnChange = function(eventData)
{
   InputValidator.validateNotNull("eventData", eventData);

   var store = this.store();
   store.dispatch(Action.clearEvent());

   var callback = eventData.eventCallback;

   if (callback !== undefined)
   {
      callback(eventData);
   }
};

EventObserver.ABILITY_OBJECTS = [AllyAbility, AttachmentAbility, EventAbility, HeroAbility, LocationAbility,
    ObjectiveAbility, QuestAbility, ShadowAbility, TreacheryAbility
];

if (Object.freeze)
{
   Object.freeze(EventObserver);
}

export default EventObserver;