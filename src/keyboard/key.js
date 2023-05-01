import {Control} from '../common/control';

export class Key extends Control {
  constructor(parentNode, keyLabel, className) {
    super(parentNode, 'div', className);
    this.node.innerHTML = keyLabel;    
  }

  Up(callback) {
    this.node.addEventListener('mouseUp', callback);
    this.node.addEventListener('keyUp', callback);
  }
  Down(callback) {
    this.node.addEventListener('mouseDown', callback);
    this.node.addEventListener('keydown', callback);
  }
  
}