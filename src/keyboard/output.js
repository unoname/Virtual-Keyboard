import {Control} from '../common/control.js';

export class Output extends Control {
  constructor(parentNode, tagName = 'div', className = '', content = '') {
    super(parentNode, tagName, className, content);
    this.node.setAttribute('autofocus', 'true')
  }

  updateValue(text) {
	let start = this.node.selectionStart;
	let end = this.node.selectionEnd;
	let input = this.node.value.substring(0, start) + text + this.node.value.substring(end);
	this.node.value = input;
	this.node.focus();
	this.node.selectionEnd = ( start == end ) ? (end + text.length) : end ;   
  }
}