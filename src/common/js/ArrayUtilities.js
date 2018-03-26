/*
 * Provides utility methods for arrays.
 *
 * @see http://modernweb.com/2013/12/23/45-useful-javascript-tips-tricks-and-best-practices/
 */

var ArrayUtilities = {};

ArrayUtilities.randomElement = function(array)
{
   let index = Math.floor(Math.random() * array.length);

   return array[index];
};

ArrayUtilities.remove = function(array, element)
{
   let answer = array.slice();
   let index = answer.indexOf(element);

   if (index >= 0)
   {
      answer.splice(index, 1);
   }

   return answer;
};

ArrayUtilities.rotate = function(array, count)
{
   count -= array.length * Math.floor(count / array.length);

   let answer = array.slice();
   answer.push.apply(answer, answer.splice(0, count));

   return answer;
};

ArrayUtilities.shuffle = function(array)
{
   let answer = array.slice();

   answer.sort(function()
   {
      return Math.random() - 0.5;
   });

   return answer;
};

export default ArrayUtilities;