import AbstractView from "./AbstractView.js";
 
// une classe qui hérite d'une classe parente AbstractView, 
//laquelle définit le titre de la vue sur "dashboard" lors de son initialisation avec
// des paramètres.

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("dasboard");
  }
  async getHtml() {
    return `
            <h1> Catalogue de Villes </h1>
            <p>Un catalogue de villes est une liste organisée de villes, généralement classées par pays, région ou d'autres critères géographiques. Il s'agit souvent d'une compilation de noms de villes.</p>
            <p class= "citys">
            <a href="/city" data-link class="btn-voir-citys">Voir les citys</a>
            </p>
        `;
  }
}
