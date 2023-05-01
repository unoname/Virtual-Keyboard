import { Control } from "../common/control";
import { Board } from "./board";
import { Output } from "./output"


export class Keyboard extends Control {  
  constructor(parentNode, tagName, className, config){
    super(parentNode, tagName, className)
    this.board = new Board();
    this.output = new Output();      
  }
}