"use strict";

define(["create-react-class", "prop-types", "react", "view/js/SingleCardChooser"],
   function(createReactClass, PropTypes, React, SingleCardChooser)
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
               comparator: CardComparator,
               hasButtons: false,
               labelFunction: labelFunction,
               message: message,
            });
         },
      });

      var CardComparator = function(a, b)
      {
         var answer = compare(b.remainingHitPoints(), a.remainingHitPoints()); // descending

         if (answer === 0)
         {
            answer = compare(a.card().name, b.card().name);
         }

         return answer;
      };

      function compare(a, b)
      {
         return (a === b ? 0 : (a > b ? 1 : -1));
      }

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
