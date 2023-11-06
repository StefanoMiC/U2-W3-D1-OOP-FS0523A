// In JavaScript è possibile assegnare ad una varibile/costante un valore tra i tipi primitivi: string, number, boolean, undefined, null...

// qualsiasi valore NON PRIMITIVO entra a far parte della famiglia degli OGGETTI

// copiare una NON PRIMITIVA ci farà copiare solamente la sua REFERENZA (indirizzo in memoria)

// un oggetto è un gruppo di proprietà e metodi delimitati da parentesi graffe {}
// al suo interno può contenere un numero potenzialmente illimitato di coppie chiave-valore

const obj = {}; // <-- sto dichiarando un oggetto vuoto con NOTAZIONE LETTERALE

console.log(obj.__proto__); // Object
console.log(obj.__proto__.__proto__); // null

const dog = {
  breed: "Labrador",
  age: 2,

  // un metodo è una funzione all'interno di un oggetto che stabilisce l'abilità che ha l'oggetto stesso
  bark: function () {
    console.log("BAU");
  },

  // la differenza tra funzione classica e arrow sta nell'uso del THIS
  angryBark: () => {
    console.log("WOOOFFF!!!");
  }
};

dog.bark();
dog.bark();
dog.angryBark();
dog.bark();
dog.bark();

// document.body.innerHTML += dog; // produce [object Object] nel DOM, ad indicare che è stata fatta un'operazione non consona e andrà sistemata
console.log("DOG", dog);
// metodo nativo per rendere a stringa un oggetto, che se avviene indica una mancata gestione corretta dell'operazione appena avvenuta
console.log("DOG toString", dog.toString());
// metodo per rendere un oggetto nativo in stringa nel modo corretto
console.log("DOG stringified", JSON.stringify(dog));
// metodo che esiste sull'oggetto dog anche senza averlo creato, arriva grazie alla catena prototipale, ereditato dal costruttore Object
console.log("HAS OWN PROPERTY", dog.hasOwnProperty("age"));

// ispezioniamo la catena prototipale di varie entità
const arr = [];

console.log("is array", Array.isArray(arr));
console.log(arr.__proto__); // Array
console.log(arr.__proto__.__proto__); // Object
console.log(arr.__proto__.__proto__.__proto__); // null

const str = "Epicode";

console.dir(str.__proto__); // String
console.dir(str.__proto__.__proto__); // Object
console.dir(str.__proto__.__proto__.__proto__); // null

const func = function () {};

console.log(func.__proto__); // function
console.log(func.__proto__.__proto__); // Object
console.log(func.__proto__.__proto__.__proto__); // null;

const propName = "jump--height";

const cat = {
  "fur-type": "long and very fluffy",
  "date.of.adoption": "01/12/2022",
  [propName]: "2mt"
};
cat.age = 1; // aggiunta di proprietà a posteriori

console.log(cat);

// lettura di proprietà di oggetto
console.log(cat["date.of.adoption"]);
console.log(cat["fur-type"]);
console.log(cat.age); // dot notation, metodo standard di accesso a proprietà di oggetto

console.log(cat[propName]);

const jump = "jump-";

console.log(cat[jump.concat("-height")]);
console.log(cat[jump + "-height"]);

// scomponiamo l'oggetto cat in entità chiave-valore, per poi costruirci un array di oggetti delle singole chiave-valore
const catEntries = Object.entries(cat);
console.log(catEntries);

const arrOfObjs = [];

for (const [key, content] of catEntries) {
  //   const key = values[0];
  //   const content = values[1];

  // destrutturazione di array
  //   const [key, content] = values;

  //   console.log(key);

  const newObj = {
    [key]: content
  };

  arrOfObjs.push(newObj);
}

console.log(arrOfObjs);

// for (let i = 0; i < catEntries.length; i++) {
//   const values = catEntries[i];
//   console.log(values);
// }

// primitive si copiano direttamente
let x = 10;
let y = x;

y = y + 1;
console.log(y);
console.log(x);

// mentre referenze andrebbero clonate in maniera appropriata e puntuale
const clonedCat = {};

for (const [key, content] of catEntries) {
  //   console.log(content);
  // ipoteticamente dovremmo controllare il contenuto di content attraverso diversi if a questo livello
  // per poi clonare le eventuali referenze se trovate

  clonedCat[key] = content; // in questo caso stiamo copiando delle semplici stringhe e non è necessario fare niente più di questo
  console.log(clonedCat);
}

cat2 = cat; // DA NON FARE MAI! qualsiasi modifica su cat2 si rifletterebbe negativamente anche a cat
console.log(cat2 === cat);
console.log(clonedCat === cat);

console.log(cat);
console.log(clonedCat);
cat2["fur-type"] = "short and very itchy";
console.log(cat);
clonedCat["date.of.adoption"] = "05/01/2023";
console.log(cat);

// controllare se due oggetti "diversi ma uguali" hanno le stesse proprietà
clonedCat.color = "white"; // se aggiungo una proprietà all'oggetto clonato non avrò corrispondenza di uguaglianza

// estraggo i nomi delle proprietà dell'oggetto copiato
const clonedCatKeys = Object.keys(clonedCat); // array di proprietà
console.log(clonedCatKeys);

let isSameObj = true; // variabile di controllo

// ciclo ogni proprietà dell'array clonedCatKeys
for (let key of clonedCatKeys) {
  // verifico se una proprietà contenuta in clonedCat non esiste in cat originale
  if (!cat.hasOwnProperty(key)) {
    // se siamo qui i due oggetti non corrispondono
    isSameObj = false;
  }
}
console.log(isSameObj);

// (shallow) clonare un oggetto in maniera superficiale con Object.assign()
const cat3 = Object.assign({}, cat, dog, { planet: "earth" });
console.log(cat3);

// (shallow) clonare un oggetto in maniera superficiale con lo spread operator
const cat4 = { ...cat, ...dog, planet: "mars", age: 10 };
console.log(cat4);

const teacher = {
  name: "Stefano",
  skills: ["HTML", "CSS", "JS"]
};

const teacher2 = { ...teacher, skills: [...teacher.skills] }; // questo metodo che copia esplicitamente una sotto referenza
teacher2.skills.push("React");
console.log(teacher2.skills);
console.log(teacher.skills);

// (deep) clonazione anche di sotto-referenze tramite metodi JSON (costoso a livello di performance)
// const teacher2 = {...teacher} // questo metodo produce una copia shallow, quindi le sotto referenze non vengono clonate automaticamente
const teacherStringified = JSON.stringify(teacher);
console.log(teacherStringified);

const teacher3 = JSON.parse(teacherStringified);
console.log(teacher3);
teacher3.skills.push("Java");
console.log(teacher3.skills);
console.log(teacher.skills);

// (deep) clonazione tramite structuredCloned (da preferire quando si hanno molte sotto-referenze da copiare)
const teacher4 = structuredClone(teacher);

teacher4.skills.push("VueJS");
console.log(teacher);
console.log(teacher4);
