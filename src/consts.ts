import { Configply } from "./types/type";

export const SPICETIFY_KEY = "PlayBarConfig"

export const DEFAULT_VALUE: Configply = {
    uriPassada: "spotify:track:1yJoSwOtQPXcGf3Vzm5DSe",
    uriAtual: "spotify:track:4QhwuCHetQCp96vpG9VgZW",
    imgAtual: "https://i.scdn.co/image/ab67616d0000b2735011018cca4aa7091e08ae93",
    imgPassada: "https://i.scdn.co/image/ab67616d0000b27342ffc7773e7f4ea48e5606a8",
    corSpice: {
        VIBRANT: "#fe01a0",
        undefined: "#010001",
        DESATURATED: "#0c5b95",
        LIGHT_VIBRANT: "#fe01a0",
        DARK_VIBRANT: "#fe01a0",
        VIBRANT_NON_ALARMING: "#fe01a0",
        PROMINENT: "#010001",
    },
    colorExtracing: {
        "colorDark": "#535353",
        "colorLight": "#535353",
        "colorRaw": "#535353"
    },
    escolhaSpice: "colorDark",
    input3color: false,
    inputCorSpice: false,
    curva: 60,
    corAtual: "#0c5b95",
    corPassada: "#010001",
};

export const playbarConfig: Configply =
    JSON.parse(
        Spicetify.LocalStorage.get(SPICETIFY_KEY)
    ) ||DEFAULT_VALUE

