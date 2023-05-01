import { Control } from "../common/control.js";
import {Key} from "./key.js";
import { Signal } from "../common/signal.js";


export class Board extends Control {  
  constructor(parentNode, tagName, className, config, lang = 'en'){
    super(parentNode, tagName, className)
    this.signal = new Signal()
    this.lang = lang;
    this.keyMap = {};    
    for(let row of config) {
      const rowView = new Control(this.node, 'div', 'row');
      row.forEach(key => {        
        let keyLabel = this.lang == 'en' ? key.symbol : key.symbolRu;        
      let codeKey = key['code'];  
      let keyConstructor =  new Key(rowView.node, keyLabel, 'keys');      
      if(key['isSpecial']) keyConstructor.node.className = `keys ${codeKey} func` 
      this.keyMap[codeKey] = keyConstructor
      });      
    }    
  }

}