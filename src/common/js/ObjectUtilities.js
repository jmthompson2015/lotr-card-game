import InputValidator from "./InputValidator.js";

var ObjectUtilities = {};

ObjectUtilities.merge = function(a, b)
{
   InputValidator.validateNotNull("a", a);
   InputValidator.validateNotNull("b", b);

   let answer = {};
   let keysA = Object.keys(a);

   keysA.forEach(function(key)
   {
      answer[key] = a[key];
   });

   let keysB = Object.keys(b);

   keysB.forEach(function(key)
   {
      answer[key] = b[key];
   });

   return answer;
};

export default ObjectUtilities;