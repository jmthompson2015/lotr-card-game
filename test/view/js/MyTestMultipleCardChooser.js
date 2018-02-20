"use strict";

require(["react", "react-dom", "react-dom-factories", "react-redux", "redux", "common/js/Logger", "artifact/js/AllyCard", "artifact/js/AttachmentCard",
        "artifact/js/EnemyCard", "artifact/js/EventCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard",
        "artifact/js/QuestCard", "artifact/js/Sphere", "artifact/js/TreacheryCard", "model/js/Action", "model/js/CardInstance", "model/js/Reducer",
        "view/js/MultipleCardChooser"
      ],
   function(React, ReactDOM, DOM, ReactRedux, Redux, Logger, AllyCard, AttachmentCard, EnemyCard, EventCard, HeroCard, LocationCard, ObjectiveCard,
      QuestCard, Sphere, TreacheryCard, Action, CardInstance, Reducer, MultipleCardChooser)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var store = Redux.createStore(Reducer.root);
      store.dispatch(Action.setResourceBase(resourceBase));
      var quest = new CardInstance(store, QuestCard.properties[QuestCard.PTM1B_FLIES_AND_SPIDERS]);
      var characters = [];
      characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BEORN]));
      characters.push(new CardInstance(store, AllyCard.properties[AllyCard.BIFUR]));
      characters.push(new CardInstance(store, AllyCard.properties[AllyCard.DENETHOR]));
      characters.push(new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]));
      characters.push(new CardInstance(store, HeroCard.properties[HeroCard.GLOIN]));
      characters.push(new CardInstance(store, HeroCard.properties[HeroCard.THEODRED]));

      var element = React.createElement(MultipleCardChooser,
      {
         cardInstances: characters,
         onChange: myOnChange,
         title: "Select Questers",
      });

      ReactDOM.render(element, document.getElementById("panel"));

      function myOnChange(selected, isAccepted)
      {
         LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
      }
   });