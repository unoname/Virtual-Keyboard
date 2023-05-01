import {Control} from '../common/control.js';

export class Key extends Control {
  constructor(parentNode, keyLabel, className) {
    super(parentNode, 'div', className);
    this.node.innerHTML = keyLabel;    
  }  
}