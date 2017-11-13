"use strict";

define(["create-react-class", "prop-types", "react", "view/js/SingleCardChooser"],
   function(createReactClass, PropTypes, React, SingleCardChooser)
   {
      var CharacterDefenderChooser = createReactClass(
      {
         render: function()
         {
            var attackerInstance = this.props.attackerInstance;
            var message = "Attacker: " + attackerInstance.card().name + " (attack " + attackerInstance.attack() + ")";

            return React.createElement(SingleCardChooser,
            {
               cardInstances: this.props.cardInstances,
               onChange: this.props.onChange,
               title: "Select Defender",
               comparator: CardComparator,
               labelFunction: labelFunction,
               message: message,
            });
         },
      });

      var CardComparator = function(a, b)
      {
         var answer = compare(b.defense(), a.defense()); // descending

         if (answer === 0)
         {
            answer = compare(a.attack(), b.attack());
         }

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
         return value.card().name + " (defense " + value.defense() + ")";
      }

      CharacterDefenderChooser.propTypes = {
         attackerInstance: PropTypes.object.isRequired,
         cardInstances: PropTypes.array.isRequired,
         onChange: PropTypes.func.isRequired,
      };

      return CharacterDefenderChooser;
   });
