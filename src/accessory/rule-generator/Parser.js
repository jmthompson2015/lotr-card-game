/*
 * Parse card text into a hierarchy.
 *
 * text: the card raw text
 * block: a text block, separated by /\n/
 * sentence: separated by /.!?/
 * clause: separated by /:,/
 * phrase: separated by preposition
 * word: separated by / /
 */
import InputValidator from "../../common/js/InputValidator.js";

import Lexicon from "./Lexicon.js";

var Parser = {};

Parser.parse = function(card)
{
   InputValidator.validateNotNull("card", card);

   let text = card.text;
   text = text.replace(new RegExp(card.name, "g"), "this-card-name");

   // Cleanup.
   text = text.replace(/\r\n|\r/g, "\n");
   text = text.replace(/<br\/>/g, "\n");
   text = text.replace(/\u2013/g, "-"); // en-dash
   text = text.replace(/\u2022/g, ""); // bullet
   text = text.replace("snow-an Elf.\"\n-Legolas,", "snow an elf. legolas,");
   text = text.replace(/non-<b>/g, "non-");

   // Reformat.
   text = text.replace(/<(?:.|\n)*?>/gm, " "); // remove html tags
   text = text.replace(/\[/g, " ");
   text = text.replace(/[\/#$%\^&\*;{}=_`~\"\[\]]/g, " "); // remove punctuation
   text = text.replace(/[()]/g, "");
   text = text.replace(/'s/g, "");
   text = text.replace(/'/g, "");
   text = text.replace(/ {2,}/g, " "); // remove extra spaces
   text = text.trim().toLowerCase();

   Lexicon.names.filter(name => name.indexOf(" ") >= 0).forEach(name =>
   {
      text = text.replace(new RegExp(name, "g"), name.replace(/ /g, "+"));
   });

   text = text.replace(/this-card-name/g, "${cardName}");

   return this.parseBlocks(text);
};

Parser.parseBlocks = function(text)
{
   InputValidator.validateNotNull("text", text);

   let blocks = text.split(/\n/);
   blocks = blocks.map(block => block.trim());
   let answer = [];

   blocks.forEach(block =>
   {
      if (block !== "")
      {
         let sentenceObjects = this.parseSentences(block);

         answer.push(
         {
            text: block,
            sentences: sentenceObjects,
         });
      }
   });

   return answer;
};

Parser.parseSentences = function(block)
{
   InputValidator.validateNotNull("block", block);

   let sentences = block.trim().split(/[\.\!\?]/);
   sentences = sentences.filter(sentence => sentence !== "");
   sentences = sentences.map(sentence => sentence.trim());
   let answer = [];

   sentences.forEach(sentence =>
   {
      if (sentence !== "")
      {
         let clauses = this.parseClauses(sentence);

         answer.push(
         {
            text: sentence,
            clauses: clauses,
         });
      }
   });

   return answer;
};

Parser.parseClauses = function(sentence)
{
   InputValidator.validateNotNull("sentence", sentence);

   let clauses = sentence.trim().split(/[\:\,]/);
   clauses = clauses.map(clause => clause.trim());
   let answer = [];

   clauses.forEach(clause =>
   {
      if (clause !== "")
      {
         let phrases = this.parsePhrases(clause);

         answer.push(
         {
            text: clause,
            phrases: phrases,
         });
      }
   });

   return answer;
};

Parser.parsePhrases = function(clause)
{
   InputValidator.validateNotNull("clause", clause);

   let phrases = [];
   let start = 0;
   let myWords = clause.trim().split(/ /);
   myWords.forEach((word, i) =>
   {
      if (Lexicon.prepositions.includes(word))
      {
         let phrase = myWords.slice(start, i).join(" ");
         phrases.push(phrase);
         start = i;
      }
   });

   if (start < myWords.length)
   {
      let phrase = myWords.slice(start).join(" ");
      phrases.push(phrase);
   }

   phrases = phrases.map(phrase => phrase.trim());
   let answer = [];

   phrases.forEach(phrase =>
   {
      if (phrase !== "")
      {
         let words = this.parseWords(phrase);

         answer.push(
         {
            text: phrase,
            words: words,
         });
      }
   });

   return answer;
};

Parser.parseWords = function(phrase)
{
   InputValidator.validateNotNull("phrase", phrase);

   let words = phrase.trim().split(/ /);
   words = words.map(word => word.trim());
   let answer = [];

   words.forEach(word =>
   {
      if (word !== "")
      {
         answer.push(
         {
            text: word,
         });
      }
   });

   return answer;
};

Parser.print = function(parts)
{
   InputValidator.validateNotNull("parts", parts);

   let content = "";

   parts.forEach((block, i) =>
   {
      content += i + " block: " + block.text + "\n";

      block.sentences.forEach((sentence, j) =>
      {
         content += j + " sentence: " + sentence.text + "\n";

         sentence.clauses.forEach((clause, k) =>
         {
            content += k + " clause: " + clause.text + "\n";

            clause.phrases.forEach((phrase, k) =>
            {
               content += k + " phrase: " + phrase.text + "\n";

               phrase.words.forEach((word, l) =>
               {
                  content += l + " word: " + word.text + "\n";
               });
            });
         });
      });
   });

   console.log("Parts:\n" + content);
   return content;
};

export default Parser;