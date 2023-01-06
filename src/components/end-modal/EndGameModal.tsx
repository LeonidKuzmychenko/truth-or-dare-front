import React, {memo} from "react";
import './endGameModal.scss';
import {NewGameModelViewMode} from "../../dtos/newGameModeelViewMode";

interface EndGameModelProps {
    visible: boolean
    viewNewGameModel: (it: NewGameModelViewMode) => void;
    viewEndGameModel: (it: boolean) => void;
}

const EndGameModal = (props: EndGameModelProps) => {
    console.log("Обновляется модальное окно Окончания игры")

    const onClick = () => {
        props.viewNewGameModel(new NewGameModelViewMode(true, false))
        props.viewEndGameModel(false)
    }

    if (props.visible) {
        return (
            <div id="end-game-modal-container-id" className="end-game-modal-container">
                <div className="end-game-modal-window">
                    <span className="end-game-title-btn">ИГРА ЗАКОНЧИЛАСЬ</span>
                    <div className="end-game-modal-btn-container">
                        <button className="end-game-modal-btn" onClick={onClick}>
                            НОВАЯ ИГРА
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}

const MemoEndGameModal = memo(EndGameModal)

export default MemoEndGameModal