// ConcreteObservable
class InputObservable {
    constructor(element) {
        this.element = element;
        this.observers = [];
    }
    subscribe(...observers) {
        observers.forEach((observer) => {
            if (!this.observers.includes(observer)) {
                this.observers.push(observer);
            }
        });
    }
    unsubscribe(observer) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
        }
    }
    notify() {
        this.observers.forEach((observer) => observer.update(this));
    }
}
// Concrete Observer
class ParagraphObserver {
    constructor(element) {
        this.element = element;
    }
    update(observable) {
        if (observable instanceof InputObservable) {
            this.element.innerText = observable.element.value;
        }
    }
}
// Concrete Observer
class DivObserver {
    constructor(element) {
        this.element = element;
    }
    update(observable) {
        if (observable instanceof InputObservable) {
            this.element.innerText = observable.element.value;
        }
    }
}
// Cliente code
function makeInput() {
    const input = document.createElement('input');
    document.body.appendChild(input);
    return input;
}
function makeParagraph() {
    const p = document.createElement('p');
    document.body.appendChild(p);
    p.innerText = 'paragrafo';
    return p;
}
function makeDiv() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerText = 'div';
    return div;
}
const input = new InputObservable(makeInput());
const p1 = new ParagraphObserver(makeParagraph());
const p2 = new ParagraphObserver(makeParagraph());
const div1 = new DivObserver(makeDiv());
input.subscribe(p1, p2, div1);
input.element.addEventListener('keyup', function () {
    input.notify();
});
input.unsubscribe(p2);
