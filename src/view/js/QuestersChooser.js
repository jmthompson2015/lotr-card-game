"use strict";

define(["create-react-class", "prop-types", "react", "view/js/CardComparator", "view/js/MultipleCardChooser"],
   function(createReactClass, PropTypes, React, CardComparator, MultipleCardChooser)
   {
      var QuestersChooser = createReactClass(
      {
         render: function()
         {
            var questInstance = this.props.questInstance;
            var remainingPoints = questInstance.card().questPoints - questInstance.progress();
            var message = "Quest: " + questInstance.card().name + " (points " + remainingPoints + ")";

            return React.createElement(MultipleCardChooser,
            {
               cardInstances: this.props.cardInstances,
               onChange: this.props.onChange,
               title: "Select Questers",
               comparator: CardComparator.WillpowerDefenseAttackName,
               labelFunction: labelFunction,
               message: message,
            });
         },
      });

      function labelFunction(value)
      {
         return value.card().name + " (willpower " + value.willpower() + ")";
      }

      QuestersChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
         onChange: PropTypes.func.isRequired,
         questInstance: PropTypes.object.isRequired,
      };

      return QuestersChooser;
   });
