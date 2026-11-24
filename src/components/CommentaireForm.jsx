
import { useState } from "react";

function CommentaireForm({ onAjouter }) {
  // États du formulaire
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  // Fonction appelée lors de la soumission
  function handleSubmit(e) {
    e.preventDefault();

    // Vérification des champs
    if (nom.trim() === "" || message.trim() === "") {
      setErreur("Tous les champs sont obligatoires.");
      return;
    }

    if (message.trim().length < 3) {
      setErreur("Le commentaire doit contenir au moins 3 caractères.");
      return;
    }

    // Création du nouveau commentaire
    const nouveauCommentaire = {
      id: Date.now(),
      name: nom.trim(),
      body: message.trim(),
    };

    // Transmission du commentaire au parent
    onAjouter(nouveauCommentaire);

    // Réinitialisation du formulaire
    setNom("");
    setMessage("");
    setErreur("");
  }

  return (
    <form className="form-commentaire" onSubmit={handleSubmit}>
      <h3>Ajouter un commentaire</h3>

      <div className="champ-formulaire">
        <label htmlFor="nom">Votre nom</label>

        <input
          type="text"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Saisissez votre nom"
        />
      </div>

      <div className="champ-formulaire">
        <label htmlFor="message">Votre commentaire</label>

        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écrivez votre commentaire..."
          rows={5}
        />
      </div>

      {erreur && <p className="message-erreur">{erreur}</p>}

      <button type="submit">
        Publier le commentaire
      </button>
    </form>
  );
}

export default CommentaireForm;
