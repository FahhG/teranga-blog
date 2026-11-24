
import { Link } from "react-router";

function Introuvable() {
  return (
    <main className="page-introuvable">
      <section className="contenu-404">
        <h1>404</h1>

        <h2>Page introuvable</h2>

        <p>
          Désolé, la page que vous recherchez n'existe pas
          ou a été déplacée.
        </p>

        <Link to="/" className="bouton-accueil">
          Retourner à l'accueil
        </Link>
      </section>
    </main>
  );
}

export default Introuvable;
