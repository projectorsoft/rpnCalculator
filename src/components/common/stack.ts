interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
}

export default class Stack<T> implements IStack<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) { }

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Stack capacity is reached!");
        }
        this.storage.push(item);
    }

    pop(): T | undefined {
        return this.storage.pop();
    }

    peek(): T | undefined {
        return this.storage[this.size() - 1];
    }

    size(): number {
        return this.storage.length;
    }
}