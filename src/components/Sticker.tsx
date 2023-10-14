import React, { useState } from 'react';
import Draggable, { DraggableEventHandler } from 'react-draggable';
import styled from 'styled-components';

const StyledSticker = styled.img`
  width: 100px;
  position: absolute;
  cursor: pointer;

  &:hover {
    cursor: grab;
  }

  &.dragging {
    cursor: grabbing;
  }
`;

type StickerProps = {
  id: string;
  image: string;
  left: number;
  top: number;
  onDrop: (id: string, left: number, top: number) => void;
};

const Sticker: React.FC<StickerProps> = ({ id, image, left, top, onDrop }) => {
  const [dragging, setDragging] = useState(false);

  const handleDrag: DraggableEventHandler = (e, data) => {
    setDragging(true);
    onDrop(id, data.x, data.y);
  };

  const onStop = () => {
    setDragging(false);
  };

  return (
    <Draggable
      defaultPosition={{ x: left, y: top }}
      onStop={onStop}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div>
        <StyledSticker
          src={image}
          className={dragging ? 'dragging' : ''}
          onMouseEnter={() => setDragging(false)}
        />
      </div>
    </Draggable>
  );
};

export default Sticker;
