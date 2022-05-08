import React from 'react';
import { Link } from "react-router-dom";
import './Button.css'

const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {

    const chkBtnStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const chkBtnSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    return (
        <Link to="/login" className={`btn ${chkBtnStyle} ${chkBtnSize}`} onClick={onClick} type={type}>
            {children}
        </Link>
    )

}
export default Button