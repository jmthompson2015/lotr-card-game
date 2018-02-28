import FileLoader from "./FileLoader.js";
import InputValidator from "./InputValidator.js";

var JSONFileLoader = {};

JSONFileLoader.loadFile = function(filepath, callback)
{
   InputValidator.validateIsString("filepath", filepath);
   InputValidator.validateIsFunction("callback", callback);

   const finishCallback = function(response)
   {
      finishConvert(response, callback);
   };

   FileLoader.loadFile(filepath, finishCallback);
};

function finishConvert(response, callback)
{
   const content = JSON.parse(response);

   callback(content);
}

export default JSONFileLoader;