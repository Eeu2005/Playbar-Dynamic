export interface Configply {
	uriPassada: string;
	uriAtual: string;
	corSpice: {
		DESATURATED: string;
		LIGHT_VIBRANT: string;
		PROMINENT?: string;
		VIBRANT: string;
		VIBRANT_NON_ALARMING: string;
		undefined?: string;
	};
	escolhaSpice: Escolhas
	input3color: boolean;
	inputCorSpice: boolean;
	curva: string ;
	corAtual: string;
	corPassada: string;
}
type Escolhas =
  | "undefined"
  | "DESATURATED"
  | "LIGHT_VIBRANT"
  | "PROMINENT"
  | "VIBRANT_NON_ALARMING"
  | "VIBRANT";

export type language = { [lingua: string]: string[] };


interface DataColorsTrack {
    "data": {
        "trackUnion": {
            "__typename": string,
            "albumOfTrack": {
                "coverArt": {
                    "extractedColors": {
                        "colorDark": {
                            "hex": string
                        }
                    }
                }
            }
        }
    },
    "extensions": {}
}
interface DataColorsEpisode {
    "data": {
        "episodeUnionV2": {
            "__typename": "Episode",
            "coverArt": {
                "extractedColors": {
                    "colorDark": {
                        "hex": "#867272"
                    }
                }
            }
        }
    },
    "extensions": {}
}