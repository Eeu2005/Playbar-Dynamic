export interface Configply {
  uriPassada: string;
  uriAtual: string;
  imgPassada: string;
  imgAtual: string;
  corSpice: {
    DESATURATED: string;
    LIGHT_VIBRANT: string;
    PROMINENT?: string;
    VIBRANT: string;
    VIBRANT_NON_ALARMING: string;
    undefined?: string;
  };
  escolhaSpice: Escolhas;
  input3color: boolean;
  inputCorSpice: boolean;
  curva: string;
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


