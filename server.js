// express usado para criar e configurar o server
const express = require ("express")
const server = express()

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

// configurações nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true
})

//  criação de rota /
server.get("/", function(req, res){
    const reversedContent = [...contents].reverse()

    let lastContents = []
    for (content of reversedContent){
        if(lastContents.length < 10){
            lastContents.push(content)
        }
    }


    return res.render("index.html", { contents: lastContents })
})

server.get("/latest_pasta", function(req,res){
    return res.render("latest_pasta.html", { contents })
})

// server rodando na porta 3000
server.listen(3000)