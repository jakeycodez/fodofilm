import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  border: 1px solid #000;
`;

const DrawingBoard = ({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement> }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let pos = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      setIsDrawing(true);
      pos = {
        x: e.clientX - canvas.getBoundingClientRect().left,
        y: e.clientY - canvas.getBoundingClientRect().top,
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDrawing && ctx) {
        const newPos = {
          x: e.clientX - canvas.getBoundingClientRect().left,
          y: e.clientY - canvas.getBoundingClientRect().top,
        };

        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(newPos.x, newPos.y);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        pos = newPos;
      }
    };

    const onMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseup', onMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDrawing, canvasRef]);

  return <Canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};

export default DrawingBoard;
