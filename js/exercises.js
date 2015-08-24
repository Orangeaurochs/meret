// DEFINE A EXERCISE OBJECT
// TYPE (string): "find" or "replace" [currently only "find" supported]
// TEXT (string): introductory text
// SUBJECT (array of strings): mrk text to be searched, each element a line of MARC
// SOLUTION (array of booleans): correct result
// HINT (string): help and explanation
function Exercise (type, text, subject, solution, hint) {
  this.type = type;
  this.text = text;
  this.subject = subject;
  this.solution = solution;
  this.hint = hint;
  this.passed = false;
}

var q = new Array;
q[1] = new Exercise (
  "find",
  "Try to match all the ISBN fields only.",
  [
    "=020  \\\\$a0921563362",
    "=020  \\\\$a067843242",
    "=245  14$aThe future of the Olympics :$bTokyo 2020 /$cSebastian Cram.",
    "=650  \\0$aFast food restaurants$zJapan."
  ],
  [
    true,
    true,
    false,
    false
  ],
  "Just searching for 020 will also match on Tokyo 2020. The equals sign = starts all MARC field tags on Marcedit and it is unlikely (though not impossible!) that =020 will occur naturally elsewhere in a record"
);

q[2] = new Exercise (
  "find",
  "Try to match all the fields which have a subfield $z.",
  [
    "=020  \\\\$a0921563362",
    "=020  \\\\$a067843242",
    "=020  \\\\$z067843242",
    "=245  14$aThe future of the Olympics :$bTokyo 2020 /$cSebastian Cram.",
    "=650  \\0$aFast food restaurants$zJapan."
  ],
  [
    false,
    false,
    true,
    false,
    true
  ],
  "You can't search for $z as $ is a special symbol in regular expressions that matches the end of something. You need tell Marcedit to look for an actual $ sign by putting a backslash \ in front of it: \$. The applies to a range of special characters, like backslashes themselves, square brackets and round brackets."
);

q[3] = new Exercise (
  "find",
  "Try to find only the ISBN fields with subfield z.",
  [
    "=020  \\\\$a0921563362",
    "=020  \\\\$z978092156336",
    "=020  \\\\$a067843242",
    "=020  \\\\$z067843242",
    "=245  14$aThe future of the Olympics :$bTokyo 2020 /$cSebastian Cram.",
    "=650  \\0$aFast food restaurants$zJapan."
  ],
  [
    false,
    true,
    false,
    true,
    false,
    false
  ],
  "Searching for just the subfield z $z will also match the subfield $z in the 650 field, so you have to specify both =020 and $z. You can use .* (the dot means any character whatsoever and the asterisk means that character any number of times) to match anything between the two."
);


