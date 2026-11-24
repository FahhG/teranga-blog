
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";

function LayoutPrincipal() {
  // État global des favoris
  const [favoris, setFavoris] = useState([]);

  // Ajouter ou retirer un article des favoris
  function onBasculerFavori(article) {
    setFavoris((anciensFavoris) => {
      if (anciensFavoris.includes(article.id)) {
        return anciensFavoris.filter((id) => id !== article.id);
      }

      return [...anciensFavoris, article.id];
    });
  }

  return (
    <div className="layout-principal">
      {/* En-tête du blog */}
      <header className="entete">
        <Link to="/" className="logo">
          <img
            src="/logo-teranga-blog.png"
            alt="Logo Teranga Blog"
          />
        </Link>

        <nav className="navigation">
          <NavLink to="/" end className="lien-navigation">
            Accueil
          </NavLink>

          <NavLink to="/articles" className="lien-navigation">
            Articles
          </NavLink>

          <NavLink to="/auteurs" className="lien-navigation">
            Auteurs
          </NavLink>

          <NavLink to="/favoris" className="lien-navigation">
            Favoris ({favoris.length})
          </NavLink>
        </nav>
      </header>

      {/* Affichage de la page demandée */}
      <main className="contenu-principal">
        <Outlet
          context={{
            favoris,
            onBasculerFavori,
          }}
        />
      </main>

      {/* Pied de page */}
      <footer className="pied-de-page">
        <p>© 2026 Teranga Blog | Partage et découverte</p>
      </footer>
    </div>
  );
}

export default LayoutPrincipal;
