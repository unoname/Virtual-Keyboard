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
this.keyboard = new Keyboard(this.node, 'div', 'keyboard_wrapper')
const keyBoardColor = new Control(this.keyboard.node, 'div', 'keyboard_lights')
this.keyboard.node.prepend(keyBoardColor.node)
this.info = new Info(this.node, 'div', 'info') 
console.log(this.keyboard.node.lang)
 }
 init(){
  this.keyboard.handleEvent();  
 }
}
