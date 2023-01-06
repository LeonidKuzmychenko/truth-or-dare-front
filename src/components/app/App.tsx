import React, {memo, useCallback, useEffect, useState} from 'react';
import MemoHeader from "../header/Header";
import MemoMain from "../main/Main";
import MemoEndGameModal from "../end-modal/EndGameModal";
import MemoNewGameModel from "../new-modal/NewGameModel";
import './app.scss';
import {AxiosResponse} from "axios";
import SessionResponse from "../../dtos/sessionResponse";
import {sessionRequest, startRequest} from "../../services/requests";
import {NewGameModelViewMode} from "../../dtos/newGameModeelViewMode";
import {NewGameInstance} from "../../dtos/newGameInstance";
import CheckSessionResponse from "../../dtos/checkSessionResponse";

const App = () => {

    let [newGameModelViewMode, setNewGameModelViewMode] = useState<NewGameModelViewMode>(new NewGameModelViewMode(false, false))
    let [endGameModelViewMode, setEndGameModelViewMode] = useState(false)
    let [mainKey, setMainKey] = useState<string | null>(localStorage.getItem("session") ? localStorage.getItem("session") : "")

    useEffect(() => {
        async function initPage(): Promise<void> {
            console.log("initPage")
            let savedSession: string | null = localStorage.getItem("session");
            console.log("saved session = " + savedSession)
            if (savedSession === null) {
                console.log("session ! as string")
                setNewGameModelViewMode(new NewGameModelViewMode(true, false))
                return;
            }
            if (savedSession as string) {
                let sessionResponse: AxiosResponse<CheckSessionResponse> = await sessionRequest(savedSession)
                let sessionData = sessionResponse.data;
                console.table(sessionData)
                let sessionIsExist: boolean = sessionData.exist;
                console.log("session is exist = " + sessionIsExist)
                if (!sessionIsExist) {
                    setNewGameModelViewMode(new NewGameModelViewMode(true, false))
                    return;
                }
            }
        }

        initPage()
    }, [])


    const viewNewGameModal = useCallback((visible: boolean, closable: boolean) => {
        setNewGameModelViewMode(new NewGameModelViewMode(visible, closable))
    }, [])

    const viewEndGameModal = useCallback((visible: boolean) => {
        setEndGameModelViewMode(visible)
    }, [])

    const startNewGame = useCallback(async (newGame: NewGameInstance) => {
        console.log("startNewGame")
        let sessionResponse: AxiosResponse<SessionResponse> = await startRequest(newGame.male, newGame.female);
        let sessionData: SessionResponse = sessionResponse.data;
        let session: string = sessionData.session;
        localStorage.setItem("session", session)
        setMainKey(session)
    }, [])

    return (
        <>
            <MemoNewGameModel key="newGameModel"
                              newGameModelViewMode={newGameModelViewMode}
                              viewNewGameModel={viewNewGameModal}
                              startNewGame={startNewGame}
            />
            <MemoEndGameModal key="endGameModal"
                              visible={endGameModelViewMode}
                              viewNewGameModel={viewNewGameModal}
                              viewEndGameModel={viewEndGameModal}
            />
            <section className="wrapper">
                <MemoHeader key="header"
                            viewNewGameModel={viewNewGameModal}
                />
                <MemoMain key={mainKey}
                          setEndGameModelViewMode={viewEndGameModal}
                />
            </section>
        </>
    );
}

const MemoApp = memo(App)

export default MemoApp