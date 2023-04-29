import {Control} from '../common/control';

export class Output extends Control {
  constructor(parentNode, tagName = 'div', className = '', content = '') {
    super(parentNode, tagName, className, content);
  }

  updateValue(value) {
    this.node.textContent = value;
  }
}