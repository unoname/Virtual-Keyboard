import {Control} from '../common/control.js';

export class Output extends Control {
  constructor(parentNode, tagName = 'div', className = '', content = '') {
    super(parentNode, tagName, className, content);
    this.node.setAttribute('autofocus', 'true')
  }

  updateValue(text) {
    this.node.value += text;
    this.node.focus();
  }
}