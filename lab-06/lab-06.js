/*
CIT 281 Lab 6
Ulys Chauncey Drumrongthai
*/

class Book {
    constructor(title, author, pubDate, isbn) {
        this.title = title;
        this.author = author;
        this.pubDate = pubDate;
        this.isbn = isbn;
    }
}

// const atomicHabits = new Book("Atomic Habits", "James Clear", "10/16/2018")

class Library {
    constructor(name) {
        this._name = name;
        this._books = [];
    }

    get books() {
        return JSON.parse(JSON.stringify(this._books));
    }

    get count() {
        return this._books.length;
    }

    addBook(book = {}) {
        const { title = "", author = "", pubDate = "", isbn="" } = book;
        if (title.length > 0 && author.length > 0 && isbn.length > 0) {
            const newBook = { title, author, pubDate, isbn };
            this._books.push(newBook);
        }
    }

    listBooks() {
        for (const book of this._books) {
            const { title, author, pubDate } = book;
            console.log(`Title: ${title}, Author: ${author}, PubDate: ${pubDate}`);
        }
    }

    deleteBook(isbn) {
        const initialCount = this._books.length;
        this._books = this._books.filter(book => book.isbn !== isbn);

        if (this._books.length < initialCount) {
            console.log(`Book with ISBN ${isbn} has been deleted.`);    
        } else { console.log(`No book found with ISBN ${isbn}.`);}
    }
}

    /* -------------------------------------------------------------------------- */
    /*                                    Tests                                   */
    /* -------------------------------------------------------------------------- */

    /* ----------------------- Create a New Library Object ---------------------- */
const library = new Library("New York Times Best Seller List");

// Create books
const atomicHabits = new Book("Atomic Habits", "James Clear", "10/16/2018", "0735211299");
const theHillWeClimb = new Book("The Hill We Climb", "David Baldacci", "03/30/2021", "059346527X");
const oceanPrey = new Book("Ocean Prey", "John Sandford", "04/13/2021", "1398505501");

// Add books to library and output library count and books
library.addBook(atomicHabits);
library.addBook(theHillWeClimb);
library.addBook(oceanPrey);
console.log(`Book count: ${library.count}`);
library.listBooks();

// Delete a book and output library books
console.log("* Library after delete *");
library.deleteBook("059346527X");
library.listBooks();

//     /* ------------------------ Create a New Book Object ------------------------ */
// const atomicHabits = new Book("Atomic Habits", "James Clear", "10/16/2018")

//     /* --------------------------- Add Book to Library -------------------------- */
// library.addBook(atomicHabits);

//     /* ---------------------- Output Library Count & Books ---------------------- */
// console.log(`Book count: ${library.count}`);
// library.listBooks();


//     /* -------------------------------------------------------------------------- */
//     /*                 Add Two or More Extra Books to the Library                 */
//     /* -------------------------------------------------------------------------- */
// const noLongerHuman = new Book("No Longer Human", "Osamu Dazai", "NA/NA/1948")
// library.addBook(noLongerHuman)

// const kafkaOnTheShore = new Book("Kafka on the Shore", "Haruki Murakami", "09/12/2002")
// library.addBook(kafkaOnTheShore)

// console.log(`Book count: ${library.count}`);
// library.listBooks();

