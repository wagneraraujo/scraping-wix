/*
 * Solução simples para baixar informações de um site feito em wix
e importar para um novo site em wordpress
*/

const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const url = "";
axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const statsTable = $(".item");
        const aneis = [];

        statsTable.each(function() {
            const nome = $(this)
                .find(".title")
                .text()
                .trim();
            const descricao = $(this)
                .find(".desc")
                .text()
                .trim();
            const imagem = $(this)
                .find("img")
                .attr("src");

            aneis.push({
                nome,
                descricao: descricao,
                imagem
            });
            let json = JSON.stringify(aneis);

            fs.writeFile("./arquivos/aneis-solitarios.json", json, err => {
                if (err) {
                    console.log("alguma coisa errada não está certa");
                } else {
                    console.log("json criado");
                }
            });
        });
    })
    .catch(console.error);
