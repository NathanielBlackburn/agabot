module.exports = class Author {

    static get Paulo() {
      return new Author('paulo');
    }
  
    static get PTerry() {
      return new Author('pterry');
    }
  
    constructor(name) {
        let authorName = name || '';
        if (authorName.match(/pratchett|terry|discworld|dysk/)) {
            this.name = 'pterry';
        } else {
            this.name = 'paulo';  
        }
    }

    is(author) {
        return author.name == this.name;
    }
  
  };
  