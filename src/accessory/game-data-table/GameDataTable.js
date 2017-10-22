"use strict";

define(["create-react-class", "react", "artifact/js/AllyCard", "artifact/js/AttachmentCard", "artifact/js/CardSet", "artifact/js/CardSetType",
  "artifact/js/CardSubset", "artifact/js/CardType", "artifact/js/EncounterSet", "artifact/js/EnemyCard", "artifact/js/EventCard",
  "artifact/js/GameHeader", "artifact/js/GameMode", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard",
  "artifact/js/Phase", "artifact/js/QuestCard", "artifact/js/Scenario", "artifact/js/Sphere", "artifact/js/Trait", "artifact/js/TreacheryCard"],
   function(createReactClass, React, AllyCard, AttachmentCard, CardSet, CardSetType, CardSubset, CardType, EncounterSet, EnemyCard,
      EventCard, GameHeader, GameMode, HeroCard, LocationCard, ObjectiveCard, Phase, QuestCard, Scenario, Sphere, Trait, TreacheryCard)
   {
      var GameColumns = [
         {
            key: "item",
            label: "Item",
            className: "textCell tl",
         },
         {
            key: "count",
            label: "Count",
            className: "numberCell tr",
         },
      ];

      var GameDataTable = createReactClass(
      {
         // Factories.
         Table: React.createFactory(Reactable.Table),
         Tr: React.createFactory(Reactable.Tr),
         Td: React.createFactory(Reactable.Td),

         render: function()
         {
            var rows = [];

            rows.push(this.createRow("AllyCard", AllyCard.keys().length, rows.length));
            rows.push(this.createRow("AttachmentCard", AttachmentCard.keys().length, rows.length));
            rows.push(this.createRow("CardSet", CardSet.keys().length, rows.length));
            rows.push(this.createRow("CardSetType", CardSetType.keys().length, rows.length));
            rows.push(this.createRow("CardSubset", CardSubset.keys().length, rows.length));
            rows.push(this.createRow("CardType", CardType.keys().length, rows.length));
            rows.push(this.createRow("EncounterSet", EncounterSet.keys().length, rows.length));
            rows.push(this.createRow("EnemyCard", EnemyCard.keys().length, rows.length));
            rows.push(this.createRow("EventCard", EventCard.keys().length, rows.length));
            rows.push(this.createRow("GameHeader", GameHeader.keys().length, rows.length));
            rows.push(this.createRow("GameMode", GameMode.keys().length, rows.length));
            rows.push(this.createRow("HeroCard", HeroCard.keys().length, rows.length));
            rows.push(this.createRow("LocationCard", LocationCard.keys().length, rows.length));
            rows.push(this.createRow("ObjectiveCard", ObjectiveCard.keys().length, rows.length));
            rows.push(this.createRow("Phase", Phase.keys().length, rows.length));
            rows.push(this.createRow("QuestCard", QuestCard.keys().length, rows.length));
            rows.push(this.createRow("Scenario", Scenario.keys().length, rows.length));
            rows.push(this.createRow("Sphere", Sphere.keys().length, rows.length));
            rows.push(this.createRow("Trait", Trait.keys().length, rows.length));
            rows.push(this.createRow("TreacheryCard", TreacheryCard.keys().length, rows.length));

            return this.Table(
            {
               id: "gameTable",
               className: "bg-white f6",
               columns: GameColumns,
               sortable: true,
            }, rows);
         },

         createCell: function(key, column, value)
         {
            return this.Td(
            {
               key: key,
               className: column.className,
               column: column.key,
            }, (value !== undefined ? value : ""));
         },

         createRow: function(item, count, key)
         {
            var cells = [];
            var j = 0;

            cells.push(this.createCell(cells.length, GameColumns[j++], item));
            cells.push(this.createCell(cells.length, GameColumns[j++], count));

            return this.Tr(
            {
               key: key,
               className: "striped--light-gray",
            }, cells);
         },
      });

      return GameDataTable;
   });
