"use strict";

define(["create-react-class", "prop-types", "react", "view/js/CardComparator", "view/js/SingleCardChooser"],
   function(createReactClass, PropTypes, React, CardComparator, SingleCardChooser)
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
               comparator: CardComparator.DefenseAttackName,
               labelFunction: labelFunction,
               message: message,
            });
         },
      });

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
