import React, { Component } from "react";
import './calculator.css';

import { Button, ButtonTypeEnum, ButtonSizeEnum } from '../button/button';
import { ButtonValueTypeEnum } from './buttonValueTypeEnum';
import ONPCalculator from "./onpLogic";
import IDictionary from "../common/dictionary";

type CalculatorState = {
    result: number,
    operations: string
}

export default class Calculator extends Component<{}, CalculatorState> {
    private onpCalculator: ONPCalculator;
    private valueTypeDictionary: IDictionary<string> = {};

    constructor(props: any) {
        super(props);

        this.state = {
            result: 0,
            operations: ''
        };

        this.onpCalculator = new ONPCalculator();

        this.valueTypeDictionary = {
            [ButtonValueTypeEnum.Add]: '+',
            [ButtonValueTypeEnum.Sub]: '-',
            [ButtonValueTypeEnum.Mul]: '*',
            [ButtonValueTypeEnum.Div]: '/',
            [ButtonValueTypeEnum.Power]: '^',
            [ButtonValueTypeEnum.Zero]: '0',
            [ButtonValueTypeEnum.One]: '1',
            [ButtonValueTypeEnum.Two]: '2',
            [ButtonValueTypeEnum.Three]: '3',
            [ButtonValueTypeEnum.Four]: '4',
            [ButtonValueTypeEnum.Five]: '5',
            [ButtonValueTypeEnum.Six]: '6',
            [ButtonValueTypeEnum.Seven]: '7',
            [ButtonValueTypeEnum.Eight]: '8',
            [ButtonValueTypeEnum.Nine]: '9',
            [ButtonValueTypeEnum.Dot]: '.',
            [ButtonValueTypeEnum.Clear]: 'AC',
            [ButtonValueTypeEnum.Equal]: '='
        };
    }

    onButtonValueTypeClick(valueType: ButtonValueTypeEnum) {
        if (valueType === ButtonValueTypeEnum.Clear)
            this.setState({ operations: '' });
        else if (valueType === ButtonValueTypeEnum.Equal) {
            const result = this.onpCalculator.createONP(this.state.operations);
            this.setState({ result: result });
        } else
            this.setState({ operations: this.state.operations + this.valueTypeDictionary[valueType] });
    }

    render() {
        return (
            <div className="main-container">
                <div className="card">
                    <ul className="list-group list-group-flush">
                        <li className="list-item list-group-item">{this.state.operations}</li>
                        <li className="list-item list-group-item">
                            Result: {this.state.result}
                        </li>
                    </ul>
                </div>
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Clear]}
                    type={ButtonTypeEnum.Function}
                    size={ButtonSizeEnum.Double}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Clear)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Power]}
                    type={ButtonTypeEnum.Operator}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Power)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Div]}
                    type={ButtonTypeEnum.Operator}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Div)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Seven]}
                    type={ButtonTypeEnum.Number}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Seven)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Eight]}
                    type={ButtonTypeEnum.Number}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Eight)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Nine]}
                    type={ButtonTypeEnum.Number}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Nine)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Mul]}
                    type={ButtonTypeEnum.Operator}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Mul)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Four]}
                    type={ButtonTypeEnum.Number}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Four)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Five]}
                    type={ButtonTypeEnum.Number}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Five)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Six]}
                    type={ButtonTypeEnum.Number}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Six)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Sub]}
                    type={ButtonTypeEnum.Operator}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Sub)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.One]}
                    type={ButtonTypeEnum.Number}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.One)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Two]}
                    type={ButtonTypeEnum.Number}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Two)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Three]}
                    type={ButtonTypeEnum.Number}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Three)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Add]}
                    type={ButtonTypeEnum.Operator}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Add)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Zero]}
                    type={ButtonTypeEnum.Number} size={ButtonSizeEnum.Double}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Zero)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Dot]}
                    type={ButtonTypeEnum.Number}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Dot)} />
                <Button label={this.valueTypeDictionary[ButtonValueTypeEnum.Equal]}
                    type={ButtonTypeEnum.Function}
                    onClick={() => this.onButtonValueTypeClick(ButtonValueTypeEnum.Equal)} />
            </div>
        )
    }
}