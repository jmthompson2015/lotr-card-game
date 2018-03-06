var Lexicon = {};

Lexicon.nouns = ["ally", "area", "attachment", "card", "character", "damage", "deck", "dwarf", "east", "effect", "elf", "enemy", "ent", "event", "flagship", "fleet", "fog", "forest", "game", "goblin", "grass", "grotto", "guardian", "hand", "harbor", "heading", "hero", "hobbit", "huorn", "location", "marsh-dweller", "monument", "mountain", "nazgûl", "orc", "phase", "pile", "pipe", "pit", "player", "ploughman", "pool", "quest", "ranged", "resource", "ring-bearer", "round", "sentinel", "stage", "surge", "threat", "token", "trait", "vale", "valour", "value", "villain", "villager", "warg", "willpower", "wose", "you"];

Lexicon.verbs = ["attach", "deal", "exhaust", "go", "has", "have", "is", "place", "raise", "ready", "see", "shuffle", "travel", "turn"];

Lexicon.adjectives = ["back", "dead", "east", "left", "right"];

Lexicon.adverbs = ["back", "east", "here", "left", "right", "south", "there"];

Lexicon.pronouns = ["he", "her", "him", "it", "she", "that", "they", "this"];

Lexicon.names = ["alcaron", "amarthiúl", "amon hen", "amon lhaw", "amon forn", "angmar", "aragorn", "arwen", "baggins", "belegaer", "belfalas", "bellach", "berúthiel", "bilbo baggins", "caradhras", "carn dûm", "celebrimbor", "círdan", "daechanar", "dol amroth", "dol guldur", "dream-chaser", "drû-buri-drû", "durin", "elladan", "elrohir", "elrond", "emyn muil", "ettenmoors", "fangorn", "fili", "fornost", "frodo baggins", "galadriel", "gandalf", "gimli", "glóin", "glorfindel", "gollum", "gondor", "gornákh", "grimbeorn", "gríma", "imrahil", "iârchon", "iârion", "ithilien", "kahliel", "khazad-dûm", "legolas", "mazarbul", "minas morgul", "mindolluin", "mordor", "morgoth", "noldor", "nárelenya", "osgiliath", "ost-in-edhil", "rhosgobel", "sahír", "sam gamgee", "stormcaller", "thaurdir", "théoden", "théodred", "umbar", "undómiel", "wilyador", "éomer", "éowyn"];

Lexicon.articles = ["a", "an", "the"];

Lexicon.prepositions = ["above", "across", "after", "against", "among", "as", "at", "before", "below", "between", "beyond", "by", "down", "during", "except", "for", "from", "in", "into", "of", "on", "onto", "out", "over", "through", "to", "under", "underneath", "until", "up", "with", "without"];

Lexicon.conjunctions = ["and", "but", "or"];

Lexicon.determinePhraseType = phrase =>
{
   let type;

   const words = phrase.words;
   const word0 = words[0].text;

   if (Lexicon.isPreposition(word0))
   {
      type = "PP";
   }

   return type;
};

Lexicon.determineWordType = word =>
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
   else if (Lexicon.names.includes(word) || Lexicon.names.includes(word.replace(/\+/g, " ")))
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

Lexicon.isNoun = word => Lexicon.nouns.includes(word);

Lexicon.isPreposition = word => Lexicon.prepositions.includes(word);

Lexicon.isVerb = word => Lexicon.verbs.includes(word);

export default Lexicon;