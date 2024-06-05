import { myhtml, svg } from "./types/html";
import { configply } from "./types/type";
function main() {
	const rootStyle = document.createElement("style");
	document.head.appendChild(rootStyle);
	const { fetchExtractedColors } = Spicetify.GraphQL.Definitions;
	const rootStyle2 = document.createElement("style");
	document.head.appendChild(rootStyle2);
	let playbarConfig: configply = JSON.parse(Spicetify.LocalStorage.get("playbarConfig")) || {
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
	function update(): void {
		console.log(playbarConfig);
		rootStyle2.innerHTML = `:root{--curva:${playbarConfig.curva}deg}`;
		rootStyle.innerHTML = `:root{--corAtual:${playbarConfig.corAtual};
    --corPassada:${playbarConfig.corPassada};
     --SpiceColors:${playbarConfig.corSpice[playbarConfig.escolhaSpice]};}`;
		meuEstilo.innerHTML = `.main-nowPlayingBar-container,.Root__now-playing-bar,.preview{
	background-image: var( ${
		playbarConfig.inputCorSpice ? "--degradeCorSpice" : playbarConfig.input3color ? "--degrade3colors" : "--degradeCorPassada"
	}); }`;
		Spicetify.LocalStorage.set("playbarConfig", JSON.stringify(playbarConfig));
	}
	async function esperarDOM() {
		let btn: HTMLInputElement = document.querySelector("#botao") as HTMLInputElement;
		let selectColors: HTMLSelectElement = document.querySelector("#colors");
		let curva: HTMLInputElement = document.querySelector("#curva");
		let numeros: HTMLInputElement = document.querySelector("#numeros");
		let inputCorSpice: HTMLInputElement = document.querySelector("#inputCorSpice");
		let input3color: HTMLInputElement = document.querySelector("#tresColors");
		input3color.checked = playbarConfig.input3color;
		inputCorSpice.checked = playbarConfig.inputCorSpice;
		selectColors.value = playbarConfig.escolhaSpice;
		curva.value = "" + playbarConfig.curva;
		numeros.value = "" + playbarConfig.curva;
		btn.addEventListener("click", update);
		selectColors.addEventListener("input", () => (playbarConfig.escolhaSpice = selectColors.value as typeof playbarConfig.escolhaSpice));
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
			esperarDOM();
			document.querySelector(".GenericModal__overlay").addEventListener("click", () => (button.active = false));
		},
		false
	);
	const meuEstilo = document.createElement("style");
	document.head.appendChild(meuEstilo);
	let uriAtual = playbarConfig.uriAtual;
	async function fetchUris() {
		let uripassada = uriAtual;
		uriAtual = Spicetify.Player.data.item?.images[0].url || playbarConfig.uriAtual;
		const catchColors = await Spicetify.GraphQL.Request(fetchExtractedColors, { uris: [uripassada, uriAtual] });
		const coresPassada = catchColors.data.extractedColors[0].colorDark.hex;
		const coresAtual = catchColors.data.extractedColors[1].colorDark.hex;
		const coresSpice = await Spicetify.colorExtractor(uriAtual);
		playbarConfig.uriPassada = uripassada;
		playbarConfig.corAtual = coresAtual;
		playbarConfig.corPassada = coresPassada;
		playbarConfig.corSpice = coresSpice;
		console.log(`Pegando Uris: Cod Musica Atual ${uriAtual} cod musica passado ${uripassada}`);
	}
	Spicetify.Player.addEventListener("songchange", async () => {
		await fetchUris();
		update();
	});

	update();

	function body() {
		let myBody = document.querySelector("body");
		myBody
			? myBody.setAttribute(
					"style",
					`--degradeCorPassada:linear-gradient(var(--curva), var(--corAtual),var(--corPassada));
						--degradeCorSpice:linear-gradient(var(--curva), var(--corAtual),var(--SpiceColors));
						--degrade3colors:linear-gradient(var(--curva), var(--corAtual),var(--SpiceColors),var(--corPassada));`
			  )
			: setInterval(body, 1000);
	}

	body();
	update();
	globalThis.fetchUris = fetchUris;
	globalThis.update = update;
	globalThis.playbarConfig = playbarConfig;
}

export default main;
