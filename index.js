const express = require("express");
const app = express();
app.use(express.json());
let joueurs = [
  { id: 1, position: "ST", nom: "John Doe", numero: 5 },
  { id: 2, position: "CAM", nom: "Jane Doe", numero: 10 },
  { id: 3, position: "GK", nom: "Bob Johnson", numero: 1 },
];

app.get("/joueurs", (req, res) => {
  res.json(joueurs);
});
app.get("/joueurs/:id", (req, res) => {
  const joueur = joueurs.find((j) => j.id === parseInt(req.params.id));
  if (!joueur) return res.status(404).send("Joueur non trouvé");
  res.json(joueur);
});
app.post("/joueurs/add", (req, res) => {
  let id = req.body.id;
  const joueur = joueurs.find(j => j.id === id);
  if(joueur)
  res.json('already added');
  else{
    joueurs.push(req.body);
    res.json('added successfully')
  }
});

app.put("/joueurs/:id", (req, res) => {
  let id =parseInt(req.params.id);
  const index = joueurs.find(j => j.id === id);
  if(!index)
  res.json('joueur not found');
  else{
    index.nom=req.body.nom
    index.position=req.body.position
    index.numero=req.body.numero
    res.json('joueur modifie successfully')
  }
})


app.delete("/joueurs/del/:id",(req, res) => {
  let id = parseInt(req.params.id);
  const joueurIndex = joueurs.filter((j) => j.id === id);
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
