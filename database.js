const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5')

const db = new sqlite3.Database('./db/database.db', err => {
    if (err) {
        return console.error(err.message);
    }
    db.run(`CREATE TABLE word (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            word text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
                db.run(insert, ["admin","admin@example.com",md5("admin123456")])
                db.run(insert, ["user","user@example.com",md5("user123456")])
            }
        });


    console.log('Connected to the in-memory SQLite database.')
});

//
// db.close(err => {
//     if (err) {
//         return console.error(err.message);
//     }
//
//     console.log('Close the database connection')
// });

module.exports = db
