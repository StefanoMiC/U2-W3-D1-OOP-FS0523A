// gli oggetti in JS sono semplici da realizzare --> {}, fin tanto che ne creiamo pochi...
// il problema arriva quando abbiamo la necessità di crearne molti in serie, tutti anonimi e indipendenti, con stesse coppie chiave/valore

const methodFunc = function () {
  // console.log("Ciao sono " + person.name + " " + person.surname); // la variabile person potrebbe cambiare nel tempo. potrebbe non essere sempre disponibile
  // potremmo volerci riferire ad un'altra variabile di un oggetto simile che è nato dalla clonazione di questo (quindi avrebbe un nome diverso)
  // con il THIS risolviamo questo enpass
  console.log("THIS", this);
  console.log("Ciao sono " + this.name + " " + this.surname);
};

const person = {
  name: "Gianni",
  surname: "Morandi",

  sayHello: methodFunc
};

const person2 = {
  name: "Mario",
  surname: "Rossi",

  sayHello: methodFunc
};

person.sayHello();
person2.sayHello();

// una funzione costruttrice funge da "fabbrica di oggetti"
// va creata in PascalCase (quindi anche con la prima lettera maiuscola)

// per aiutarci a scrivere oggetti in serie fatti con la stessa struttura
// entrano in gioco le funzioni costruttrici (constructor functions)

// camelCase -> prima lettera minuscola e le altre maiuscole (gobba di cammello)
// PascalCase -> tutte le lettere iniziali delle parole maiuscole (inclusa la prima)

// dovrà essere una funzione classica e non arrow.
// le arrow function non possono essere delle costruttrici

// la funzione costruttrice genera l'istanza di un oggetto a partire dalla stessa matrice

// creaimo lo stampo che genererà tanti oggetti simili (istanze)

const Person = function () {
  this.name = "";
  this.surname = "";
  this.address = "";
  this.email = "";
  this.method = function () {};
};

// per far generare l'oggetto alla funzione costruttrice dovremo implementare l'utilizzo della keyword "new"
const giuseppeVerdi = new Person();
giuseppeVerdi.name = "Giuseppe";
giuseppeVerdi.surname = "Verdi";

console.log(giuseppeVerdi);

// un nuovo stampino più dinamico che accetta dei parametri per assegnare il valore alle proprietà immediatamente
const DynamicPerson = function (_name, _surname, _address, _email, _catchPhrase) {
  this.name = _name;
  this.surname = _surname;
  this.address = _address;
  this.email = _email;
  this.catchPhrase = _catchPhrase;
};

// mario e wario vengono generati da subito come oggetti con tutte le proprietà necessarie
const marioSuper = new DynamicPerson("Mario", "Super", "Yoshi Island", "super@mario.com", function () {
  console.log("It's me " + this.name);
});

console.log(marioSuper);
marioSuper.catchPhrase();

const warioSuper = new DynamicPerson("Wario", "Super", "Castle", "super@wario.com", function () {
  console.log("It's me " + this.name);

  //   anche in questo caso, l'arrow function ci aiuta a ricavare il this dal contesto esterno, mantenendo il collegamento con l'oggetto di appartenenza
  setTimeout(() => {
    console.log(this.name);
  }, 1000);
});

warioSuper.catchPhrase();
