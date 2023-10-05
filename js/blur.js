export function blur(target) {
    let number = 50;
    target.style.filter = `blur(${number}px)`;
    const interval = setInterval(() => {
        number -= 0.5;
        target.style.filter = `blur(${number}px)`; 
        console.log(number);
        number == 0 ? clearInterval(interval): null;
    }, 100);
}