import React from "react";
import { svg } from "./html";
import { Model } from "./modal";
import { playbarConfig, SPICETIFY_KEY } from "./consts";
import { Configply } from "./types/type";
import { percorrerObjs, verificarTipo } from "./utilis";


function main() {
  let rootStyle2, rootStyle
  const {
    fetchExtractedColors
  } = Spicetify.GraphQL.Definitions;

  globalThis.playbarConfig = playbarConfig;
  function update(): HTMLStyleElement[] {
    const { playbarConfig } = globalThis as any as { playbarConfig:Configply}

    if (!rootStyle) {
      rootStyle = document.createElement("style")
      document.head.appendChild(rootStyle);
    };
    if (!rootStyle2) {
      rootStyle2 = document.createElement("style")
      document.head.appendChild(rootStyle2);
    }
  
   
    const post = new Event("Post")
    rootStyle2.innerHTML  = `:root{--curva:${playbarConfig.curva}deg}`;
    rootStyle.innerHTML = `:root{--corAtual:${playbarConfig.corAtual};
    --corPassada:${playbarConfig.corPassada};
     --SpiceColors:${playbarConfig.colorExtracing[playbarConfig.escolhaSpice]};}`;
    meuEstilo.innerHTML = `.main-nowPlayingBar-container,.preview{
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
          `%c Cor Spice ${playbarConfig.colorExtracing[playbarConfig.escolhaSpice]??"sla"}`,
          `background-color:${
          playbarConfig.colorExtracing[playbarConfig.escolhaSpice]??'sla'
          }`
        );
    Spicetify.LocalStorage.set(SPICETIFY_KEY, JSON.stringify(playbarConfig));
    Spicetify.Player.dispatchEvent(post);
    return [rootStyle, rootStyle2, meuEstilo];

  }
  
  const button = new Spicetify.Playbar.Button(
    "Play Config",
    svg,
    () => {
      button.active = true;
      Spicetify.PopupModal.display({
        title: "PlayBar Config",
        content: <Model/>,
        isLarge: true,
      });

    },
    false
  );

  const meuEstilo = document.createElement("style");
  document.head.appendChild(meuEstilo);
  let imgAtual = playbarConfig.imgPassada
  
  async function fetchUris() {
    const { playbarConfig } = globalThis as any as { playbarConfig: Configply }
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
      imgPassada = imgAtual
      uripassada = uriAtual;
    uriAtual = Spicetify.Player?.data?.item?.uri || playbarConfig.uriAtual;
     catchColors = await Spicetify.GraphQL.Request(query, { uri: uriAtual });
  }
    console.log(catchColors);
    const coresPassada = playbarConfig.corAtual;
    const coresAtual =percorrerObjs(catchColors).hex;
    const [coresSpice] = await Spicetify.extractColorPreset(Spicetify.Player.data.item.images.pop().url)
    playbarConfig.uriPassada = uripassada;
    playbarConfig.corAtual = coresAtual;
    playbarConfig.imgPassada = imgPassada
    playbarConfig.corPassada = coresPassada;
    playbarConfig.colorExtracing = {
      colorDark:coresSpice.colorDark.toCSS(Spicetify.Color.CSSFormat.HEX),
      colorLight: coresSpice.colorLight.toCSS(Spicetify.Color.CSSFormat.HEX),
      colorRaw:  coresSpice.colorRaw.toCSS(Spicetify.Color.CSSFormat.HEX)
    }
    console.log(
      `[playbar-dyn]Pegando Uris: Cod Musica Atual ${uriAtual}  cod musica passado ${uripassada}`
    );
    Spicetify.LocalStorage.set(SPICETIFY_KEY, JSON.stringify(playbarConfig))
    return { coresAtual, coresPassada, coresSpice };
  }
  Spicetify.Player.addEventListener("songchange", async () => {
    await fetchUris();
    update();
  });


  update();

  function body() {
    let myBody = document.body;
      myBody.setAttribute(
        "style",
        `--degradeCorPassada:linear-gradient(var(--curva), var(--corAtual),var(--corPassada));
						--degradeCorSpice:linear-gradient(var(--curva), var(--corAtual),var(--SpiceColors));
						--degrade3colors:linear-gradient(var(--curva), var(--corAtual),var(--SpiceColors),var(--corPassada));`
      );
  
  }

  body();
  update();
  globalThis.fetchUris = fetchUris;
  globalThis.update = update;

  globalThis.playbarConfigButton=button

  Spicetify.Player.addEventListener("update",update)
}

export default main;
