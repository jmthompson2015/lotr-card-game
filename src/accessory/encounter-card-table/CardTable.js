import CardType from "../../artifact/js/CardType.js";
import EncounterSet from "../../artifact/js/EncounterSet.js";
import Button from "../../view/js/Button.js";
import DataTable from "../../view/js/DataTable.js";
import ImplementedImage from "../../view/js/ImplementedImage.js";
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
         "name": function(data)
         {
            var src = resourceBase + "icon/HallOfBeorn16.png";
            var searchString = data.name.replace(/ /g, "%20");
            var href = "http://hallofbeorn.com/LotR?Query=" + searchString;
            var link = createImageLink(src, href);
            return ReactDOMFactories.span(
            {
               className: "dib w-100",
            }, data.name, link);
         },
         "cardTypeKey": function(data)
         {
            return CardType.properties[data.cardTypeKey].name;
         },
         "isImplemented": function(data)
         {
            return React.createElement(ImplementedImage,
            {
               resourceBase: resourceBase,
               isImplemented: data.isImplemented,
            });
         },
         "encounterSetKey": function(data)
         {
            return EncounterSet.properties[data.encounterSetKey].name;
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