import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("City");
  }

  async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    const data = await getData("/static/js/views/cities.json");

    let data_lis = data.data.map((item, index) => {
      return `<li class="city"> <a href=/city-view/${item.country} > ${item.country} </a></li>`;
    });
    
//génèrer dynamiquement une structure HTML en utilisant les données du tableau
// data_lis et renvoie cette structure sous forme de chaîne de caractères HTML.
    let dataHtml = `
    <div>
    <h1>City</h1>
    <ul class="cities">
    ${data_lis.join("")}
    </ul>
    </div>`;

    return dataHtml;
  }
}
