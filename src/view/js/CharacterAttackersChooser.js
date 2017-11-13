"use strict";

define(["create-react-class", "prop-types", "react", "view/js/MultipleCardChooser"],
   function(createReactClass, PropTypes, React, MultipleCardChooser)
   {
      var CharacterAttackersChooser = createReactClass(
      {
         render: function()
         {
            var defenderInstance = this.props.defenderInstance;
            var remainingPoints = defenderInstance.remainingHitPoints();
            var message = "Defender: " + defenderInstance.card().name + " (hit points " + remainingPoints + ")";

            return React.createElement(MultipleCardChooser,
            {
               cardInstances: this.props.cardInstances,
               onChange: this.props.onChange,
               title: "Select Attackers",
               comparator: CardComparator,
               labelFunction: labelFunction,
               message: message,
            });
         },
      });

      var CardComparator = function(a, b)
      {
         var answer = compare(b.attack(), a.attack()); // descending

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
         return value.card().name + " (attack " + value.attack() + ")";
      }

      CharacterAttackersChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
         defenderInstance: PropTypes.object.isRequired,
         onChange: PropTypes.func.isRequired,
      };

      return CharacterAttackersChooser;
   });
