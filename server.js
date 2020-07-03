// express usado para criar e configurar o server
const express = require("express")
const server = express()
const db = require("./db")

const contents = [
    {
        number: "01",
        type: "06h",
        name: "Artur",
        date: "20/06/2020"
    },
    {
        number: "02",
        type: "06h",
        name: "Artur",
        date: "20/06/2020"
    },
    {
        number: "03",
        type: "06h",
        name: "Artur",
        date: "20/06/2020"
    },
    {
        number: "04",
        type: "06h",
        name: "Ernando",
        date: "20/06/2020"
    }
]

// configurar arquivos estáticos
server.use(express.static("public"))

// habilitar o uso do req.body
server.use(express.urlencoded({ extended: true}))

// configurações nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})

//  criação de rota /
server.get("/", function (req, res) {

    db.all(`SELECT * FROM contents`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS!")
        }

        const reversedContent = [...rows].reverse()

        let lastContents = []
        for (content of reversedContent) {
            if (lastContents.length < 10) {
                lastContents.push(content)
            }
        }


        return res.render("index.html", { contents: lastContents })
    })



})

server.get("/latest_pasta", function (req, res) {


    db.all(`SELECT * FROM contents`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS!")
        }


        const reversedContent = [...rows]
        return res.render("latest_pasta.html", { contents: reversedContent })
    })

})

server.post("/", function(req, res) {
    const query = `
    INSERT INTO contents(
        number,
        type,
        name,
        date
    ) VALUES (?,?,?,?);
    `
    const values = [
        req.body.number,
        req.body.type,
        req.body.name,
        req.body.date
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS!")
        }

        return res.redirect("/")
    })
})

// server rodando na porta 3000
server.listen(3000)