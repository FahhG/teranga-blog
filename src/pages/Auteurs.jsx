
import { useEffect, useState } from "react";
import { Link } from "react-router";

import { API_URL } from "../constants.js";

import EtatRequete from "../components/EtatRequete";

function Auteurs() {
  // État pour stocker les auteurs
  const [auteurs, setAuteurs] = useState([]);

  // États pour gérer le chargement et les erreurs
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Récupération des auteurs depuis l'API
  useEffect(() => {
    async function chargerAuteurs() {
      try {
        setChargement(true);
        setErreur(null);

        const reponse = await fetch(`${API_URL}/users`);

        if (!reponse.ok) {
          throw new Error("Impossible de récupérer les auteurs.");
        }

        const donnees = await reponse.json();

        setAuteurs(donnees);
      } catch (error) {
        setErreur(error.message);
      } finally {
        setChargement(false);
      }
    }

    chargerAuteurs();
  }, []);

  return (
    <main className="page-auteurs">
      <section className="entete-page">
        <h1>Nos auteurs</h1>
        <p>
          Découvrez les personnes qui partagent leurs articles
          sur Teranga Blog.
        </p>
      </section>

      <EtatRequete chargement={chargement} erreur={erreur}>
        <div className="liste-auteurs">
          {auteurs.map((auteur) => (
            <article className="carte-auteur" key={auteur.id}>
              <h2>{auteur.name}</h2>

              <p>
                <strong>Nom d'utilisateur :</strong> {auteur.username}
              </p>

              <p>
                <strong>Email :</strong> {auteur.email}
              </p>

              <p>
                <strong>Ville :</strong> {auteur.address.city}
              </p>

              <Link to={`/auteurs/${auteur.id}`}>
                Voir le profil
              </Link>
            </article>
          ))}
        </div>
      </EtatRequete>
    </main>
  );
}

export default Auteurs;
