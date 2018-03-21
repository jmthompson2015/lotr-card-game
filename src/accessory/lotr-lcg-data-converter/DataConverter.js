import JSONFileLoader from "../../common/js/JSONFileLoader.js";
import EnumGenerator from "./EnumGenerator.js";

var DataConverter = {};

let basePath = "../../../../lotr-lcg-data/data/";
let types = ["ally", "attachment", "encounter-side-quest", "enemy", "event", "hero", "location", "objective-ally", "objective-hero", "objective-location", "objective", "player-side-quest", "quest", "ship-enemy", "ship-objective", "treachery", "treasure"];
// let types = ["hero"];
let typeToGeneratedMap = {};

DataConverter.execute = function(filepath, callback)
{
   let myCallback = (data) =>
   {
      callback(data);
   };

   JSONFileLoader.loadFile(filepath, myCallback);
};

document.getElementById("mainPanel").innerHTML = "Working...";

types.forEach(type =>
{
   let filepath = basePath + type + ".js";

   DataConverter.execute(filepath, function(data)
   {
      let generated = EnumGenerator.generate(data);
      typeToGeneratedMap[type] = generated;

      if (Object.keys(typeToGeneratedMap).length === types.length)
      {
         printOutput();
      }
   });
});

function printOutput()
{
   let types = Object.keys(typeToGeneratedMap);
   types.sort();

   types.forEach(type =>
   {
      let generated = typeToGeneratedMap[type];
      let content = EnumGenerator.asString(generated);

      console.log(type + "\n" + content);
   });

   document.getElementById("mainPanel").innerHTML = "Done.";
}

export default DataConverter;