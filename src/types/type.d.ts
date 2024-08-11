export interface configply {
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
	escolhaSpice: "undefined" | "DESATURATED" | "LIGHT_VIBRANT" | "PROMINENT" | "VIBRANT_NON_ALARMING" | "VIBRANT";
	input3color: boolean;
	inputCorSpice: boolean;
	curva: string ;
	corAtual: string;
	corPassada: string;
}

export type language = { [lingua: string]: string[] };
export interface fectcolors {
	data:       Data;
	extensions: Extensions;
}

export interface Data {
	extractedColors: ExtractedColor[];
}

export interface ExtractedColor {
	__typename: string;
	colorDark:  Color;
	colorLight: Color;
	colorRaw:   Color;
}

export interface Color {
	hex:        string;
	isFallback: boolean;
}

export interface Extensions {
}
