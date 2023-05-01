import { Control } from "../common/control";
import {Key} from "./key";


export class Board extends Control {  
  constructor(parentNode, tagName, className, config){
    super(parentNode, tagName, className)
    this.lang = true;
    this.keyMap = {};
    for(let row of config) {
      const rowView = new Control(this.node, 'div', 'row');
      row.forEach(key => {
        let keyLabel = this.lang ? key[symbol] : key[symbolRu];
      let code = key[code];  
      let keyConstructor =  key[isSpecial] ? new KeySpecial[code](rowView.node, keyLabel, `key ${code}`) : new Key(rowView.node, keyLabel, 'key')  
      this.keyMap[code] = keyConstructor
      });      
    }    
  }
}