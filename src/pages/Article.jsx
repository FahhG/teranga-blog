
import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router";

import { API_URL } from "../constants.js";

import EtatRequete from "../components/EtatRequete";
import ListeCommentaires from "../components/ListeCommentaires";
import CommentaireForm from "../components/CommentaireForm";

function Article() {
  // Récupération de l'identifiant depuis l'URL
  const { id } = useParams();

  // Récupération des favoris depuis le layout
  const { favoris, onBasculerFavori } = useOutletContext();

  // États de l'article et des commentaires
  const [article, setArticle] = useState(null);
  const [commentaires, setCommentaires] = useState([]);

  // États pour gérer le chargement et les erreurs
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  // Récupération de l'article et de ses commentaires depuis l'API
  useEffect(() => {
    const controleur = new AbortController();

    async function chargerArticle() {
      try {
        setChargement(true);
        setErreur(null);
        setArticle(null);
        setCommentaires([]);

        const reponseArticle = await fetch(
          `${API_URL}/posts/${id}`,
          { signal: controleur.signal }
        );

        if (!reponseArticle.ok) {
          throw new Error("Impossible de récupérer cet article.");
        }

        const donneesArticle = await reponseArticle.json();

        // Vérifier si l'article existe
        if (!donneesArticle.id) {
          throw new Error("Article introuvable.");
        }

        const reponseCommentaires = await fetch(
          `${API_URL}/posts/${id}/comments`,
          { signal: controleur.signal }
        );

        if (!reponseCommentaires.ok) {
          throw new Error("Impossible de récupérer les commentaires.");
        }

        const donneesCommentaires = await reponseCommentaires.json();

        setArticle(donneesArticle);
        setCommentaires(donneesCommentaires);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErreur(error.message);
        }
      } finally {
        if (!controleur.signal.aborted) {
          setChargement(false);
        }
      }
    }

    chargerArticle();

    // Annuler les requêtes si l'identifiant change
    // ou si le composant est démonté
    return () => {
      controleur.abort();
    };
  }, [id]);

  // Ajouter un nouveau commentaire localement
  function onAjouterCommentaire(nouveauCommentaire) {
    setCommentaires((anciensCommentaires) => [
      nouveauCommentaire,
      ...anciensCommentaires,
    ]);
  }

  // Vérifier si l'article est dans les favoris
  const estFavori = article
    ? favoris.includes(article.id)
    : false;

  return (
    <main className="page-article">
      <EtatRequete chargement={chargement} erreur={erreur}>
        {article && (
          <>
            <article className="detail-article">
              <h1>{article.title}</h1>

              <p>{article.body}</p>

              <button
                type="button"
                onClick={() => onBasculerFavori(article)}
              >
                {estFavori
                  ? "Retirer des favoris"
                  : "Ajouter aux favoris"}
              </button>
            </article>

            <section className="section-commentaires">
              <h2>Commentaires</h2>

              <CommentaireForm onAjouter={onAjouterCommentaire} />

              <ListeCommentaires commentaires={commentaires} />
            </section>
          </>
        )}
      </EtatRequete>
    </main>
  );
}

export default Article;
