
import { useState } from "react";
import { useNavigate } from "react-router";

function Connexion() {
  // États des champs du formulaire
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  // État du message
  const [erreur, setErreur] = useState("");

  // Permet de naviguer vers une autre page
  const navigate = useNavigate();

  function handleSubmit(e) {
    // Empêche le rechargement de la page
    e.preventDefault();

    // Vérification des champs
    if (email.trim() === "" || motDePasse.trim() === "") {
      setErreur("Veuillez remplir tous les champs.");
      return;
    }

    // Simulation de connexion
    if (email === "test@teranga.sn" && motDePasse === "123456") {
      setErreur("");

      // Redirection vers l'espace personnel
      navigate("/mon-espace");
    } else {
      setErreur("Adresse email ou mot de passe incorrect.");
    }
  }

  return (
    <main className="page-connexion">
      <section className="formulaire-connexion">
        <h1>Connexion</h1>

        <p>
          Connectez-vous pour accéder à votre espace personnel.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="champ-formulaire">
            <label htmlFor="email">Adresse email</label>

            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Exemple : test@teranga.sn"
            />
          </div>

          <div className="champ-formulaire">
            <label htmlFor="motDePasse">Mot de passe</label>

            <input
              type="password"
              id="motDePasse"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              placeholder="Saisissez votre mot de passe"
            />
          </div>

          {erreur && (
            <p className="message-erreur">{erreur}</p>
          )}

          <button type="submit">
            Se connecter
          </button>
        </form>

        <p className="information-connexion">
          Compte de démonstration : test@teranga.sn
          <br />
          Mot de passe : 123456
        </p>
      </section>
    </main>
  );
}

export default Connexion;
