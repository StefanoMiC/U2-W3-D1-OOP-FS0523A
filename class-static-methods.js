class Article {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static isSameAuthor(articleA, articleB) {
    return articleA.author === articleB.author;
  }

  isSameAuthorInstance(articleToCompare) {
    return this.author === articleToCompare.author;
  }
}

const myArticle = new Article("L'importanza dei numeri primi", "Antonio Frascati");

const articles = [
  new Article("La teoria delle stringhe e CSS", "Edward Hopkins"),
  new Article("CSS Fantastici e dove trovarli", "Stefano Miceli"),
  new Article("Pierino e i 40 ladroni", "Daniele Cagnoni"),
  new Article("Ereditarietà e Testamento", "Edward Hopkins")
];

// metodo statico agganciato alla classe principale (non si propaga direttamente ai figli)
// per trovare isSameAuthor devo cercarlo all'interno della classe principale! NON nelle istanze
console.log(Article.isSameAuthor(articles[0], articles[3]));
console.log(Article.isSameAuthor(articles[0], articles[1]));

// metodo non statico agganciato all'istanza della classe
// console.log(articles[0].isSameAuthor(articles[3])); // questo è il metodo statico del costruttore, non è stato propagato ai figli
console.log(articles[0].isSameAuthorInstance(articles[3]));

console.log(articles[0]);
