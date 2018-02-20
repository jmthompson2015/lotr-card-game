"use strict";

require(["react", "react-dom", "react-dom-factories", "react-redux", "redux", "common/js/Logger", "artifact/js/HeroCard", "model/js/Action",
        "model/js/CardInstance", "model/js/Reducer", "view/js/UndefendedAttackHeroChooser"
      ],
   function(React, ReactDOM, DOM, ReactRedux, Redux, Logger, HeroCard, Action, CardInstance, Reducer, UndefendedAttackHeroChooser)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";
      var store = Redux.createStore(Reducer.root);
      store.dispatch(Action.setResourceBase(resourceBase));
      var heroes = [];
      heroes.push(new CardInstance(store, HeroCard.properties[HeroCard.ARAGORN_CORE]));
      heroes.push(new CardInstance(store, HeroCard.properties[HeroCard.BALIN]));
      heroes.push(new CardInstance(store, HeroCard.properties[HeroCard.CELEBORN]));

      var element = React.createElement(UndefendedAttackHeroChooser,
      {
         attack: 3,
         cardInstances: heroes,
         onChange: myOnChange,
      });

      ReactDOM.render(element, document.getElementById("panel"));

      function myOnChange(selected, isAccepted)
      {
         LOGGER.info("myOnChange() selected = " + selected + " isAccepted ? " + isAccepted);
      }
   });