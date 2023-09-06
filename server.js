//ce code crée un serveur Express.js qui sert des fichiers statiques à partir du
//répertoire "frontend/static" et redirige toutes les autres requêtes vers "index.html".
//C'est une configuration courante pour les applications web modernes, en particulier les
// SPAs, où la gestion du routage est principalement effectuée côté client.

const express = require("express");
const path = require("path");
const request = require("request");
const fs = require("fs");

const app = express();

const { PORT, API_URL } = require("./config.js");

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(PORT || 8081, () => {
  //Récupérer les données depuis de l'API (REst)
  request(
    {
      url: API_URL,
      method: "GET",
    },
    (err, response, body) => {
      if (err) {
        console.log(err);
      } else {
        fs.writeFile(
          __dirname + "/frontend/static/js/views/cities.json",
          response.body,
          (err) => {
            if (err) throw err;
            console.log("Success!");
          }
        );
      }
    }
  );
  
  console.log("server is running..");
});
