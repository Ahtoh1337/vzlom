export const numTextMap = [
  "55",
  "1c",
  "e9",
  "bd",
  "7a",
  "c0",
  "64",
  "3f",
  "v2",
  "8h",
];
export const words = {
  5: [
    "blast",
    "flask",
    "clash",
    "clone",
    "drone",
    "stone",
    "steak",
    "break",
    "brown",
    "class",
    "prone",
    "clean",
    "split",
    "merit",
    "crown",
    "clown",
    "prove",
    "crook",
    "broom",
    "stool",
    "grass",
    "brass",
    "grime",
    "chime",
    "crime",
    "steal",
    "steel",
    "stale",
    "price",
    "prime",
    "slice",
    "abide",
    "slave",
    "brave",
    "blame",
    "black",
    "login",
    "death",
    "admin",
    "brand",
    "stand",
  ],
  7: [
    "duelist",
    "diverse",
    "dictate",
    "checker",
    "boolean",
    "verdant",
    "weapons",
    "welcome",
    "product",
    "america",
    "disable",
    "voltage",
    "protect",
    "humbled",
    "torture",
    "unaware",
    "flooded",
    "gravity",
    "charity",
    "penalty",
    "beating",
    "grocery",
    "invalid",
    "initial",
    "illicit",
    "gambler",
    "soldier",
    "milkman",
    "deserve",
    "observe",
    "malware",
    "holiday",
    "hundred",
    "million",
    "killers",
    "strange",
    "barrage",
    "dresser",
    "journal",
    "juniors",
    "animate"
  ],
  9: [
    "direction",
    "fabricate",
    "fantastic",
    "suffocate",
    "eradicate",
    "eliminate",
    "steelwork",
    "americans",
    "explosion",
    "amendment",
    "limestone",
    "cyberpunk",
    "crybabies",
    "lethality",
    "selection",
    "netrunner",
    "nastiness",
    "lubricate",
    "supervise",
    "nightmare",
    "maelstrom",
    "bloodline",
    "secretion",
    "volunteer",
    "successor",
    "aggressor",
    "assassins",
    "wasteland",
    "sorcerers",
    "minutemen",
    "hourglass",
    "mountains",
    "obedience",
    "impatient",
    "imperfect",
    "segregate",
    "procreate",
    "nullified",
    "aesthetic",
    "authorize",
    "authentic",
  ],
};

export function randInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function weightedRandInt(
  max,
  min = 0,
  weightFactor = 1,
  favorLower = true
) {
  const weight = (num) =>
    favorLower ? 1 / (num + 1) ** weightFactor : (num + 1) ** weightFactor;

  let totalWeight = 0;

  for (let i = 0; i < max - min; i++) {
    totalWeight += weight(i);
  }

  const normWeight = (num) => weight(num) / totalWeight;

  const rand = Math.random();

  let sum = 0;

  for (let i = 0; i < max - min; i++) {
    sum += normWeight(i);
    if (sum >= rand) {
      return i + min;
    }
  }

  return max - 1 + min;
}

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function hashCode(s) {
  for (var i = 0, h = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}

export function RNG(seed) {
  this.m = 0x80000000;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}
RNG.prototype.nextInt = function () {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
};
RNG.prototype.nextFloat = function () {
  return this.nextInt() / (this.m - 1);
};
RNG.prototype.nextRange = function (start, end) {
  var rangeSize = end - start;
  var randomUnder1 = this.nextInt() / this.m;
  return start + Math.floor(randomUnder1 * rangeSize);
};
RNG.prototype.choice = function (array) {
  return array[this.nextRange(0, array.length)];
};
RNG.prototype.shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = this.nextInt() % (i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
};
