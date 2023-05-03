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
  Tab: 'Tab'
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
      if (e.key === "Shift") {
        this.shiftPressed = true;
      } 
      if (e.key === "Alt") {
        this.altPressed = true;
      }
      if (this.shiftPressed && this.altPressed) {          
        this.updateBoard()
              }
      if (e.key === 'Tab') {
        e.preventDefault();
        const startPos = this.output.node.selectionStart;
        const endPos = this.output.node.selectionEnd;
        const before = this.output.node.value.slice(0, startPos);
        const after = this.output.node.value.slice(endPos);
        const indent = "    ";
        const newValue = before + indent + after;
        this.output.node.value = newValue;
        const newCursorPos = startPos + indent.length;
        this.output.node.selectionStart = newCursorPos;
        this.output.node.selectionEnd = newCursorPos;
        this.output.node.focus();
      }
      if (this.board.keyMap[e.code]) {          
        e.preventDefault();
        this.board.keyMap[e.code].node.classList.add('active');
        setTimeout(() => {
          this.board.keyMap[e.code].node.classList.remove('active');
        }, 100);
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
      this.board.node.addEventListener('click', (e) => {            
        if (e.target.classList.contains('keys')) {
          if(!e.target.classList.contains('func')) {
            let keyLabel = e.target.innerText;
          if (this.isCapsLock) {
            keyLabel = keyLabel.toUpperCase();
          }         
          this.output.updateValue(keyLabel);
          }  else {
            this.actionFunctionalKeys(e)
          }        
          e.target.classList.add('active');
          setTimeout(() => {
            e.target.classList.remove('active');
          }, 100);
        }
      });
      
      this.board.node.addEventListener('keydown', (e) => {     
        if(!(e.code in funcKeys)) {
          this.output.updateValue(e.key);
        } 
        if(e.code in funcKeys) {       
          this.actionFunctionalKeys(e)
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
        const key = e.code || e.target.innerText || 'Space';       
        switch (key) {
          case "Tab": 
          e.preventDefault();
          const before = this.output.node.value.slice(0, startPos);
          const after = this.output.node.value.slice(endPos);
          const indent = "    ";
          const newValue = before + indent + after;
          this.output.node.value = newValue;
          const newCursorPos = startPos + indent.length;
          this.output.node.selectionStart = newCursorPos;
          this.output.node.selectionEnd = newCursorPos;
          this.output.node.focus();
          break;
          case "Enter":
            this.output.node.value = this.output.node.value.substring(0, startPos) + "\n" + this.output.node.value.substring(endPos, this.output.node.value.length);
            this.output.node.focus();
            this.output.node.selectionStart = startPos + 1;
            this.output.node.selectionEnd = startPos + 1;
            e.preventDefault();
            break;   
          case "Backspace":            
              this.output.node.value = this.output.node.value.substring(0, startPos - 1) + this.output.node.value.substring(endPos, this.output.node.value.length);
              this.output.node.focus();
              this.output.node.selectionStart = startPos - 1;
              this.output.node.selectionEnd = startPos - 1;
              e.preventDefault();
            
            break;
          case "Delete": 
          case "Del":
            this.output.node.value = this.output.node.value.substring(0, startPos) + this.output.node.value.substring(endPos + 1, this.output.node.value.length);
            this.output.node.focus();
            this.output.node.selectionStart = startPos;
            this.output.node.selectionEnd = startPos;
            e.preventDefault();
            break;         
            case 'ArrowUp':
            case '▲':
              this.output.node.selectionStart = getPrevLineStart(this.output.node.value, startPos);
              this.output.node.selectionEnd = this.output.node.selectionStart;
              this.output.node.focus();
              e.preventDefault();
              break;
            case 'ArrowDown':
              case '▼':
              this.output.node.selectionStart = getNextLineStart(this.output.node.value, startPos);
              this.output.node.selectionEnd = this.output.node.selectionStart;
              this.output.node.focus();
              e.preventDefault();
              break;
            case 'ArrowLeft':
            case '◄':             
              this.output.node.selectionStart = startPos - 1;
              this.output.node.selectionEnd = startPos - 1;
              this.output.node.focus();
              e.preventDefault();
              break;
            case 'ArrowRight':
              case '►':
              this.output.node.selectionStart = startPos + 1;
              this.output.node.selectionEnd = startPos + 1;
              this.output.node.focus();
              e.preventDefault();              
              break;
            case "Space":
              this.output.node.value = this.output.node.value.substring(0, startPos) + " " + this.output.node.value.substring(endPos, this.output.node.value.length);
              // this.output.updateValue(this.output.node.value + ' ')
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