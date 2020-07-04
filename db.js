const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database('./system.db')

db.serialize(function () {

    // criar a tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS contents(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            number TEXT,
            type TEXT,
            name TEXT,
            date TEXT
        );
    `)

    // inserir dados na tabela
    // const query = `
    // INSERT INTO contents(
    //     number,
    //     type,
    //     name,
    //     date
    // ) VALUES (?,?,?,?);
    // `
    // const values = [
    //     "01",
    //     "06h",
    //     "Artur",
    //     "20/06/2020"
    // ]

    // db.run(query, values, function(err){
    //     if (err) return console.log(err)

    //     console.log(this)
    // })

    // consultar dados na tabela
    // db.all(`SELECT * FROM contents`, function(err, rows){
    //     if (err) return console.log(err)

    //     console.log(rows)
    // })
    
    // Deletar um dado da tabela
    // db.run(`DELETE FROM contents WHERE id = ?`, [13], function(err) {
    //     if (err) return console.log(err)

    //     console.log("DADOS DELETADOS!", this)
    // })
})

module.exports = db