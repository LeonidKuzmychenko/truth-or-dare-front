import React from 'react';
import './header.scss';
import {NewGameModelViewMode} from "../../dtos/newGameModeelViewMode";

interface HeaderProps {
    viewNewGameModel: Function;
}

export default function Header(props: HeaderProps) {
    console.log("Обновляется Хедер")
    return (
        <header className="header">
            <button className="menu-btn">МЕНЮ</button>
            <button className="new-game-btn" onClick={() => {
                console.log("click")
                props.viewNewGameModel(new NewGameModelViewMode(true, true))
            }}>НОВАЯ ИГРА
            </button>
        </header>
    )
}