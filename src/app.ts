import { myhtml, svg } from "./html";
import {
  Configply,
} from "./types/type";
function main() {
  const rootStyle = document.createElement("style");
  document.head.appendChild(rootStyle);
  const {
    fetchExtractedColorForTrackEntity,
    fetchExtractedColorForEpisodeEntity,
    fetchExtractedColors
  } = Spicetify.GraphQL.Definitions;
  const rootStyle2 = document.createElement("style");
  document.head.appendChild(rootStyle2);
  const playbarConfig: Configply = JSON.parse(
    Spicetify.LocalStorage.get("playbarConfig")
  ) || {
    uriPassada: "spotify:track:1yJoSwOtQPXcGf3Vzm5DSe",
    uriAtual: "spotify:track:4QhwuCHetQCp96vpG9VgZW",
    imgAtual:"https://i.scdn.co/image/ab67616d0000b2735011018cca4aa7091e08ae93",
    imgPassada:"https://i.scdn.co/image/ab67616d0000b27342ffc7773e7f4ea48e5606a8",
    corSpice: {
      VIBRANT: "#fe01a0",
      undefined: "#010001",
      DESATURATED: "#0c5b95",
      LIGHT_VIBRANT: "#fe01a0",
      DARK_VIBRANT: "#fe01a0",
      VIBRANT_NON_ALARMING: "#fe01a0",
      PROMINENT: "#010001",
    },
    escolhaSpice: "DESATURATED",
    input3color: false,
    inputCorSpice: false,
    curva: 60,
    corAtual: "#0c5b95",
    corPassada: "#010001",
  };

  /*porque?*/
  function update(): HTMLStyleElement[] {
    const post = new Event("Post")
    rootStyle2.innerHTML = `:root{--curva:${playbarConfig.curva}deg}`;
    rootStyle.innerHTML = `:root{--corAtual:${playbarConfig.corAtual};
    --corPassada:${playbarConfig.corPassada};
     --SpiceColors:${playbarConfig.corSpice[playbarConfig.escolhaSpice]};}`;
    meuEstilo.innerHTML = `.main-nowPlayingBar-container,.Root__now-playing-bar,.preview{
	background-image: var( ${
    playbarConfig.inputCorSpice
      ? "--degradeCorSpice"
      : playbarConfig.input3color
      ? "--degrade3colors"
      : "--degradeCorPassada"
  }); }`;
    console.log(
      ` [playbar-dyn] atualizando cores`
    );
      console.log(
        `%c Cor Atual ${playbarConfig.corAtual}`,
        `background-color:${playbarConfig.corAtual}`
      );
       console.log(
         `%c Cor Passada ${playbarConfig.corPassada}`,
         `background-color:${playbarConfig.corPassada}`
       );
        console.log(
          `%c Cor Spice ${playbarConfig.corSpice[playbarConfig.escolhaSpice]}`,
          `background-color:${
            playbarConfig.corSpice[playbarConfig.escolhaSpice]
          }`
        );
    Spicetify.LocalStorage.set("playbarConfig", JSON.stringify(playbarConfig));
    Spicetify.Player.dispatchEvent(post);
    return [rootStyle, rootStyle2, meuEstilo];

  }
  async function esperarDOM() {
    let btn: HTMLInputElement = document.querySelector("#botao");
    let selectColors: HTMLSelectElement = document.querySelector("#colors");
    let curva: HTMLInputElement = document.querySelector("#curva");
    let numeros: HTMLInputElement = document.querySelector("#numeros");
    let inputCorSpice: HTMLInputElement =
      document.querySelector("#inputCorSpice");
    let input3color: HTMLInputElement = document.querySelector("#tresColors");
    input3color.checked = playbarConfig.input3color;
    inputCorSpice.checked = playbarConfig.inputCorSpice;
    selectColors.value = playbarConfig.escolhaSpice;
    curva.value = playbarConfig.curva;
    numeros.value = playbarConfig.curva;
    for (let e of Object.keys(playbarConfig.corSpice)) {
      let opt = document.createElement("option");
      opt.innerText = e == "undefined" ? "PROMINENT" : e;
      opt.value = e;
      opt.selected = opt.value == playbarConfig.escolhaSpice;
      selectColors.options.add(opt);
    }
    btn.addEventListener("click", update);
    selectColors.addEventListener(
      "input",
      () =>
        playbarConfig.escolhaSpice =
          selectColors.value as typeof playbarConfig.escolhaSpice
    );
    function selectState() {
      if (playbarConfig.input3color || playbarConfig.inputCorSpice) {
        selectColors.style.display = "block";
        //@ts-ignore
        document.querySelector(".divSelect>p").style.display = "block";
      } else {
        selectColors.style.display = "none";
        //@ts-ignore
        document.querySelector(".divSelect>p").style.display = "none";
      }
    }
    selectState();
    input3color.addEventListener("input", () => {
      playbarConfig["input3color"] = input3color.checked;
      playbarConfig["inputCorSpice"] = false;
      inputCorSpice.checked = false;
      selectState();
    });
    inputCorSpice.addEventListener("input", () => {
      playbarConfig["inputCorSpice"] = inputCorSpice.checked;
      playbarConfig["input3color"] = false;
      input3color.checked = false;
      selectState();
    });
    numeros.value = curva.value;
    numeros.addEventListener("input", () => {
      curva.value = numeros.value;
      playbarConfig.curva = curva.value;
    });
    curva.addEventListener("input", () => {
      numeros.value = curva.value;
      playbarConfig.curva = curva.value;
    });
  }
  /* Apenas um pequeno teste */
  function meuElemento(): string {
    let newElement = document.createElement("div");
    newElement.classList.add("preview");
    return newElement.outerHTML;
  }

  const button = new Spicetify.Playbar.Button(
    "Play Config",
    svg,
    () => {
      button.active = true;
      Spicetify.PopupModal.display({
        title: "PlayBar Config",
        content: myhtml(),
        isLarge: true,
      });
      esperarDOM();
      document
        .querySelector(".GenericModal__overlay")

    },
    false
  );

  const meuEstilo = document.createElement("style");
  document.head.appendChild(meuEstilo);
  let imgAtual = playbarConfig.imgPassada
  
  async function fetchUris() {
    let uriAtual = Spicetify.Player.data.item.uri || playbarConfig.uriAtual;
     let uripassada:string;
     let imgPassada:string;  
     let  catchColors;
    if(fetchExtractedColors){
      imgPassada = imgAtual
       uripassada = uriAtual;
      imgAtual = Spicetify.Player.data.item.images[0].url
       catchColors = await Spicetify.GraphQL.Request(fetchExtractedColors, {
         imageUris: [imgAtual],
         uris: [imgAtual],
       });
    }else{
    let query =  verificarTipo();
     uripassada = uriAtual;
    uriAtual = Spicetify.Player?.data?.item?.uri || playbarConfig.uriAtual;
     catchColors = await Spicetify.GraphQL.Request(query, { uri: uriAtual });
  }
    console.log(catchColors);
    const coresPassada = playbarConfig.corAtual;
    const coresAtual =percorrerObjs(catchColors).hex;
    const coresSpice = await Spicetify.colorExtractor(uriAtual)?? {
      VIBRANT: "#fe01a0",
      undefined: "#010001",
      DESATURATED: "#0c5b95",
      LIGHT_VIBRANT: "#fe01a0",
      DARK_VIBRANT: "#fe01a0",
      VIBRANT_NON_ALARMING: "#fe01a0",
      PROMINENT: "#010001",
    }
    playbarConfig.uriPassada = uripassada;
    playbarConfig.corAtual = coresAtual;
    playbarConfig.imgPassada = imgPassada
    playbarConfig.corPassada = coresPassada;
    playbarConfig.corSpice = coresSpice;
    console.log(
      `[playbar-dyn]Pegando Uris: Cod Musica Atual ${uriAtual}  cod musica passado ${uripassada}`
    );
    return { coresAtual, coresPassada, coresSpice };
  }
  Spicetify.Player.addEventListener("songchange", async () => {
    await fetchUris();
    update();
  });

  update();
  let verificarTipo = () => {
    if (Spicetify.Player.data.item?.type == "episode") {
      console.log(Spicetify.Player.data.item?.type);
      return  fetchExtractedColorForEpisodeEntity;
    } else {
      console.log(Spicetify.Player.data.item?.type);
      return  fetchExtractedColorForTrackEntity;
    }
  };
  let percorrerObjs = ( obj:any): { hex: string } => {
    if(typeof obj != "object") return
    if (obj.hasOwnProperty("hex")) {
      return obj;
    }  else {
      let o;
      for (let i of Object.keys(obj)) {
        o = percorrerObjs(obj[i]);
        if (o?.hex) return o;
      }
    }
  }; 

  function body() {
    let myBody = document.querySelector("body");
    let id: number;
    if (myBody) {
      clearInterval(id);
      myBody.setAttribute(
        "style",
        `--degradeCorPassada:linear-gradient(var(--curva), var(--corAtual),var(--corPassada));
						--degradeCorSpice:linear-gradient(var(--curva), var(--corAtual),var(--SpiceColors));
						--degrade3colors:linear-gradient(var(--curva), var(--corAtual),var(--SpiceColors),var(--corPassada));`
      );
    } else {
      id = setInterval(body, 100);
    }
  }

  body();
  update();
  globalThis.fetchUris = fetchUris;
  globalThis.update = update;
  globalThis.playbarConfig = playbarConfig;
  globalThis.playbarConfigButton=button
}

export default main;
