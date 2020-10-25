function getContent() {
  let search = document.getElementById("search").value;
  if (typeof search == "string") {
    search = search.toLowerCase();
    //console.log(search);
  }
  searchPokemons(search);
}

const searchPokemons = (pesquisa) => {
  const caminho = "https://pokeapi.co/api/v2/pokemon/" + pesquisa;
  //console.log(caminho);
  fetch(caminho)
    .then((callback) => {
      return callback.json();
    })
    .then((data) => {
      //console.log(data);
      const infos = {};
      infos["nome"] = capitalize(data.name);
      infos["id"] = data.id;
      infos["img"] = data.sprites["front_default"];
      infos["type"] = data.types.map((type) => type.type.name).join(", ");
      document.querySelector("#formulario").style.display = "none";
      document.querySelector("#pokemon").style.display = "initial";
      document.getElementById("id").innerHTML = "ID: " + infos["id"];
      document.getElementById("name").innerHTML = "Nome: " + infos["nome"];
      document.getElementById("type").innerHTML = "Tipo: " + infos["type"];
      document.getElementById("foto").src = infos["img"];
    })
    .catch((err) => {
      document.querySelector("#formulario").style.display = "none";
      document.querySelector("#error").style.display = "initial";
    });
};

const capitalize = (str) => {
  if (typeof str !== "string") {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.substr(1);
};
