import React, { useEffect, useState } from 'react'
import Card from './components/Card'

const App = () => {


    const [hasStarted, setHasStarted] = useState(getHasStartedFromStore())
    const [teamB, setTeamB] = useState(getTeamB())
    const [currentCardB, setCurrentCardB] = useState(getCurrentBCard())
    const [teamBWins, setTeamBWins] = useState(getTeamBWins())
    const [teamBScore, setTeamBScore] = useState(getTeamBScore())
    const [teamR, setTeamR] = useState(getTeamR())
    const [currentCardR, setCurrentCardR] = useState(getCurrentDCard())
    const [teamRWins, setTeamRWins] = useState(getTeamRWins())
    const [teamRScore, setTeamRScore] = useState(getTeamRScore())

    const [whoWins, setWhoWins] = useState(getWhoWins())

    function getHasStartedFromStore() {
        return JSON.parse(localStorage.getItem("hasStarted")) === null ? false : JSON.parse(localStorage.getItem("hasStarted"))
    }

    function getTeamB() {
        return JSON.parse(localStorage.getItem("teamB")) === null ? [] : JSON.parse(localStorage.getItem("teamB"))
    }

    function getTeamBWins() {
        return JSON.parse(localStorage.getItem("teamBWins")) === null ? [] : JSON.parse(localStorage.getItem("teamBWins"))

    }

    function getTeamBScore() {
        return JSON.parse(localStorage.getItem("teamBScore")) === null ? 0 : JSON.parse(localStorage.getItem("teamBScore"))
    }

    function getTeamR() {
        return JSON.parse(localStorage.getItem("teamR")) === null ? [] : JSON.parse(localStorage.getItem("teamR"))
    }

    function getTeamRWins() {
        return JSON.parse(localStorage.getItem("teamRWins")) === null ? [] : JSON.parse(localStorage.getItem("teamRWins"))
    }

    function getTeamRScore() {
        return JSON.parse(localStorage.getItem("teamRScore")) === null ? 0 : JSON.parse(localStorage.getItem("teamRScore"))
    }

    function getWhoWins() {
        return JSON.parse(localStorage.getItem("whoWins")) === null ? '' : JSON.parse(localStorage.getItem("whoWins"))
    }

    function getCurrentBCard() {
        return JSON.parse(localStorage.getItem("currentCardB")) === null ? '' : JSON.parse(localStorage.getItem("currentCardB"))
    }

    function getCurrentDCard() {
        return JSON.parse(localStorage.getItem("currentCardD")) === null ? '' : JSON.parse(localStorage.getItem("currentCardD"))
    }

    function getRandomHP() {
        return Math.floor(1 + Math.random() * 100)
    }

    function reset() {
        setHasStarted(true)
        setTeamB([])
        setTeamBWins([])
        setTeamR([])
        setTeamRWins([])
    }

    function storeInLocalStorage() {
        localStorage.setItem("hasStarted", JSON.stringify(hasStarted));
        localStorage.setItem("teamB", JSON.stringify(teamB));
        localStorage.setItem("teamBWins", JSON.stringify(teamBWins));
        localStorage.setItem("teamBScore", JSON.stringify(teamBScore));
        localStorage.setItem("teamR", JSON.stringify(teamR));
        localStorage.setItem("teamRWins", JSON.stringify(teamRWins));
        localStorage.setItem("teamRScore", JSON.stringify(teamRScore));
        localStorage.setItem("whoWins", JSON.stringify(whoWins));
        localStorage.setItem("currentCardB", JSON.stringify(currentCardB));
        localStorage.setItem("currentCardD", JSON.stringify(currentCardR));
    }

    function readFromLocalStorage() {
        setHasStarted(JSON.parse(localStorage.getItem("hasStarted")))
        setTeamB(JSON.parse(localStorage.getItem("teamB")))
        setTeamBWins(JSON.parse(localStorage.getItem("teamBWins")))
        setTeamBWins(JSON.parse(localStorage.getItem("teamBScore")))
        setTeamR(JSON.parse(localStorage.getItem("teamR")))
        setTeamRWins(JSON.parse(localStorage.getItem("teamRWins")))
        setTeamBWins(JSON.parse(localStorage.getItem("teamRScore")))
        setWhoWins(JSON.parse(localStorage.getItem("whoWins")))
        setCurrentCardB(JSON.parse(localStorage.getItem("currentCardB")))
        setCurrentCardR(JSON.parse(localStorage.getItem("currentCardD")))

    }

    const getCards = async () => {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
        const data = await res.json()

        function startNewGame(results) {
            results.forEach(async (pokemon, index) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                const data = await res.json()

                const { name, sprites: { other: { dream_world: { front_default } } } } = data
                index < 25 ? setTeamB(currentList => [...currentList, {
                    name,
                    front_default,
                    HP: getRandomHP()
                }]) : setTeamR(currentList => [...currentList, {
                    name,
                    front_default, HP: getRandomHP()
                }])
            })
        }

        function continueGame() {
            readFromLocalStorage()
        }

        if (!hasStarted) {
            reset()
            startNewGame(data.results)

        } else {
            continueGame()
        }
    }

    function battle() {

        if (hasStarted) {
            const { indexB, indexR } = play()
            if (!(indexB === 0 && indexR === 0)) {
                updateScore(indexB, indexR)
            }
            isGameOver()
        }

    }

    function play() {
        const bCardIndex = Math.floor(Math.random() * teamB.length)
        const rCardIndex = Math.floor(Math.random() * teamR.length)

        setCurrentCardB(teamB[bCardIndex])
        setCurrentCardR(teamR[rCardIndex])

        return { indexB: bCardIndex, indexR: rCardIndex }
    }

    function updateScore(indexB, indexR) {
        const HP_B = teamB[indexB].HP
        const HP_R = teamR[indexR].HP

        if (HP_B > HP_R) {
            setWhoWins('Blue Team Wins!')
            setTeamBWins(current => [...current, teamB[indexB], teamR[indexR]])
            setTeamB([
                ...teamB.slice(0, indexB),
                ...teamB.slice(indexB + 1)
            ])
            setTeamR([
                ...teamR.slice(0, indexR),
                ...teamR.slice(indexR + 1)
            ])

        } else if (HP_R > HP_B) {
            setWhoWins('Red Team Wins!')
            setTeamRWins(current => [...current, teamB[indexB], teamR[indexR]])
            setTeamB([
                ...teamB.slice(0, indexB),
                ...teamB.slice(indexB + 1)
            ])
            setTeamR([
                ...teamR.slice(0, indexR),
                ...teamR.slice(indexR + 1)
            ])
        }
    }

    function isGameOver() {
        if (teamB.length === 1 && teamRWins.length > teamBWins.length) {
            setTeamRScore(teamRScore + 1)
            setHasStarted(false)
        } else if (teamB.length === 1 && teamRWins.length < teamBWins.length) {
            setTeamBScore(teamBScore + 1)
            setHasStarted(false)
        }
    }

    useEffect(() => {
        if (!hasStarted) {
            getCards().then()
        }
    }, [hasStarted])

    useEffect(() => {
        storeInLocalStorage()
    }, [hasStarted, teamB, teamBWins, teamBScore, teamR, teamRWins, teamRScore, whoWins, currentCardR, currentCardB])

    return (
        <div className="app-container">
            <h1>Monster Battle: The Card Game</h1>
            <h2>Blue Team {teamBScore} | {teamRScore} Red Team</h2>
            <div className="battle-cards">
                <Card
                    id='Blue Team'
                    image={currentCardB.front_default}
                    name={currentCardB.name}
                    type='blue'
                    HP={currentCardB.HP}
                />
                <Card
                    id='Red Team'
                    image={currentCardR.front_default}
                    name={currentCardR.name}
                    type='red'
                    HP={currentCardR.HP}
                />
            </div>
            <h3>{whoWins}</h3>
            <button className="battle" onClick={() => battle()}>Battle</button>
            <div className="cards-container">
                <div className="all-container">
                    {teamB.map((cardStats, index) =>
                        <Card
                            key={index}
                            id={index + 1}
                            image={cardStats.front_default}
                            name={cardStats.name}
                            type='blue'
                            HP={cardStats.HP}
                        />)}

                    {teamR.map((cardStats, index) =>
                        <Card
                            key={index}
                            id={index + 1}
                            image={cardStats.front_default}
                            name={cardStats.name}
                            type='red'
                            HP={cardStats.HP}
                        />)}
                </div>
            </div>
        </div>
    );
}

export default App;
