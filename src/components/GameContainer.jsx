import arrayShuffle from 'array-shuffle';
import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { GameDisplay } from './GameDisplay';
import cardFlipSound from "../sounds/card-flip.wav";
import scoreSound from "../sounds/score.wav";
import resetSound from "../sounds/reset.wav";

const types = [
  '🚀',
  '🍔',
  '🙏🏻',
  '🐰',
  '🏠',
  '🎮',
  '🔥',
  '📺',
]

const getGameData = () => {
  const gameData = [];
  const typesForGameData = [...types, ...types];
  let shuffledTypes = arrayShuffle(typesForGameData);
  shuffledTypes.forEach((type, index) => {
    gameData.push({
      type,
      id: index,
      open: false,
      remove: false
    })
  })
  
  return gameData;
}

export const GameContainer = () => {

  const [cards, setCards] = useState(getGameData());
  const [inPlay, setInPlay] = useState([]);
  const [matching, setMatching] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [playFlipSound] = useSound(cardFlipSound);
  const [playScoreSound] = useSound(scoreSound);
  const [playResetSound] = useSound(resetSound);

  const resetGame = () => {
    if (window.confirm('Are you sure?')) {
      playResetSound();
      setScore(0);
      setMoves(0);
      setCards(getGameData())
    }
  }

  const handleOnClick = (id) => () => {  
    if (!matching) {            
      const updatedCards = [...cards];
      const updatedInPlay = [...inPlay];    
  
      updatedCards.forEach(card => {
        if (card.id === id) {
          card.open = true
          playFlipSound();
          updatedInPlay.push(card.type)
          setInPlay(updatedInPlay);        
        }
      })
  
      setCards(updatedCards);
    }      
  }

  useEffect(() => {
    if (inPlay.length === 2 && !matching) {
      setMoves(moves + 1);
      setMatching(true);
      const updatedCards = [...cards];
      if (inPlay[0] === inPlay[1]) {
        //match
        console.log('match')
        updatedCards.forEach(card => {
          if (card.type === inPlay[0]) {
            card.remove = true;
          }
        })
        setCards(updatedCards);
        setMatching(false);
        setScore(score + 1);
        playScoreSound();
        setInPlay([]);
      } else {
        //no-match
        setTimeout(() => {
          updatedCards.forEach(card => {
            if (card.type === inPlay[0] || card.type === inPlay[1]) {
              card.open = false;
            }
          })
          setCards(updatedCards);
          setMatching(false);
          setInPlay([]);
        }, 1000);
        console.log('no-match')        
      }
    }
  }, [inPlay, matching, moves, cards, score, playScoreSound])

  return (
    <GameDisplay 
      cards={cards} 
      onClick={handleOnClick}
      resetGame={resetGame} 
      score={score}
      moves={moves}
    />
  )
}