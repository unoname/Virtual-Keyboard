import { Keyboard } from "./keyboard.js";
import { Control } from "../common/control.js";
import {ChangeColor} from "../layout/changeColor.js";
import {Theme} from "../layout/theme.js";
import { Info } from "../layout/Info.js";


export class VirtualKeyboard extends Control {
  constructor(parentNode, tagName, className){
super(parentNode, tagName, className);
this.changeColor = new ChangeColor(this.node, 'div','change_light_color');
this.theme = new Theme(this.node, 'div', 'night_mode');
this.keyboard = new Keyboard(this.node, 'div', 'keyboard_wrapper');
this.keyBoardColor = new Control(this.keyboard.node, 'div', 'keyboard_lights');
this.keyboard.node.prepend(this.keyBoardColor.node);
this.info = new Info(this.node, 'div', 'info');
 }
 init(){
  this.keyboard.handleEvent(); 
  this.changeBoardColor() 
 }
 
changeBoardColor(){
const inputColor = this.changeColor.node.querySelector('.colors_input')
const boardColor = document.querySelector('.keyboard_lights')
inputColor.addEventListener('input',function() {
  // for(let i = 0; i < keys.length; i++) {
  //     keys[i].style.color = inputColors.value
  // }
  
  boardColor.style.backgroundColor = inputColor.value;
})
 }
}
