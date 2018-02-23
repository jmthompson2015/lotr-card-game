import CardSet from "../../artifact/js/CardSet.js";
import CardSubset from "../../artifact/js/CardSubset.js";
import CardType from "../../artifact/js/CardType.js";
import Sphere from "../../artifact/js/Sphere.js";
import Button from "../../view/js/Button.js";
import DataTable from "../../view/js/DataTable.js";
import ImplementedImage from "../../view/js/ImplementedImage.js";
import SphereUI from "../../view/js/SphereUI.js";
import Action from "./Action.js";
import FilterContainer from "./FilterContainer.js";
import TableColumns from "./TableColumns.js";

function createImageLink(src, href)
{
   var image = ReactDOMFactories.img(
   {
      className: "imageBlock fr v-mid",
      src: src,
   });

   return ReactDOMFactories.a(
   {
      href: href,
      target: "_blank",
   }, image);
}

class PlayerCardTable extends React.Component
{
   render()
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
            return ReactDOMFactories.span(
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
            return ReactDOMFactories.span(
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
      rows.push(ReactDOMFactories.tr(
      {
         key: rows.length,
         className: "alignLeft tl",
      }, ReactDOMFactories.td(
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

         rows.push(ReactDOMFactories.tr(
         {
            key: rows.length,
         }, ReactDOMFactories.td(
         {}, filterUI)));
      }

      rows.push(ReactDOMFactories.tr(
      {
         key: rows.length,
      }, ReactDOMFactories.td(
      {}, table)));

      return ReactDOMFactories.table(
      {}, ReactDOMFactories.tbody(
      {}, rows));
   }

   toggleFilterShownActionPerformed()
   {
      LOGGER.trace("PlayerCardTable.toggleFilterShownActionPerformed() start");
      this.context.store.dispatch(Action.toggleFilterShown());
      LOGGER.trace("PlayerCardTable.toggleFilterShownActionPerformed() end");
   }
}

PlayerCardTable.contextTypes = {
   store: PropTypes.object.isRequired,
};

PlayerCardTable.propTypes = {
   isFilterShown: PropTypes.bool.isRequired,
   filters: PropTypes.object.isRequired,
   rowData: PropTypes.array.isRequired,
};

export default PlayerCardTable;