import React, { FunctionComponent } from 'react';
import './button.css';

export enum ButtonTypeEnum {
    Number,
    Operator,
    Function
}

export enum ButtonSizeEnum {
    Standard,
    Double
}

type ButtonProps = {
    label: string,
    type: ButtonTypeEnum,
    size?: ButtonSizeEnum,
    onClick: () => void
};

export const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    const getClassName = () => {
        let classes = 'button btn ';
        if (props.type === ButtonTypeEnum.Number)
            classes = classes + 'btn-warning';
        else if (props.type === ButtonTypeEnum.Operator)
            classes = classes + 'btn-secondary';
        else if (props.type === ButtonTypeEnum.Function)
            classes = classes + 'btn-info';

        return classes;
    }

    return (
        <button type="button"
            className={getClassName()}
            style={props.size && props.size === ButtonSizeEnum.Double ? { width: '144px' } : {}}
            onClick={props.onClick}>
            {props.label}
        </button>
    );
}