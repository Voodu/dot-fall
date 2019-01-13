import { sayHello } from "./greet";
import { count } from "./subdir/count"

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

showHello("greeting", "TypeScript");
count(5);