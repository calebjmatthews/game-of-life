import React, { useState, useEffect } from 'react';

import GameOfLife from '../../models/gameOfLife';

const GameOfLifeComponent = () => {
  const [gameOfLife, setGameOfLife] = useState(new GameOfLife(null));
  const [performStep, setPerformStep] = useState(false);

  useEffect(() => {
    gameOfLife.initialize();
    setGameOfLife(gameOfLife);
    setTimeout(() => setPerformStep(true), gameOfLife.config.timestep);
  }, []);

  useEffect(() => {
    if (performStep) {
      setPerformStep(false);
      const newGameOfLife = new GameOfLife(gameOfLife.performTimestep());
      setGameOfLife(newGameOfLife);
      setTimeout(() => setPerformStep(true), gameOfLife.config.timestep);
    };
  }, [performStep, gameOfLife])

  return (
    <div style={{ fontFamily: 'monospace' }}>
      {gameOfLife.boardLayer.value.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`}>{
          row.map((space, spaceIndex) => (<span key={`space-${spaceIndex}`}>
            {space ? 'X' : '_'}
          </span>))
        }</div>
      ))}
    </div>
  )
};

export default GameOfLifeComponent;