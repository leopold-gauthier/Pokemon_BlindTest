export function blur(target, handler) {
    let number = 50;
    target.style.filter = `blur(${number}px)`;
    const interval = setInterval(() => {
        number -= 0.5;
        target.style.filter = `blur(${number}px)`; 
        console.log(number);
        number == 0 || handler ? clearInterval(interval): null;
    }, 100);
}