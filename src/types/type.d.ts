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
    DARK_VIBRANT:string
    VIBRANT_NON_ALARMING: string;
    undefined?: string;
  };
  colorExtracing: {
    colorRaw: string;
    colorLight: string;
    colorDark: string;
  }
  escolhaSpice: Escolhas;
  input3color: boolean;
  inputCorSpice: boolean;
  curva: number;
  corAtual: string;
  corPassada: string;

}
type escolhasColorExtarcing = keyof Configply["colorExtracing"]
type EscolhaSpice = keyof Configply["corSpice"]
  type Escolhas = escolhasColorExtarcing | EscolhaSpice


export type language = { [lingua: string]: string[] };


