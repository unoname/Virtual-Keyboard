import {Control} from '../common/control';

export class Key extends Control {
  constructor(parentNode, keyLabel, cssClass) {
    super(parentNode, 'button', cssClass);
    this.node.innerHTML = keyLabel;
    this.node.setAttribute('type', 'button');
  }

  onClick(callback) {
    this.node.addEventListener('click', callback);
  }

  onKeyDown(callback) {
    this.node.addEventListener('keydown', callback);
  }
}