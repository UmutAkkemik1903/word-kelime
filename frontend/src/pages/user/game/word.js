import React, { useState, useEffect } from "react";
import '../../../css/word.css'
import axios from 'axios';
import baseUrl from '../../../baseUrl'

function Word() {
    const [trueWord, setTrueWord] = useState(0);
    const [wrongWord, setWrongWord] = useState(0);
    const [message, setMessage] = useState(null);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get(baseUrl + `word`)
            .then((res) => {
                setData(res.data);
            })
            .catch(e => console.log(e));
    }, []);

    const [game, setGame] = useState({
        selectQuestion: null,
        questions: data,
        complete: false,
        yarismacianswer: "",
    });

    useEffect(() => {
        setGame((prevGame) => ({
            ...prevGame,
            questions: data
        }));
    }, [data]);

    const mesajver = (message, tur) => {
        if (tur === "hata") {
            setMessage({ message, stil: "bg-danger text-white" });
        } else if (tur === "basari") {
            setMessage({ message, stil: "bg-success text-white" });
        } else {
            setMessage({ message, stil: "bg-dark text-white" });
        }
    };

    const oyunaBasla = () => {
        setMessage(null);
        setTrueWord(0);
        setWrongWord(0);
        setGame({
            ...game,
            questions: game.questions.map(word => {
                word.wordldu = false;
                return word;
            }),
            trueWord: 0,
            wrongWord: 0,
            complete: false
        });
        wordSor();
    };

    const wordSor = () => {
        let questions = game.questions;
        let selectQuestion = questions.find(word => !word.wordldu);

        if (!selectQuestion) {
            oyunBitti();
            return;
        }  
        selectQuestion.wordldu = true;
        setGame({
            ...game,
            selectQuestion,
            questions,
            yarismacianswer: "",
            complete: false
        });
    };

    const answerla = () => {
        let totalTrueWord = trueWord;
        let totalWrongWord = wrongWord;
        if (
            game.yarismacianswer.toLocaleLowerCase("tr") ===
            game.selectQuestion.answer.toLocaleLowerCase("tr")
        ) {
            totalTrueWord += 1;
            mesajver("Tebrikler, doğru bildiniz!", "basari");
        } else {
            totalWrongWord += 1;
            mesajver(
                `Maalesef yanlış cevap. Doğru cevap: ${game.selectQuestion.answer}`,
                "hata"
            );
        }
        setTrueWord(totalTrueWord);
        setWrongWord(totalWrongWord);
        wordSor();
    };

    const oyunBitti = () => {
        setGame({ ...game, complete: true, selectQuestion: null });
    };

    const answerDegisti = (e) => {
        const yenianswer = e.target.value.toLowerCase("tr");
        const yeniHarfler = [];
        for (let i = 0; i < yenianswer.length; i++) {
            const harf = yenianswer[i];
            yeniHarfler.push({ deger: harf, acik: true });
        }
        while (yeniHarfler.length < 10) {
            yeniHarfler.push({ deger: "", acik: false });
        }
        setGame({ ...game, yarismacianswer: yenianswer });
    };

    return (
        <>
            <div className="container mt-4">
                {!game.selectQuestion && (
                    <div className="game card mb-4">
                        <div style={{backgroundColor:'#090a11',color:'white'}} className="card-header">
                            <h4 className="mb-0">Kelime Oyununa Hoşgeldiniz!</h4>
                        </div>
                        <div style={{backgroundColor:'rgb(39 41 53)',color:'white'}} className="card-body">
                            <p className="mb-0">
                                Yarışmaya başlamak için başla butonuna tıklayabilirsiniz.
                            </p>
                        </div>
                        <div style={{backgroundColor:'#090a11',color:'white'}} className="card-footer">
                            <button className="btn btn-primary" onClick={oyunaBasla}>
                                Yarışmaya Başla
                            </button>
                        </div>
                    </div>
                )}
                {game.complete && (
                    <div className="card">
                        <div className="card-body">
                            Oyunu {trueWord} doğru, {wrongWord} yanlış cevap ile tamamladınız!
                        </div>
                    </div>
                )}
                {game.selectQuestion && (
                    <div className="game card mb-4">
                        <div style={{backgroundColor:'#090a11',color:'white'}} className="card-header">
                            <h4 className="mb-0">{game.selectQuestion.word}</h4>
                        </div>
                        <div style={{backgroundColor:'rgb(39 41 53)',color:'white'}} className="card-footer ">
                            <div className="mr-4">Doğru answer: {trueWord}</div>
                            <div className="mr-4">Yanlış answer: {wrongWord}</div>
                        </div>
                        <div style={{backgroundColor:'#090a11',color:'white'}} className="card-footer">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cevabınız?"
                                    value={game.yarismacianswer}
                                    onChange={answerDegisti}
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-success"
                                        type="button"
                                        onClick={answerla}
                                    >
                                        answerla
                                    </button>
                                </div>
                            </div>
                        </div>
                        {message && (
                            <div className={"card-footer " + message.stil}>{message.message}</div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Word;
