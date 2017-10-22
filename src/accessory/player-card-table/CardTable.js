"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "react-redux", "artifact/js/CardSet", "artifact/js/CardSubset", "artifact/js/CardType", "artifact/js/Sphere",
  "view/js/Button", "view/js/DataTable", "view/js/ImplementedImage", "view/js/SphereUI",
  "accessory/player-card-table/Action", "accessory/player-card-table/FilterContainer", "accessory/player-card-table/TableColumns"],
   function(createReactClass, PropTypes, React, DOM, ReactRedux, CardSet, CardSubset, CardType, Sphere,
      Button, DataTable, ImplementedImage, SphereUI, Action, FilterContainer, TableColumns)
   {
      function createImageLink(src, href)
      {
         var image = DOM.img(
         {
            className: "imageBlock fr v-mid",
            src: src,
         });

         return DOM.a(
         {
            href: href,
            target: "_blank",
         }, image);
      }

      var PlayerCardTable = createReactClass(
      {
         contextTypes:
         {
            store: PropTypes.object.isRequired,
         },

         propTypes:
         {
            isFilterShown: PropTypes.bool.isRequired,
            filters: PropTypes.object.isRequired,
            rowData: PropTypes.array.isRequired,
         },

         render: function()
         {
            var filterShownButton = React.createElement(Button,
            {
               name: (this.props.isFilterShown ? "Hide Filter" : "Show Filter"),
               onClick: this.toggleFilterShownActionPerformed,
            });

            var myRowData = this.props.rowData;
            var resourceBase = this.props.resourceBase;
            var cellFunctions = {
               "sphereKey": function(data)
               {
                  var sphere = Sphere.properties[data.sphereKey];
                  return React.createElement(SphereUI,
                  {
                     sphere: sphere,
                     isSmall: true,
                     resourceBase: resourceBase,
                  });
               },
               "name": function(data)
               {
                  var src = resourceBase + "icon/HallOfBeorn16.png";
                  var searchString = data.name.replace(/ /g, "%20");
                  var href = "http://hallofbeorn.com/LotR?Query=" + searchString;
                  var link = createImageLink(src, href);
                  var src2 = resourceBase + "icon/RingsDB16.png";
                  var searchString2 = data.name.replace(/ /g, "+");
                  var href2 = "http://ringsdb.com/find?q=" + searchString2;
                  var link2 = createImageLink(src2, href2);
                  return DOM.span(
                  {
                     className: "dib w-100",
                  }, data.name, link2, link);
               },
               "cardTypeKey": function(data)
               {
                  return CardType.properties[data.cardTypeKey].name;
               },
               "cardSetKey": function(data)
               {
                  return CardSet.properties[data.cardSetKey].name;
               },
               "cardSubsetKey": function(data)
               {
                  var name, link;
                  if (data.cardSubsetKey)
                  {
                     var src = resourceBase + "icon/HallOfBeorn16.png";
                     name = CardSubset.properties[data.cardSubsetKey].name;
                     var searchString = name.replace(/ /g, "-");
                     var href = "http://hallofbeorn.com/LotR/Scenarios/" + searchString;
                     link = createImageLink(src, href);
                  }
                  return DOM.span(
                  {
                     className: "textImageLink dib w-100",
                  }, name, link);
               },
               "isImplemented": function(data)
               {
                  return React.createElement(ImplementedImage,
                  {
                     resourceBase: resourceBase,
                     isImplemented: data.isImplemented,
                  });
               },
            };

            var table = React.createElement(DataTable,
            {
               columns: TableColumns,
               rowData: myRowData,
               cellFunctions: cellFunctions,
               resourceBase: resourceBase,
            });

            var rows = [];
            rows.push(DOM.tr(
            {
               key: rows.length,
               className: "alignLeft tl",
            }, DOM.td(
            {}, filterShownButton)));

            if (this.props.isFilterShown)
            {
               var filterUI = React.createElement(ReactRedux.Provider,
               {
                  store: this.context.store,
               }, React.createElement(FilterContainer,
               {
                  resourceBase: resourceBase,
               }));

               rows.push(DOM.tr(
               {
                  key: rows.length,
               }, DOM.td(
               {}, filterUI)));
            }

            rows.push(DOM.tr(
            {
               key: rows.length,
            }, DOM.td(
            {}, table)));

            return DOM.table(
            {}, DOM.tbody(
            {}, rows));
         },

         toggleFilterShownActionPerformed: function()
         {
            LOGGER.trace("PlayerCardTable.toggleFilterShownActionPerformed() start");
            this.context.store.dispatch(Action.toggleFilterShown());
            LOGGER.trace("PlayerCardTable.toggleFilterShownActionPerformed() end");
         },
      });

      return PlayerCardTable;
   });
