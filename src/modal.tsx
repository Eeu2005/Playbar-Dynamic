import React, { useEffect, useRef, useSyncExternalStore } from "react"
import { escolhasColorExtarcing, language } from "./types/type";
import "./style.css"
import { useConfigply } from "./types/useConfigply";
export function Model() {
    const update = new Event("update")
    const { data, setConfig } = useConfigply()
    let localidade: string = Spicetify.Locale.getLocale();
    const lingua: language = {
        "pt-BR": ["Rotação do degrade (Em deg)", "Cores", "Tons das cores spicetify"],
        "pt-PT": ["Rotação do degrade (Em deg)", "Cores", "Tons das cores spicetify"],
        "es-ES": ["Rotation of gradient (deg)", "colors", "Color shades of  Spicetify"]
    };
    let linguaEscolhida = lingua[localidade] ? lingua[localidade] : lingua["es-ES"];
    const input3Color = useRef<HTMLInputElement>()
    const inputCorSpice = useRef<HTMLInputElement>()
    useEffect(()=>{
        input3Color.current.checked = data.input3color
        inputCorSpice.current.checked = data.inputCorSpice
    },[])
    const Options= Object.entries(data.colorExtracing).map(([key,val])=>
    <option style={{color:val}} key={key} value={key}>
            {key}
    </option>)
    return <div className="conteiner playbar-dynamic">

        <div className="divCurva">
            <p>{linguaEscolhida[0]} </p>
            <div className="inputs">
                <input type="range" max="360.5" step="0.5" value={data.curva} id="curva"
                onInput={(e) => { setConfig({ curva: e.currentTarget.valueAsNumber }) }}  />
                <input type="number" max="360.5" id="numeros"
                 onInput={(e) => { setConfig({ curva: e.currentTarget.valueAsNumber }) }} value={data.curva} />
            </div>
        </div>
        <div className="divBotoes disabled">
            <div>
                <p>Spicetify? </p>
                <label htmlFor="inputCorSpice" id="switch">
                    <input ref={inputCorSpice} type="checkbox" onInput={e=>{
                        input3Color.current.checked = false
                        setConfig({
                            input3color: false,
                            inputCorSpice: e.currentTarget.checked
                        })
                    }} name="cor_1" id="inputCorSpice" />
                    <div className="myslider round"></div>
                </label>
            </div>
            <div>
                <p>3 {linguaEscolhida[1]}</p>
                <label htmlFor="tresColors" id="switch">
                    <input type="checkbox" ref={input3Color} name="" onInput={e => {
                        inputCorSpice.current.checked = false
                        setConfig({
                            input3color: e.currentTarget.checked,
                            inputCorSpice: false
                        })
                    }} id="tresColors" />
                    <div className="myslider round"></div>
                </label>
            </div>
            <div className="divSelect">
                <p>{linguaEscolhida[2]}</p>
                <select name="colors"  id="colors" onInput={(e)=>{
                    setConfig({ escolhaSpice: e.currentTarget.value as escolhasColorExtarcing}) 
                }}>
                    {Options}
                </select>
            </div>
        </div>

        <div className="preview"></div>
        
        <input type="button" id="botao" value="save" onClick={()=>Spicetify.Player.dispatchEvent(update)} />
    </div>
}