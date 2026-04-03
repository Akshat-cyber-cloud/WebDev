/**
 * String , number , boolean, array, tuple, void ,never, object
 */

const a: string = "qwertyui";
const b = 10;
const c = true;
// Array - Fixed type not the length
const arr: number[] = [1,2,3];
console.log(arr);

// Tuple - Fixed Size and type
const d: [number, string, number] = [1,"Hello",3];


function greet(name: string): void {
    console.log("Hello" + name);
}

function greet1(name: string): string {
    return "Hello" + name;
}

greet("Akshat");


type USER = {name: string, age: number, isMale: boolean}

const user: USER = {
    name: "Akshat",
    age: 21,
    isMale: true
}

function day(data: USER): void{
    console.log("Hello" + data.name)
}



// let g:any // could be any datatype
let g:unknown
g = 'hello'

// console.log(g.toUpperCase());