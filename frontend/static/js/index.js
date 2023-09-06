import Dashboard from "./views/Dashboard.js";
import City from "./views/City.js";
import CityView from "./views/CityView.js";

//9
 
const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );
  

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

//1
const router = async () => {
  const routes = [
    { path: "/", view: Dashboard },
    { path: "/city", view: City },
    { path: "/city-view/:id", view: CityView },
  ];

  //2 match function
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      //isMatch: location.pathname === route.path
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  //3
  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      //isMatch: true
      result: [location.pathname],
    };
  }

  //7 instance de la classse
  const view = new match.route.view(getParams(match));

  document.querySelector("#app").innerHTML = await view.getHtml();
};

//4 recuperer le pathname
const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};
//5
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    // console.log(e.target);
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });
  router();
});

//8 history

window.addEventListener("popstate", router);
