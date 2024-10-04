// 'use strict';
import Button from "./Button";
import Menu from "./Menu";
import './Header.css'



export default function Header() {
    return (
        <>
            <Button />
            <header style={{width:'calc(100vw - 17px)'}}>
                <Menu />
            </header>
        </>
    )
}