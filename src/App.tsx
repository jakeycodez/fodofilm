import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Bin from './components/Bin';
import Sticker from './components/Sticker';

import sticker1 from './assets/stickers/1.gif';
import sticker2 from './assets/stickers/2.gif';
import sticker3 from './assets/stickers/3.gif';
import sticker4 from './assets/stickers/4.gif';
import sticker5 from './assets/stickers/5.gif';

const AppContainer = styled.div`
  position: relative;
  height: 100vh;
`;

const ResetButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const initialStickers = [
  { id: '1', image: sticker1, x: 50, y: 50 },
  { id: '2', image: sticker2, x: 150, y: 50 },
  { id: '3', image: sticker3, x: 50, y: 150 },
  { id: '4', image: sticker4, x: 150, y: 150 },
  { id: '5', image: sticker5, x: 250, y: 150 },
];

const App = () => {
  const [stickers, setStickers] = useState(initialStickers);
  const [resetKey, setResetKey] = useState(0); // Add a key for resetting

  const handleStickerDrop = (id: string, left: number, top: number) => {
    const updatedStickers = stickers.map((sticker) =>
      sticker.id === id ? { ...sticker, x: left, y: top } : sticker
    );
    setStickers(updatedStickers);
  };

  const handleReset = () => {
    setStickers(initialStickers);
    setResetKey(resetKey + 1); // Increment the key for reset
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppContainer>
        <h1 style={{padding: "25px"}}>Jake Martella</h1>
        {stickers.map((sticker) => (
          <Sticker
            key={`${sticker.id}-${resetKey}`} // Ensure key changes on reset
            id={sticker.id}
            image={sticker.image}
            left={sticker.x}
            top={sticker.y}
            onDrop={handleStickerDrop}
          />
        ))}
        <ResetButton onClick={handleReset}>RESET</ResetButton>
      </AppContainer>
    </DndProvider>
  );
};

export default App;