import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Viewing Citys");
  }

  async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    var country_url = location.pathname.split("/")[2];

    const data = await getData("/static/js/views/cities.json");

    const OneCountry = data.data.find((item, index) => {
      return item.country === country_url;
    });

    let data_lis = OneCountry.cities.map((item, index) => {
      return `<li class="country">${item}</li>`;
    });
// génère dynamiquement une structure HTML pour afficher une liste de pays, 
//en incluant le nom du pays dans le titre <h1> et en utilisant les données du 
//tableau data_lis pour remplir une liste non ordonnée <ul>.
    let dataHtml = `
      <div>
      <h1>Countries of ${OneCountry.country}</h1>
      <ul class="countries">
      ${data_lis.join("")}
      </ul>
      </div>`;

    return dataHtml;
  }
}
