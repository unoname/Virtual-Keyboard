import {Control} from '../common/control.js';

export class Output extends Control {
  constructor(parentNode, tagName = 'div', className = '', content = '') {
    super(parentNode, tagName, className, content);
    this.node.setAttribute('autofocus', 'true')
  }

  updateValue(value) {
    this.node.textContent += value;
  }
}