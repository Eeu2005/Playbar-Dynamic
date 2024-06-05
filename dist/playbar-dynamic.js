(async function() {
        while (!Spicetify.React || !Spicetify.ReactDOM) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        var playbarDdynamic = (() => {
  // src/types/html.ts
  var lingua = {
    "pt-BR": ["Rota\xE7\xE3o do degrade (Em deg)", "cores", "tons das cores spicetify"],
    "pt-PT": ["Rota\xE7\xE3o do degrade (Em deg)", "cores", "tons das cores spicetify"],
    "es-ES": ["Rotation of gradient (deg)", "colors", "color shades of  Spicetify"]
  };
  function myhtml() {
    let localidade = Spicetify.Locale.getLocale();
    let linguaEscolhida = lingua[localidade] ? lingua[localidade] : lingua["es-ES"];
    const html = `<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: var(--spice-subtext) !important;
  }
  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

  input[type="range"] {
    width: calc(90% - 20px);
    appearance: auto;
    accent-color: var(--spice-main);
  }

  input,
  input:active {
    padding: 0 !important;
    outline: none;
    border-radius: 2px;
    border: none;
  }

  #numeros:focus {
    border: solid 1px var(--spice-text);
  }


  #numeros {
    margin-left: 10px;
    width: 60px;
    background: var(--spice-main);
    
  }

  #switch {
    display: inline-block;
    height: 27px;
    position: relative;
    width: 52px;
  }

  input[type="checkbox"] {
    display: none;
  }

  .divCurva {
    text-align: center;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100%;
  }

  .divBotoes {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .myslider {
    background-color: #ccc;
    bottom: 0;
    cursor: pointer;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: 0.4s;
  }

  #botao {
    height: 30px;
    width: 50px;
    background-color: var(--spice-main);
    border-radius: 5px;
    margin-top: 50px;
  }

  #botao:active {
    background-color: var(--corAtual) !important;
    box-shadow: 0px 0px 17px 5px #3f3f3f3b;
  }

  #colors {
    border: none;
    background-color: var(--spice-main);
    color: var(--spice-text);
  }

  #colors:active {
    border: none;
  }

  input:checked+.myslider {
    background-color: var(--corAtual);
  }

  input:checked+.myslider:before {
    transform: translateX(26px);
  }

  .myslider.round {
    border-radius: 34px;
  }

  .myslider.round:before {
    border-radius: 50%;
  }

  .conteiner {
    gap: 13px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    flex-direction: column;
    position: relative;
  }


  .myslider:before {
    background-color: #fff;
    bottom: 4px;
    content: "";
    height: 20px;
    left: 4px;
    position: absolute;
    transition: 0.4s;
    width: 20px;
  }

  .preview {
    width: 100%;
    margin: 11px;
    border-radius: 2px;
    height: 40px;
  }

  .divSelect {
    display: inline-flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
<div class="conteiner">
  <div class="divCurva">
    <p>${linguaEscolhida[0]} </p>
    <input type="range" max="360.5" step="0.5" value="30" id="curva" />
    <input type="number" max="360.5" id="numeros" />
  </div>
  <div class="divBotoes">
    <div>
      <p>spicetify? </p>
      <label for="inputCorSpice" id="switch">
        <input type="checkbox" name="cor_1" id="inputCorSpice" />
        <div class="myslider round"></div>
      </label>
    </div>
    <div>
      <p>3 ${linguaEscolhida[1]}</p>
      <label for="tresColors" id="switch">
        <input type="checkbox" name="" id="tresColors">
        <div class="myslider round"></div>
      </label>
    </div>
    <div class="divSelect">
      <p>${linguaEscolhida[2]}</p>
      <select name="colors" id="colors">
        <option value="DESATURATED">DESATURATED</option>
        <option value="LIGHT_VIBRANT">LIGHT_VIBRANT</option>
        <option value="undefined">PROMINENT</option>
        <option value="VIBRANT">VIBRANT</option>
        <option value="VIBRANT_NON_ALARMING">VIBRANT_NON_ALARMING</option>
      </select>
    </div>
  </div>

  <input type="button" id="botao" value="save" />
</div>
<p>preview</p>`;
    return html;
  }
  var svg = `<svg role="img" height="20" width="20" viewBox="0 0 16 16" fill="currentColor">
  <path
    d="M11.472.279L2.583 10.686l-.887 4.786 4.588-1.625L15.173 3.44 11.472.279zM5.698 12.995l-2.703.957.523-2.819v-.001l2.18 1.863zm-1.53-2.623l7.416-8.683 2.18 1.862-7.415 8.683-2.181-1.862z">
  </path>
</svg>
<path
  d="M11.472.279L2.583 10.686l-.887 4.786 4.588-1.625L15.173 3.44 11.472.279zM5.698 12.995l-2.703.957.523-2.819v-.001l2.18 1.863zm-1.53-2.623l7.416-8.683 2.18 1.862-7.415 8.683-2.181-1.862z"
  </path> </svg>`;

  // src/app.tsx
  function main() {
    const rootStyle = document.createElement("style");
    document.head.appendChild(rootStyle);
    const { fetchExtractedColors } = Spicetify.GraphQL.Definitions;
    const rootStyle2 = document.createElement("style");
    document.head.appendChild(rootStyle2);
    let playbarConfig = JSON.parse(Spicetify.LocalStorage.get("playbarConfig")) || {
      uriPassada: "https://i.scdn.co/image/ab67616d0000b2735011018cca4aa7091e08ae93",
      uriAtual: "https://i.scdn.co/image/ab67616d0000b27342ffc7773e7f4ea48e5606a8",
      corSpice: {
        VIBRANT: "#fe01a0",
        undefined: "#010001",
        DESATURATED: "#0c5b95",
        LIGHT_VIBRANT: "#fe01a0",
        DARK_VIBRANT: "#fe01a0",
        VIBRANT_NON_ALARMING: "#fe01a0",
        PROMINENT: "#010001"
      },
      escolhaSpice: "DESATURATED",
      input3color: false,
      inputCorSpice: false,
      curva: 60,
      corAtual: "#0c5b95",
      corPassada: "#010001"
    };
    Object.preventExtensions(playbarConfig);
    function update() {
      console.log(playbarConfig);
      rootStyle2.innerHTML = `:root{--curva:${playbarConfig.curva}deg}`;
      rootStyle.innerHTML = `:root{--corAtual:${playbarConfig.corAtual};
    --corPassada:${playbarConfig.corPassada};
     --SpiceColors:${playbarConfig.corSpice[playbarConfig.escolhaSpice]};}`;
      meuEstilo.innerHTML = `.main-nowPlayingBar-container,.Root__now-playing-bar,.preview{
	background-image: var( ${playbarConfig.inputCorSpice ? "--degradeCorSpice" : playbarConfig.input3color ? "--degrade3colors" : "--degradeCorPassada"}); }`;
      Spicetify.LocalStorage.set("playbarConfig", JSON.stringify(playbarConfig));
    }
    async function esperarDOM() {
      let btn = document.querySelector("#botao");
      let selectColors = document.querySelector("#colors");
      let curva = document.querySelector("#curva");
      let numeros = document.querySelector("#numeros");
      let inputCorSpice = document.querySelector("#inputCorSpice");
      let input3color = document.querySelector("#tresColors");
      input3color.checked = playbarConfig.input3color;
      inputCorSpice.checked = playbarConfig.inputCorSpice;
      selectColors.value = playbarConfig.escolhaSpice;
      curva.value = "" + playbarConfig.curva;
      numeros.value = "" + playbarConfig.curva;
      btn.addEventListener("click", update);
      selectColors.addEventListener("input", () => playbarConfig.escolhaSpice = selectColors.value);
      function selectState() {
        if (playbarConfig.input3color || playbarConfig.inputCorSpice) {
          selectColors.style.display = "block";
          document.querySelector(".divSelect>p").style.display = "block";
        } else {
          selectColors.style.display = "none";
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
    function meuElemento() {
      let newElement = document.createElement("div");
      newElement.classList.add("preview");
      return newElement.outerHTML;
    }
    meuElemento();
    const button = new Spicetify.Playbar.Button(
      "Play Config",
      svg,
      () => {
        button.active = true;
        Spicetify.PopupModal.display({
          title: "PlayBar Config",
          content: myhtml() + meuElemento(),
          isLarge: true
        });
        this.update = update;
        esperarDOM();
        document.querySelector(".GenericModal__overlay").addEventListener("click", () => button.active = false);
      },
      false
    );
    const meuEstilo = document.createElement("style");
    document.head.appendChild(meuEstilo);
    let uriAtual = playbarConfig.uriAtual;
    async function fetchUris() {
      var _a;
      let uripassada = uriAtual;
      uriAtual = ((_a = Spicetify.Player.data.item) == null ? void 0 : _a.images[0].url) || playbarConfig.uriAtual;
      const catchColors = await Spicetify.GraphQL.Request(fetchExtractedColors, { uris: [uripassada, uriAtual] });
      const coresPassada = catchColors.data.extractedColors[0].colorDark.hex;
      const coresAtual = catchColors.data.extractedColors[1].colorDark.hex;
      const coresSpice = await Spicetify.colorExtractor(uriAtual);
      playbarConfig.uriPassada = uripassada;
      playbarConfig.corAtual = coresAtual;
      playbarConfig.corPassada = coresPassada;
      playbarConfig.corSpice = coresSpice;
      console.log(`Pegando Uris: Cod Musica Atual${uriAtual} cod musica passado ${uripassada}`);
    }
    Spicetify.Player.addEventListener("songchange", async () => {
      await fetchUris();
      update();
    });
    update();
    function body() {
      let myBody = document.querySelector("body");
      myBody ? myBody.setAttribute(
        "style",
        `--degradeCorPassada:linear-gradient(var(--curva), var(--corAtual),var(--corPassada));
						--degradeCorSpice:linear-gradient(var(--curva), var(--corAtual),var(--SpiceColors));
						--degrade3colors:linear-gradient(var(--curva), var(--corAtual),var(--SpiceColors),var(--corPassada));`
      ) : setInterval(body, 1e3);
    }
    body();
    update();
    globalThis.fetchUris = fetchUris;
    globalThis.update = update;
    globalThis.playbarConfig = playbarConfig;
  }
  var app_default = main;

  // ../../../Users/emanuel/AppData/Local/Temp/spicetify-creator/index.jsx
  (async () => {
    await app_default();
  })();
})();

      })();