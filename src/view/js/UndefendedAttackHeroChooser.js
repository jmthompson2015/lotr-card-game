"use strict";

define(["create-react-class", "prop-types", "react", "view/js/CardComparator", "view/js/SingleCardChooser"],
   function(createReactClass, PropTypes, React, CardComparator, SingleCardChooser)
   {
      var UndefendedAttackHeroChooser = createReactClass(
      {
         render: function()
         {
            var message = "to take undefended damage " + this.props.attack;

            return React.createElement(SingleCardChooser,
            {
               cardInstances: this.props.cardInstances,
               onChange: this.props.onChange,
               title: "Select Hero",
               comparator: CardComparator.HitPointsName,
               hasButtons: false,
               labelFunction: labelFunction,
               message: message,
            });
         },
      });

      function labelFunction(value)
      {
         return value.card().name + " (hit points " + value.remainingHitPoints() + ")";
      }

      UndefendedAttackHeroChooser.propTypes = {
         attack: PropTypes.number.isRequired,
         cardInstances: PropTypes.array.isRequired,
         onChange: PropTypes.func.isRequired,
      };

      return UndefendedAttackHeroChooser;
   });
