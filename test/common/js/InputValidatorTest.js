"use strict";

define(["qunit", "common/js/InputValidator"],
   function(QUnit, InputValidator)
   {
      QUnit.module("InputValidator");

      QUnit.test("validateInRange()", function(assert)
      {
         validateInRangeFail(assert, "0", 0, 1, 10);
         InputValidator.validateInRange("1", 1, 0, 10);
      });

      QUnit.test("validateIsArray()", function(assert)
      {
         validateIsArrayFail(assert);
         validateIsArrayFail(assert, "value");
         validateIsArrayFail(assert, "undefined", undefined);
         validateIsArrayFail(assert, "null", null);
         validateIsArrayFail(assert, "false", false);
         validateIsArrayFail(assert, "", "");
         validateIsArrayFail(assert, "12", 12);
         InputValidator.validateIsArray("[]", []);
         var array = [1, 2, 3, 4];
         InputValidator.validateIsArray("array", array);
         validateIsArrayFail(assert, "function", function() {});
      });

      QUnit.test("validateIsBoolean()", function(assert)
      {
         validateIsBooleanFail(assert);
         validateIsBooleanFail(assert, "value");
         validateIsBooleanFail(assert, "undefined", undefined);
         validateIsBooleanFail(assert, "null", null);
         InputValidator.validateIsBoolean("false", false);
         validateIsBooleanFail(assert, "", "");
         validateIsBooleanFail(assert, "12", 12);
         validateIsBooleanFail(assert, "[]", []);
         var array = [1, 2, 3, 4];
         validateIsBooleanFail(assert, "array", array);
         validateIsBooleanFail(assert, "function", function() {});
      });

      QUnit.test("validateIsFunction()", function(assert)
      {
         validateIsFunctionFail(assert);
         validateIsFunctionFail(assert, "value");
         validateIsFunctionFail(assert, "undefined", undefined);
         validateIsFunctionFail(assert, "null", null);
         validateIsFunctionFail(assert, "false", false);
         validateIsFunctionFail(assert, "", "");
         validateIsFunctionFail(assert, "12", 12);
         validateIsFunctionFail(assert, "[]", []);
         var array = [1, 2, 3, 4];
         validateIsFunctionFail(assert, "array", array);
         InputValidator.validateIsFunction("function", function() {});
      });

      QUnit.test("validateIsNumber()", function(assert)
      {
         validateIsNumberFail(assert);
         validateIsNumberFail(assert, "value");
         validateIsNumberFail(assert, "undefined", undefined);
         validateIsNumberFail(assert, "null", null);
         validateIsNumberFail(assert, "false", false);
         validateIsNumberFail(assert, "", "");
         InputValidator.validateIsNumber("12", 12);
         validateIsNumberFail(assert, "[]", []);
         var array = [1, 2, 3, 4];
         validateIsNumberFail(assert, "array", array);
         validateIsNumberFail(assert, "function", function() {});
      });

      QUnit.test("validateIsString()", function(assert)
      {
         validateIsStringFail(assert);
         validateIsStringFail(assert, "value", undefined);
         validateIsStringFail(assert, "undefined", undefined);
         validateIsStringFail(assert, "null", null);
         validateIsStringFail(assert, "false", false);
         InputValidator.validateIsString("", "");
         validateIsStringFail(assert, "12", 12);
         validateIsStringFail(assert, "[]", []);
         var array = [1, 2, 3, 4];
         validateIsStringFail(assert, "array", array);
         validateIsStringFail(assert, "function", function() {});
      });

      QUnit.test("validateNotEmpty()", function(assert)
      {
         validateNotEmptyFail(assert);
         validateNotEmptyFail(assert, "value");
         validateNotEmptyFail(assert, "undefined", undefined);
         validateNotEmptyFail(assert, "null", null);
         InputValidator.validateNotEmpty("false", false);
         InputValidator.validateNotEmpty("true", true);
         validateNotEmptyFail(assert, "", "");
         InputValidator.validateNotEmpty("string", "string");
         validateNotEmptyFail(assert, "NaN", NaN);
         InputValidator.validateNotEmpty("0", 0);
         InputValidator.validateNotEmpty("12", 12);
         validateNotEmptyFail(assert, "[]", []);
         var array = [1, 2, 3, 4];
         InputValidator.validateNotEmpty("array", array);
         var object = {};
         InputValidator.validateNotEmpty("object", object);
         InputValidator.validateNotEmpty("function", function() {});
      });

      QUnit.test("validateNotNull()", function(assert)
      {
         validateNotNullFail(assert);
         validateNotNullFail(assert, "value");
         validateNotNullFail(assert, "undefined", undefined);
         validateNotNullFail(assert, "null", null);
         InputValidator.validateNotNull("12", 12);
         InputValidator.validateNotNull(assert, "[]", []);
         var array = [1, 2, 3, 4];
         InputValidator.validateNotNull("array", array);
         var object = {};
         InputValidator.validateNotNull("object", object);
         InputValidator.validateNotNull("function", function() {});
      });

      var SHOULD_THROW = "Should have thrown an exception.";

      function validateInRangeFail(assert, objectName, object, low, high)
      {
         try
         {
            InputValidator.validateInRange(objectName, object, low, high);
            throw SHOULD_THROW;
         }
         catch (e)
         {
            assert.equal(e, objectName + " is out of range [1, 10]: " + object);
         }
      }

      function validateIsArrayFail(assert, objectName, object)
      {
         try
         {
            InputValidator.validateIsArray(objectName, object);
            throw SHOULD_THROW;
         }
         catch (e)
         {
            assert.equal(e, objectName + " is not an array: " + object);
         }
      }

      function validateIsBooleanFail(assert, objectName, object)
      {
         try
         {
            InputValidator.validateIsBoolean(objectName, object);
            throw SHOULD_THROW;
         }
         catch (e)
         {
            assert.equal(e, objectName + " is not a boolean: " + object);
         }
      }

      function validateIsFunctionFail(assert, objectName, object)
      {
         try
         {
            InputValidator.validateIsFunction(objectName, object);
            throw SHOULD_THROW;
         }
         catch (e)
         {
            assert.equal(e, objectName + " is not a function: " + object);
         }
      }

      function validateIsNumberFail(assert, objectName, object)
      {
         try
         {
            InputValidator.validateIsNumber(objectName, object);
            throw SHOULD_THROW;
         }
         catch (e)
         {
            assert.equal(e, objectName + " is not a number: " + object);
         }
      }

      function validateIsStringFail(assert, objectName, object)
      {
         try
         {
            InputValidator.validateIsString(objectName, object);
            throw SHOULD_THROW;
         }
         catch (e)
         {
            assert.equal(e, objectName + " is not a string: " + object);
         }
      }

      function validateNotEmptyFail(assert, objectName, object)
      {
         try
         {
            InputValidator.validateNotEmpty(objectName, object);
            throw SHOULD_THROW;
         }
         catch (e)
         {
            assert.equal(e, objectName + " is null or empty.");
         }
      }

      function validateNotNullFail(assert, objectName, object)
      {
         try
         {
            InputValidator.validateNotNull(objectName, object);
            throw SHOULD_THROW;
         }
         catch (e)
         {
            if (object === undefined)
            {
               assert.equal(e, objectName + " is undefined.");
            }
            else
            {
               assert.equal(e, objectName + " is null.");
            }
         }
      }
   });
