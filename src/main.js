const body = document.querySelector("body");
const container = document.createElement("div");
container.classList.add("container");
const inputColors = document.createElement("input");
inputColors.classList.add("colors_input");
inputColors.setAttribute("type", "color")
const keys = createElements(65);
let lang = true;
const keyboardRuLang = [1049, 1062, 1059, 1050, 1045, 1053, 1043, 1064, 1065, 1047, 1061, 1066, 92, 1060, 1067, 1042, 1040, 1055, 1056, 1054, 1051, 1044, 1046, 1069, 1071, 1063, 1057, 1052, 1048, 1058, 1068, 1041, 1070, 46];
const keyboardEnLang = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'Backspace', 'Tab', 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 91, 93, 92, 'Delete', 'CapsLock', 65, 83, 68, 70, 71, 72, 74, 75, 76, 59, 39, 'ENTER', 'Shift', 92,  90, 88, 67, 86, 66, 78, 77, 46, 44, 47, 65, 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl'];
keys.map(item => item.classList.add("keys"));
// let spaceKey = document.querySelector(".space_key");
// let shift_left = document.querySelector(".shift_left");
// let shift_right = document.querySelector(".shift_right");
// let caps_lock_key = document.querySelector(".caps_lock_key");
let toggle_circle = document.createElement("div");
toggle_circle.classList.add("toggle_circle");
let night_mode = document.createElement("div");
night_mode.classList.add("night_mode");

let change_color = document.createElement("div");
change_color.classList.add("change_light_color");
let colors = document.createElement("div");
colors.classList.add("colors");
colors.append(inputColors);
change_color.append(colors);
container.append(change_color);
let inputText = document.createElement("textarea");
inputText.classList.add("text");
inputText.setAttribute("name", "textarea");
inputText.setAttribute('rows', '100');
inputText.setAttribute('cols', '150');
// inputText.setAttribute('autofocus');

let keyboard_lights = document.createElement("div");
keyboard_lights.classList.add("keyboard_lights");
let keyboard_wrapper = document.createElement("div");
keyboard_wrapper.classList.add('keyboard_wrapper')
let keyboard_keys = document.createElement("div");
keyboard_keys.classList.add("keyboard_keys");
body.append(container);
container.append(night_mode);
night_mode.append(toggle_circle);
container.append(keyboard_wrapper);
keyboard_wrapper.append(keyboard_lights);
keyboard_wrapper.append(keyboard_keys);
container.append(inputText);
let rows = createElements(5);  
rows.map(item => item.classList.add("row"));
for(let i = 0; i < rows.length; i++) {
  keyboard_keys.append(rows[i]);
}
for(let i = 0; i < 14; i++) {
  rows[0].append(keys[i]);
  if(i == 13) {
    keys[i].innerText = keyboardEnLang[i];
  } else {
     keys[i].innerHTML = String.fromCharCode(keyboardEnLang[i]);
  }   
} 
for(let i = 14, k = 0; i < 29; i++) {
  rows[1].append(keys[i]);
  if(i == 14) {
    keys[i].innerText = keyboardEnLang[i];
  } else if(i == 28) {
    keys[i].innerText = keyboardEnLang[i]
  } else {
    keys[i].innerHTML = lang ? String.fromCharCode(keyboardEnLang[i]) : String.fromCharCode(keyboardRuLang[k]);
    k++;
  }  
} 
for(let i = 29; i < 42; i++) {
  rows[2].append(keys[i]);
  if(i == 29) {
    keys[i].innerText = keyboardEnLang[i];
  } else if(i ==  41) {
    keys[i].innerText = keyboardEnLang[i]
  } else {
    keys[i].innerHTML = String.fromCharCode(keyboardEnLang[i])
  }  
} 
for(let i = 42; i < 56; i++) {
  rows[3].append(keys[i]);
  if(i == 42 || i == 55) {
    keys[i].innerText = keyboardEnLang[i];
  } else if (i == 54) {
    keys[i].classList.add('arrow_up');
    keys[i].innerHTML = '<img src="icons/icons8-sort-up-24.png">';
  }
    else {
     keys[i].innerHTML = String.fromCharCode(keyboardEnLang[i]);
  } 
} 
for(let i = 56; i < 65; i++) {
  rows[4].append(keys[i]);
  if(i == 62) {
    keys[i].classList.add('arrow_left');
    keys[i].innerHTML = '<img src="icons/icons8-sort-left-24.png">';
  } else if(i ==63) {
    keys[i].classList.add('arrow_down');
    keys[i].innerHTML = '<img src="icons/icons8-sort-down-24.png">';
   } else if(i == 64) {
    keys[i].classList.add('arrow_right');
    keys[i].innerHTML = '<img src="icons/icons8-sort-right-24.png">';
   } else {
keys[i].innerText = keyboardEnLang[i];
  }
} 
keys[13].classList.add('backspace_key');
keys[29].classList.add('caps_lock_key');
keys[41].classList.add('enter_key');
keys[42].classList.add('shift_key');
keys[56].classList.add('ctrl_key')
keys[59].classList.add('space_key');
keys[61].classList.add('ctrl_key');
function createElements(n) {
  let arr = [];
  while(n > arr.length) {
    arr.push(document.createElement("div"));    
  }  
  return arr;
}
// keys[0].innerHTML = `keyboardEnLang[64]<sup>~</sup>`;
for(let i = 0; i < keys.length; i++) {
  keys[i].setAttribute('keyname', keys[i].innerText);
  keys[i].setAttribute('lowerCaseName', keys[i].innerText.toLowerCase());
}

window.addEventListener('keydown', function(e) {
  for(let i = 0; i < keys.length; i++) {
      if(e.key == keys[i].getAttribute('keyname' ) || e.key == keys[i].getAttribute('lowerCaseName')) {
          keys[i].classList.add('active')
      }
      if(e.code == 'Space') {
          spaceKey.classList.add('active')
      }
      if(e.code == 'ShiftLeft') {
          shift_right.classList.remove('active')
      }
      if(e.code == 'ShiftRight') {
          shift_left.classList.remove('active')
      }
      if(e.code == 'CapsLock') {
          caps_lock_key.classList.toggle('active');
      }
  }
})

window.addEventListener('keyup', function(e) {
  for(let i = 0; i < keys.length; i++) {
      if(e.key == keys[i].getAttribute('keyname' ) || e.key == keys[i].getAttribute('lowerCaseName')) {
          keys[i].classList.remove('active')
          keys[i].classList.add('remove')
      }
      if(e.code == 'Space') {
          spaceKey.classList.remove('active');
          spaceKey.classList.add('remove');
      }
      if(e.code == 'ShiftLeft') {
          shift_right.classList.remove('active')
          shift_right.classList.remove('remove')
      }
      if(e.code == 'ShiftRight') {
          shift_left.classList.remove('active')
          shift_left.classList.remove('remove')
      }
      setTimeout(()=> {
          keys[i].classList.remove('remove')
      },200)
  }
})


night_mode.addEventListener('click',function() {
  toggle_circle.classList.toggle('active');
  body.classList.toggle('active');
  night_mode.classList.toggle('active');
  keyboard_wrapper.classList.toggle('active');
  text_input.classList.toggle('active');
  change_color.classList.toggle('active');
  for(let i = 0; i < keys.length; i++) {
      keys[i].classList.toggle('keys_night')
  }
})

inputColors.addEventListener('input',function() {
  for(let i = 0; i < keys.length; i++) {
      keys[i].style.color = inputColors.value
  }
  keyboard_lights.style.background = inputColors.value;
})

document.addEventListener('keydown', (e) => {
  
    console.log(e.code);
    // lang = lang ? false : true;
  
})

// document.onkeydown =  (e) => {
//   // console.log(e.key.charCodeAt());
//   keyboardEnLang.push(e.key.charCodeAt());  
// }