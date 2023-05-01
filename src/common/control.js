export class Control {
  constructor(parentNode, tagName = 'div', className = '', content = '') {
    const element = document.createElement(tagName);
    element.classList.add(className);
    element.innerHTML = content;
    if(parentNode) {
      parentNode.append(element)
    }
    this.node = element;
  }

  destroy() {
    this.node.remove()
  }  
}