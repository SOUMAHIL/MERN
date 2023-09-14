const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "signup"
});

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données:", err);
        return;
    }
    console.log("Connexion à la base de données réussie");
});

app.get('/', (req, res) => {
    res.send("Bonjour, ceci est un petit message sur l'endpoint /");
});

app.post('/signup', (req, res) => {
    console.log(req.body);
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)"; // Corrected SQL query
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => { // Removed array brackets around 'values'
        if (err) {
            console.error("Erreur lors de l'insertion des données:", err);
            return res.json("Erreur");
        }
        return res.json("Données insérées avec succès");
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ?"; // Corrected SQL query
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.error("Erreur lors de la requête de connexion:", err);
            return res.json("Erreur");
        }
        if (data.length > 0) {
            return res.json("Succès");
        } else {
            return res.json("Échec");
        }
    });
});

app.listen(8081, () => {
    console.log("Le serveur écoute sur le port 8081");
});
