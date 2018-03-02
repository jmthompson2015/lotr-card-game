var Lexicon = {};

Lexicon.nouns = ["ally", "area", "attachment", "card", "character", "damage", "deck", "dwarf", "east", "effect", "elf", "enemy", "ent", "event", "flagship", "fleet", "fog", "forest", "game", "goblin", "grass", "grotto", "guardian", "hand", "harbor", "heading", "hero", "hobbit", "huorn", "location", "monument", "mountain", "nazgûl", "orc", "phase", "pile", "pipe", "pit", "player", "ploughman", "pool", "quest", "ranged", "resource", "round", "sentinel", "stage", "surge", "threat", "token", "trait", "vale", "valour", "value", "villain", "villager", "warg", "willpower", "you"];

Lexicon.verbs = ["attach", "deal", "exhaust", "go", "has", "have", "is", "place", "raise", "ready", "see", "shuffle", "travel", "turn"];

Lexicon.adjectives = ["back", "dead", "east", "left", "right"];

Lexicon.adverbs = ["back", "east", "here", "left", "right", "south", "there"];

Lexicon.pronouns = ["he", "her", "him", "it", "she", "that", "they", "this"];

Lexicon.names = ["alcaron", "amarthiúl", "angmar", "aragorn", "arwen", "baggins", "belegaer", "belfalas", "bellach", "berúthiel", "bilbo", "caradhras", "celebrimbor", "círdan", "durin", "elladan", "elrohir", "elrond", "ettenmoors", "fili", "fornost", "frodo", "galadriel", "gandalf", "gimli", "glóin", "glorfindel", "gollum", "gondor", "gornákh", "grimbeorn", "gríma", "imrahil", "iârchon", "iârion", "ithilien", "khazad-dûm", "legolas", "mazarbul", "mindolluin", "mordor", "morgoth", "noldor", "nárelenya", "osgiliath", "ost-in-edhil", "rhosgobel", "sahír", "théoden", "théodred", "umbar", "undómiel", "wilyador", "éomer", "éowyn"];

Lexicon.articles = ["a", "an", "the"];

Lexicon.prepositions = ["as", "at", "by", "during", "from", "in", "into", "of", "on", "to", "with"];

Lexicon.conjunctions = ["and", "but", "or"];

Lexicon.determineType = function(word)
{
   let type;

   // FIXME: how to handle multiple types?

   if (Lexicon.nouns.includes(word))
   {
      type = "noun";
   }
   else if (Lexicon.verbs.includes(word))
   {
      type = "verb";
   }
   else if (Lexicon.adjectives.includes(word))
   {
      type = "adjective";
   }
   else if (Lexicon.adverbs.includes(word))
   {
      type = "adverb";
   }
   else if (Lexicon.pronouns.includes(word))
   {
      type = "pronoun";
   }
   else if (Lexicon.names.includes(word))
   {
      type = "name";
   }
   else if (Lexicon.articles.includes(word))
   {
      type = "article";
   }
   else if (Lexicon.prepositions.includes(word))
   {
      type = "preposition";
   }
   else if (Lexicon.conjunctions.includes(word))
   {
      type = "conjunction";
   }
   else if (!isNaN(word) && isFinite(word))
   {
      type = "number";
   }

   return type;
};

export default Lexicon;