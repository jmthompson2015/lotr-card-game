"use strict";

define(["create-react-class", "prop-types", "react", "view/js/CardComparator", "view/js/SingleCardChooser"],
   function(createReactClass, PropTypes, React, CardComparator, SingleCardChooser)
   {
      var EnemyDefenderChooser = createReactClass(
      {
         render: function()
         {
            return React.createElement(SingleCardChooser,
            {
               cardInstances: this.props.cardInstances,
               onChange: this.props.onChange,
               title: "Select Enemy Defender",
               comparator: CardComparator.DefenseName,
               labelFunction: labelFunction,
            });
         },
      });

      function labelFunction(value)
      {
         return value.card().name + " (defense " + value.defense() + ")";
      }

      EnemyDefenderChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
         onChange: PropTypes.func.isRequired,
      };

      return EnemyDefenderChooser;
   });
