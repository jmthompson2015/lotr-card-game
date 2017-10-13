/*
 * Provides utility methods for arrays.
 *
 * @see http://modernweb.com/2013/12/23/45-useful-javascript-tips-tricks-and-best-practices/
 */
"use strict";

define(function()
{
   var ArrayAugments = {};

   if (!Array.prototype.lotrRandomElement)
   {
      Array.prototype.lotrRandomElement = function()
      {
         var index = Math.floor(Math.random() * this.length);

         return this[index];
      };
   }

   // Note: This function modifies array.
   if (!Array.prototype.lotrRemove)
   {
      Array.prototype.lotrRemove = function(element)
      {
         var index = this.indexOf(element);

         if (index >= 0)
         {
            this.splice(index, 1);
         }
      };
   }

   // Note: This function modifies array.
   if (!Array.prototype.lotrRotate)
   {
      Array.prototype.lotrRotate = function(count)
      {
         count -= this.length * Math.floor(count / this.length);
         this.push.apply(this, this.splice(0, count));

         return this;
      };
   }

   // Note: This function modifies array.
   if (!Array.prototype.lotrShuffle)
   {
      Array.prototype.lotrShuffle = function()
      {
         this.sort(function()
         {
            return Math.random() - 0.5;
         });
      };
   }

   return ArrayAugments;
});
