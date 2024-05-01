
export const myhtml:String = `
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

 export const svg = `<svg role="img" height="20" width="20" viewBox="0 0 16 16" fill="currentColor"><path d="M11.472.279L2.583 10.686l-.887 4.786 4.588-1.625L15.173 3.44 11.472.279zM5.698 12.995l-2.703.957.523-2.819v-.001l2.18 1.863zm-1.53-2.623l7.416-8.683 2.18 1.862-7.415 8.683-2.181-1.862z"></path>
</svg> <path d="M11.472.279L2.583 10.686l-.887 4.786 4.588-1.625L15.173 3.44 11.472.279zM5.698 12.995l-2.703.957.523-2.819v-.001l2.18 1.863zm-1.53-2.623l7.416-8.683 2.18 1.862-7.415 8.683-2.181-1.862z"</path></svg>`;
