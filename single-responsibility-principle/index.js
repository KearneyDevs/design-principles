const fs = require("fs");
// Single Responsibility Principle
// Primary responsibility of the journal is to add entries and remove entries
// it is better to group functionality by class rather than sticking all functionality
// in a single class.

class Journal {
  constructor() {
    this.entries = {};
  }

  // pass in the text you want for the entry
  // increment Journal count by one with each entry
  // construct the entry
  // add entry to entries object using c as the key
  // return c which is the index
  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  // pass in the index value
  // delete the entry that matches the provided index value
  removeEntry(index) {
    delete this.entries[index];
  }

  // create a string of the entries and take a new line after each entry
  toString() {
    return Object.values(this.entries).join(`\n`);
  }
}

Journal.count = 0;

class PersistenceManager {
  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}

let j = new Journal();
j.addEntry("I created a new class.");
j.addEntry("I run the new class.");
console.log(j.toString());

j.removeEntry(1);
console.log(j.toString());

let p = new PersistenceManager();
let filename =
  "C:/Users/ShaneKearney/Repos/design-principles/single-responsibility-principle/journal-entries/journal.txt";

p.saveToFile(j, filename);
