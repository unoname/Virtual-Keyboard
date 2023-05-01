import { Control } from '../common/control.js';

export class Theme extends Control {
  constructor(parentNode, tagName, className) {
    super(parentNode, tagName, className);
    this.node.innerHTML = '<div class="toggle_circle"></div>';    
  }  
}