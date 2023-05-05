import { Control } from '../common/control.js';

export class ChangeColor extends Control {
  
  constructor(parentNode, tagName, className) {
    super(parentNode, tagName, className)
    
    this.node.innerHTML = '<div class="colors"><input class="colors_input" type="color"></div>';    
  }  
}