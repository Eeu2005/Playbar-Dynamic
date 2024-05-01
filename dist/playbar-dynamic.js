(async function() {
        while (!Spicetify.React || !Spicetify.ReactDOM) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        var playbarDdynamic = (() => {
  // src/types/html.ts
  var myhtml = `
<style>
  input[type="range"] {
    width: calc(90% - 20px);
    appearance: auto;
    accent-color: var(--spice-main);
  }

  input,
  input:active,
  input:focus-visible {
    outline: none;
    border-radius: 2px;
    border: none;
  }
  input:focus-visible{
    outline:solid  1px var(--spice-text);
  }

  
  #numeros {
    margin-left: 10px;
    width: 60px;
    background: var(--spice-main);
    color: var(--spice-text);
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

  .sla {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
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
    color: var(--spice-text);
    border-radius: 5px;
  }

  #botao:active {
    background-color: var(--corAtual);
    box-shadow: 0px 0px 17px 5px #404040;
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
    background-color: var(--spice-main);
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
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
.div{
  display: flex;
   gap: 15px;
  align-items: center;
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
.preview{
  width:100%;
  margin: 11px;
    border-radius: 2px;
    height: 40px;
}

  
</style>
<div class="sla">
  <input type="range" max="360.5" value="document.querrySelector('#numeros').value" id="curva" />
  <input type="number" max="360.5" value="document.querrySelector('#curva').value" id="numeros" />
</div>
<div class="conteiner">
  <div>
    <p>spicetify? </p>
    <label for="inputCorSpice" id="switch">
      <input type="checkbox" name="cor_1"
        id="inputCorSpice"/>
      <div class="myslider round"></div>
    </label>
  </div>
  <div>
    <p>3 Colors?</p>
    <label for="tresColors" id="switch">
      <input type="checkbox" name="" id="tresColors">
    <div class="myslider round"></div>
    </label>
  </div>
  <select name="colors" id="colors">
    <option value="DESATURATED">DESATURATED</option>
    <option value="LIGHT_VIBRANT">LIGHT_VIBRANT</option>
    <option value="undefined">PROMINENT</option>
    <option value="VIBRANT">VIBRANT</option>
    <option value="VIBRANT_NON_ALARMING">VIBRANT_NON_ALARMING</option>
  </select>
</div>
<input type="button" id="botao" value="save"/>
<p>preview</p>`;
  var svg = `<svg role="img" height="20" width="20" viewBox="0 0 16 16" fill="currentColor"><path d="M11.472.279L2.583 10.686l-.887 4.786 4.588-1.625L15.173 3.44 11.472.279zM5.698 12.995l-2.703.957.523-2.819v-.001l2.18 1.863zm-1.53-2.623l7.416-8.683 2.18 1.862-7.415 8.683-2.181-1.862z"></path>
</svg> <path d="M11.472.279L2.583 10.686l-.887 4.786 4.588-1.625L15.173 3.44 11.472.279zM5.698 12.995l-2.703.957.523-2.819v-.001l2.18 1.863zm-1.53-2.623l7.416-8.683 2.18 1.862-7.415 8.683-2.181-1.862z"</path></svg>`;

  // src/app.tsx
  async function main() {
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
    function update() {
      rootStyle2.innerHTML = `:root{--curva:${playbarConfig.curva}deg}`;
      rootStyle.innerHTML = `:root{--corAtual:${playbarConfig.corAtual};
    --corPassada:${playbarConfig.corPassada};
     --SpiceColors:${playbarConfig.corSpice[playbarConfig.escolhaSpice]};}`;
      Spicetify.LocalStorage.set("playbarConfig", JSON.stringify(playbarConfig));
    }
    async function esperarDOM() {
      let btn = document.querySelector("#botao");
      btn.addEventListener("click", () => {
        update();
        meuEstilo.innerHTML = `.Root__now-playing-bar,.preview{background-image: var( ${playbarConfig.inputCorSpice ? "--degradeCorSpice" : playbarConfig.input3color ? "--degrade3colors" : "--degradeCorPassada"}); }`;
      });
      let selectColors = document.querySelector("#colors");
      let curva = document.querySelector("#curva");
      let numeros = document.querySelector("#numeros");
      let inputCorSpice = document.querySelector("#inputCorSpice");
      let input3color = document.querySelector("#tresColors");
      input3color.checked = playbarConfig.input3color;
      inputCorSpice.checked = playbarConfig.inputCorSpice;
      selectColors.value = playbarConfig.escolhaSpice;
      !curva && !numeros ? setInterval(esperarDOM, 1e4) : curva.value = String(playbarConfig.curva);
      selectColors.addEventListener("input", () => {
        playbarConfig.escolhaSpice = selectColors.value;
      });
      input3color.addEventListener("input", () => {
        playbarConfig["input3color"] = input3color.checked;
        playbarConfig["inputCorSpice"] = false;
        inputCorSpice.checked = false;
      });
      inputCorSpice.addEventListener("input", () => {
        playbarConfig["inputCorSpice"] = inputCorSpice.checked;
        playbarConfig["input3color"] = false;
        input3color.checked = false;
      });
      numeros.value = curva.value;
      numeros == null ? void 0 : numeros.addEventListener("input", () => {
        curva.value = numeros.value;
        playbarConfig.curva = curva.value;
      });
      curva == null ? void 0 : curva.addEventListener("input", () => {
        numeros.value = curva.value;
        playbarConfig.curva = curva.value;
      });
    }
    function meuElemento() {
      var newElement = document.createElement("div");
      newElement.classList.add("preview");
      return newElement.outerHTML;
    }
    const button = new Spicetify.Playbar.Button(
      "Play Config",
      svg,
      () => {
        var _a;
        button.active = true;
        Spicetify.PopupModal.display({
          title: "PlayBar Config",
          content: myhtml + meuElemento(),
          isLarge: true
        });
        esperarDOM();
        (_a = document.querySelector(".GenericModal__overlay")) == null ? void 0 : _a.addEventListener("click", () => button.active = false);
      },
      false
    );
    const meuEstilo = document.createElement("style");
    document.head.appendChild(meuEstilo);
    let uriAtual = playbarConfig.uriPassada;
    Spicetify.Player.addEventListener("songchange", async () => {
      var _a;
      let uripassada = uriAtual;
      uriAtual = ((_a = Spicetify.Player.data.item) == null ? void 0 : _a.images[0].url) || playbarConfig.uriAtual;
      const catchColors = await Spicetify.GraphQL.Request(fetchExtractedColors, { uris: [uripassada, uriAtual] });
      const coresPassada = catchColors.data.extractedColors[0].colorDark.hex;
      const coresAtual = catchColors.data["extractedColors"][1].colorDark.hex;
      let coresSpice = await Spicetify.colorExtractor(uriAtual) || {
        VIBRANT: "#fe01a0",
        undefined: "#010001",
        DESATURATED: "#0c5b95",
        LIGHT_VIBRANT: "#fe01a0",
        DARK_VIBRANT: "#fe01a0",
        VIBRANT_NON_ALARMING: "#fe01a0",
        PROMINENT: "#010001"
      };
      playbarConfig.uriPassada = uripassada;
      playbarConfig.corAtual = coresAtual;
      playbarConfig.corPassada = coresPassada;
      playbarConfig.corSpice = coresSpice;
      update();
    });
    meuEstilo.innerHTML = `.Root__now-playing-bar,.preview{
		background-image: var( ${playbarConfig.inputCorSpice ? "--degradeCorSpice" : playbarConfig.input3color ? "--degrade3colors" : "--degradeCorPassada"}); }`;
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
  }
  var app_default = main;


  (async () => {
    await app_default();
  })();
})();

      })();