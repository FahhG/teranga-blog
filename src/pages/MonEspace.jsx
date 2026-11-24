
import { useNavigate, Navigate } from "react-router";

function MonEspace() {
  // Vérifier si un utilisateur est connecté
  const email = localStorage.getItem("utilisateurConnecte");

  const navigate = useNavigate();

  // Si aucun utilisateur n'est connecté, retourner à la connexion
  if (!email) {
    return <Navigate to="/connexion" replace />;
  }

  // Fonction de déconnexion
  function handleDeconnexion() {
    localStorage.removeItem("utilisateurConnecte");
    navigate("/connexion");
  }

  return (
    <main className="page-mon-espace">
      <section className="espace-personnel">
        <h1>Bienvenue dans votre espace personnel !</h1>

        <p>
          Vous êtes connecté avec l'adresse :
        </p>

        <p className="email-utilisateur">
          <strong>{email}</strong>
        </p>

        <p>
          Vous pouvez maintenant profiter de votre espace
          personnel sur Teranga Blog.
        </p>

        <button type="button" onClick={handleDeconnexion}>
          Se déconnecter
        </button>
      </section>
    </main>
  );
}

export default MonEspace;
