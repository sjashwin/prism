/**
 * Author: Ashwin Thinnappan
 * Created: 2023 Oct 25
 */

import React from "react";
import { Passkey } from "../lib/passkey/register";

export interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    backgroundColor?: string;
    color?: string;
};

export const Prism: React.FunctionComponent<IButtonProps> = props => {
    const { children, backgroundColor, color, style } = props;

    let _style: React.CSSProperties = style || {};

    if (backgroundColor) {
        _style.backgroundColor = backgroundColor;
    }

    if (color) {
        _style.color = color;
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form: FormData = new FormData(e.target as HTMLFormElement);
        if (form.get("name") as string == null) {
            return;
        }
        Passkey(form.get("name") as string, "name");
    }

    return (
        <form onSubmit={submit} className="button">
            <input type="text" id="name" name="name" placeholder="Enter Name" className="name" />
            <button
            style={style} 
            {...props}
            type="submit"
            className="button"
            >

                {children}  
            </button>
        </form>
    );
}