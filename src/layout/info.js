import { Control } from '../common/control.js';

export class Info extends Control {
  constructor(parentNode, tagName, className) {
    super(parentNode, tagName, className);
    this.node.innerText = "Клавиатура выполнена на ОС Windows. Для смены языка нажмите 'Shift' + 'AltLeft'";    
  }  
}