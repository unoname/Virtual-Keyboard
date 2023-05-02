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
    document.addEventListener('click', (e) => {      
      if (e.target.innerText === 'CapsLk') {
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
        console.log(e.target.innerText)     
        if (e.target.classList.contains('keys')) {
          if(!e.target.classList.contains('func')) {
            let keyLabel = e.target.innerText;
          if (this.isCapsLock) {
            keyLabel = keyLabel.toUpperCase();
          }
          if (this.lang === 'ru' && e.target.dataset.symbolRu) {
            keyLabel = e.target.innerText;
          }
          this.output.updateValue(keyLabel)
          }  else {
            this.actionFunctionalKeys(e)
          }        
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
        if(!(e.code in funcKeys)) {
          this.output.updateValue(e.key);
        } 
        if(e.code in funcKeys) {
          this.actionFunctionalKeys(e)
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
    actionFunctionalKeys(e) {
       const startPos = this.output.node.selectionStart;
        const endPos = this.output.node.selectionEnd;
        const key = e.code || e.target.innerText
        switch (key) {
          case "Tab":
            this.output.node.value = this.output.node.value.substring(0, startPos) + "    " + this.output.node.value.substring(endPos, this.output.node.value.length);
            this.output.node.selectionStart = startPos + 4;
            this.output.node.selectionEnd = startPos + 4;
            this.output.node.focus();
            break;
          case "Enter":
            this.output.node.value = this.output.node.value.substring(0, startPos) + "\n" + this.output.node.value.substring(endPos, this.output.node.value.length);
            this.output.node.selectionStart = startPos + 1;
            this.output.node.selectionEnd = startPos + 1;
            this.output.node.focus();
            break;   
          case "Backspace":
            if (startPos > 0) {
              this.output.node.value = this.output.node.value.substring(0, startPos - 1) + this.output.node.value.substring(endPos, this.output.node.value.length);
              this.output.node.selectionStart = startPos - 1;
              this.output.node.selectionEnd = startPos - 1;
              this.output.node.focus();
            }
            break;
          case "Delete", "Del":
            this.output.node.value = this.output.node.value.substring(0, startPos) + this.output.node.value.substring(endPos + 1, this.output.node.value.length);
            this.output.node.selectionStart = startPos;
            this.output.node.selectionEnd = startPos;
            this.output.node.focus();
            break;         
            case 'ArrowUp', '▲':
              this.output.node.selectionStart = getPrevLineStart(this.output.node.value, startPos);
              this.output.node.selectionEnd = this.output.node.selectionStart;
              this.output.node.focus();
              break;
            case 'ArrowDown', '▼':
              this.output.node.selectionStart = getNextLineStart(this.output.node.value, startPos);
              this.output.node.selectionEnd = this.output.node.selectionStart;
              this.output.node.focus();
              break;
            case 'ArrowLeft', '◄':
              this.output.node.selectionStart = startPos - 1;
              this.output.node.selectionEnd = startPos - 1;
              this.output.node.focus();
              break;
            case 'ArrowRight', '►':
              this.output.node.selectionStart = startPos + 1;
              this.output.node.selectionEnd = startPos + 1;
              this.output.node.focus();
              break;
            case "Space":
              this.output.node.value = this.output.node.value.substring(0, startPos) + " " + this.output.node.value.substring(endPos, this.output.node.value.length);
              this.output.node.selectionStart = startPos + 1;
              this.output.node.selectionEnd = startPos + 1;
              this.output.node.focus();
              break;
          }
          function getPrevLineStart(text, pos) {
            let i = pos - 1;
            while (i >= 0 && text.charAt(i) !== "\n") {
              i--;
            }
            return i + 1;
          }
          function getNextLineStart(text, pos) {
            let i = pos;
            while (i < text.length && text.charAt(i) !== "\n") {
              i++;
            }
            if (i < text.length) {
              i++;
            }
            return i;
          }
    }
}