import InputValidator from "./InputValidator.js";

var ObjectAugments = {};

if (!Object.lotrMerge)
{
   Object.lotrMerge = function(a, b)
   {
      InputValidator.validateNotNull("a", a);
      InputValidator.validateNotNull("b", b);

      var keys = Object.keys(b);

      keys.forEach(function(key)
      {
         a[key] = b[key];
      });
   };
}

export default ObjectAugments;