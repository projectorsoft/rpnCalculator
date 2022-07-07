import IDictionary from '../common/dictionary';
import Stack from "../common/stack";
import Queue from "../common/queue";
import { strToNumber } from '../common/stringUtility';

export enum TokenType { OPERATOR, NUMBER };

class Operator {
    Priority: number;
    Operation: (a: number, b: number) => number;

    constructor() {
        this.Priority = 0;
        this.Operation = function (a: number, b: number) { return 0 };
    }
}

export class OperatorsDictionary {
    Operator: IDictionary<Operator> = {};
}

export default class ONPCalculator {
    private operatorsDictionary: OperatorsDictionary;

    constructor() {
        this.operatorsDictionary = new OperatorsDictionary();
        this.operatorsDictionary.Operator['+'] = { Operation: (a: number, b: number) => a + b, Priority: 0 };
        this.operatorsDictionary.Operator['-'] = { Operation: (a: number, b: number) => a - b, Priority: 0 };
        this.operatorsDictionary.Operator['*'] = { Operation: (a: number, b: number) => a * b, Priority: 1 };
        this.operatorsDictionary.Operator['/'] = { Operation: (a: number, b: number) => a / b, Priority: 1 };
        this.operatorsDictionary.Operator['^'] = { Operation: (a: number, b: number) => Math.pow(a, b), Priority: 1 };
    }

    public createONP(operations: string): number {
        if (!operations)
            return 0;

        try {
            //1. Create tokens (numbers and operators)
            const tokens = this.createTokens(operations);
            //2. Convert to ONP notation
            const onp = this.toONP(tokens);

            this.printONP(onp);

            //3. Compute result based on ONP expression
            return this.computeOnp(onp);
        }
        catch (exception) {
            console.log(exception);

            return 0;
        }
    }

    private getTokenType(c: string): TokenType {
        if ("+-*/^".includes(c))
            return TokenType.OPERATOR;

        return TokenType.NUMBER;
    }

    private createTokens(operations: string): Queue<string> {
        const tokens = new Queue<string>();
        let token = '';

        for (let i = 0; i < operations.length; i++) {
            if (this.getTokenType(operations[i]) === TokenType.NUMBER)
                token = token + operations[i];
            else
                if (this.getTokenType(operations[i]) === TokenType.OPERATOR) {
                    if (token) {
                        tokens.enqueue(token);
                        token = '';
                    }

                    tokens.enqueue(operations[i]);
                }
        }

        if (token)
            tokens.enqueue(token);

        return tokens;
    }

    private toONP(tokens: Queue<string>): string[] {
        const operatorsStack = new Stack<string>();
        let token: number;
        let expresions: string[] = [];

        while (tokens.size() > 0) {
            let strToken = tokens.dequeue();

            if (!strToken)
                continue;

            token = strToNumber(strToken);

            if (!isNaN(token))
                expresions.push(strToken);
            else {
                let operatorValue = this.operatorsDictionary.Operator[strToken].Priority;
                while (true) {
                    let op = operatorsStack.peek();
                    if (op && this.operatorsDictionary.Operator[op].Priority >= operatorValue) {
                        operatorsStack.pop();
                        expresions.push(op);
                    } else
                        break;
                }

                operatorsStack.push(strToken);
            }
        }

        while (operatorsStack.size() > 0) {
            let op = operatorsStack.pop();
            if (op)
                expresions.push(op);
        }

        return expresions;
    }

    private computeOnp(onpExpression: string[]): number {
        const stack = new Stack<number>();

        for (let i = 0; i < onpExpression.length; i++) {
            let token = strToNumber(onpExpression[i]);
            if (!isNaN(token))
                stack.push(token);
            else {
                const leftNumber = stack.pop() ?? 0;
                const rightNumber = stack.pop() ?? 0;

                stack.push(this.operatorsDictionary.Operator[onpExpression[i]].Operation(rightNumber, leftNumber));
            }
        }

        return stack.pop() ?? 0;
    }

    private printONP(onpExpression: string[]): void {
        if (!onpExpression || onpExpression.length === 0)
            return;

        console.log('ONP expression:');
        let onp = '';

        for (let i = 0; i < onpExpression.length; i++)
            onp = onp + ' ' + onpExpression[i];

        console.log(onp);
    }
}