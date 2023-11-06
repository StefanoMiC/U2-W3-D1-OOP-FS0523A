// la keyword THIS e l'utilizzo differente di funzioni classiche e arrow
const person = {
  name: "Gianni",
  surname: "Morandi",

  // il THIS nel contesto di un METODO creato con keyword "function", assume come valore l'istanza dell'oggetto proprietario del metodo
  sayHello: function () {
    // console.log("Ciao sono " + person.name + " " + person.surname); // la variabile person potrebbe cambiare nel tempo. potrebbe non essere sempre disponibile
    // potremmo volerci riferire ad un'altra variabile di un oggetto simile che è nato dalla clonazione di questo (quindi avrebbe un nome diverso)
    // con il THIS risolviamo questo enpass
    console.log("THIS", this);
    // la keyword "this" prende come valore la referenza dell'oggetto di riferimento, non è quindi un valore fisso.

    console.log("Ciao sono " + this.name + " " + this.surname);
  }
};

person.sayHello();

const person2 = { ...person };
person2.name = "Stefano";
person2.surname = "Miceli";
person2.sayHello();

const person3 = {
  name: "Gianni",
  surname: "Boncompagni",
  // la arrow function eredita il "this" dal contesto lessicale, o per meglio dire, il livello superiore
  // il livello superiore sarà fuori dall'oggetto person3 però... quindi l'oggetto globale e this.name non esisterà (chiaramente window.name non esiste)
  sayHello: () => {
    // console.log("Ciao sono " + person.name + " " + person.surname); // la variabile person potrebbe cambiare nel tempo. potrebbe non essere sempre disponibile
    // potremmo volerci riferire ad un'altra variabile di un oggetto simile che è nato dalla clonazione di questo (quindi avrebbe un nome diverso)
    // con il THIS risolviamo questo enpass
    console.log("THIS", this);
    console.log("Ciao sono " + this.name + " " + this.surname); // "Ciao sono undefined undefined"
  }
};

person3.sayHello();

const person4 = {
  name: "Stefano",
  surname: "Miceli",
  sayHello: function () {
    // console.log("Ciao sono " + person.name + " " + person.surname); // la variabile person potrebbe cambiare nel tempo. potrebbe non essere sempre disponibile
    // potremmo volerci riferire ad un'altra variabile di un oggetto simile che è nato dalla clonazione di questo (quindi avrebbe un nome diverso)
    // con il THIS risolviamo questo enpass
    console.log("OUTER THIS", this);
    console.log("Ciao sono " + this.name + " " + this.surname);
    const innerFunc = function () {
      console.log("INNER THIS", this); // il contesto globale
    }.bind(this); // il bind si occupa di prendere il this nel contesto esterno e passarlo come this interno alla funzione.
    // è fondamentale in questo caso, o si perderebbe il riferimento al this interno alla funzione annidata.
    innerFunc();

    const arrowInnerFunc = () => {
      console.log("INNER THIS ARROW", this); // la referenza all'oggetto
    };
    arrowInnerFunc();
  }
};

person4.sayHello();

const person5 = {
  name: "Stefano",
  surname: "Miceli",
  skills: ["HTML", "CSS", "JS"],
  sayHello: function () {
    // console.log("Ciao sono " + person.name + " " + person.surname); // la variabile person potrebbe cambiare nel tempo. potrebbe non essere sempre disponibile
    // potremmo volerci riferire ad un'altra variabile di un oggetto simile che è nato dalla clonazione di questo (quindi avrebbe un nome diverso)
    // con il THIS risolviamo questo enpass
    console.log("OUTER THIS", this);
    this.skills.forEach(skill => {
      // le arrow function sono pensate proprio per casi come questo in cui siamo obbligati ad usare una funzione definita dentro ad un altra funzione
      // normalmente perderemmo il contesto del this, ma grazie alla arrow function che eredita il this dal suo contesto lessicale o contesto esterno in questo caso,
      // avremo così mantenuto il valore del this del nostro oggetto di riferimento
      console.log("Ciao sono " + this.name + " " + this.surname + " e sono forte in " + skill);
    });
  }
};

person5.sayHello();
