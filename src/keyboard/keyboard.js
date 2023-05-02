import { Control } from "../common/control.js";
import { Board } from "./board.js";
import { Output } from "./output.js";
import { Signal } from "../common/signal.js";
import { keys } from "../keys/keys.js";


const funcKeys = {
  Delete: 'Delete',
  CapsLock: 'CapsLock',
  Enter: 'Enter',
  ShiftLeft:  'ShiftLeft',
  ShiftRight: 'ShiftRight',
  ControlLeft: 'ControlLeft',
  MetaLeft: 'MetaLeft',
  AltLeft: 'AltLeft',
  Space: 'Space',
  AltRight: 'AltRight',
  ControlRight: 'ControlRight',
  ArrowLeft: 'ArrowLeft',
  ArrowDown: 'ArrowDown',
  ArrowRight: 'ArrowRight',
}
export class Keyboard extends Control {  
  constructor(parentNode, tagName, className){
    super(parentNode, tagName, className)   
    this.output = new Output(parentNode, 'textarea', 'text');      
    this.board = new Board(this.node, 'div', 'keyboard_keys', keys); 
    this.signal = new Signal() 

    this.isCapsLock = false;
    this.lang = 'en';
    this.shiftPressed = false;
    this.altPressed = false;

    document.addEventListener('keydown', (e) => {
      if (e.code === 'CapsLock') {
        this.isCapsLock = !this.isCapsLock;
      }
      
    });

    document.addEventListener('keyup', (e) => {
      if (e.key === "Shift") {
        this.shiftPressed = false;
      }
      if (e.key === "Alt") {
        this.altPressed = false;
      }
    });  
    
  }
    handleEvent(){
      this.node.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('keys') && !e.target.classList.contains('func')) {
          let keyLabel = e.target.innerText;
          if (this.isCapsLock) {
            keyLabel = keyLabel.toUpperCase();
          }
          if (this.lang === 'ru' && e.target.dataset.symbolRu) {
            keyLabel = e.target.dataset.symbolRu;
          }
          this.output.updateValue(keyLabel)
          e.target.classList.add('active');
          setTimeout(() => {
            e.target.classList.remove('active');
          }, 100);
        }
        // document.dispatchEvent(new KeyboardEvent('keydown', { key: e.target.innerText }));
      });
      
      document.addEventListener('keydown', (e) => {
        if (e.key === "Shift") {
          this.shiftPressed = true;
        } else if (e.key === "Alt") {
          this.altPressed = true;
        }
        if (this.shiftPressed && this.altPressed) {          
            this.updateBoard()
                  }
        
        if(!(e.code in funcKeys)) this.output.updateValue(e.key);
        const startPos = this.output.node.selectionStart;
        const endPos = this.output.node.selectionEnd;
        switch (e.code) {
          case "Tab":
            this.output.node.value = this.output.node.value.substring(0, startPos) + "    " + this.output.node.value.substring(endPos, this.output.node.value.length);
            this.output.node.selectionStart = startPos + 4;
            this.output.node.selectionEnd = startPos + 4;
            break;
          case "Enter":
            elem.value = elem.value.substring(0, startPos) + "\n" + elem.value.substring(endPos, elem.value.length);
            elem.selectionStart = startPos + 1;
            elem.selectionEnd = startPos + 1;
            break;   
          case "Backspace":
            if (startPos > 0) {
              elem.value = elem.value.substring(0, startPos - 1) + elem.value.substring(endPos, elem.value.length);
              elem.selectionStart = startPos - 1;
              elem.selectionEnd = startPos - 1;
            }
            break;
          case "Delete":
            elem.value = elem.value.substring(0, startPos) + elem.value.substring(endPos + 1, elem.value.length);
            elem.selectionStart = startPos;
            elem.selectionEnd = startPos;
            break;
          }
          // Перемещаем курсор в зависимости от нажатой клавиши
      switch(e.key) {
        case 'ArrowUp':
          elem.selectionStart = getPrevLineStart(elem.value, startPos);
          elem.selectionEnd = elem.selectionStart;
          break;
        case 'ArrowDown':
          elem.selectionStart = getNextLineStart(elem.value, startPos);
          elem.selectionEnd = elem.selectionStart;
          break;
        case 'ArrowLeft':
          elem.selectionStart = startPos - 1;
          elem.selectionEnd = startPos - 1;
          break;
        case 'ArrowRight':
          elem.selectionStart = startPos + 1;
            elem.selectionEnd = startPos + 1;
            break;
      }

        if (this.board.keyMap[e.code]) {          
          e.preventDefault();
          this.board.keyMap[e.code].node.classList.add('active');
          setTimeout(() => {
            this.board.keyMap[e.code].node.classList.remove('active');
          }, 100);
        }
      });
       
    } 
    updateBoard() {
      if(this.lang == 'en') {
        localStorage.setItem('lang', 'ru');
        this.lang = 'ru'
        this.board.destroy()
        this.board = new Board(this.node, 'div', 'keyboard_keys', keys, this.lang)
      } else {
        localStorage.setItem('lang', 'en');
        this.lang = 'en';
        this.board.destroy();
        this.board = new Board(this.node, 'div', 'keyboard_keys', keys, this.lang)
      }
    }
}