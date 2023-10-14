import React from 'react';
import styled from 'styled-components';

const StyledBin = styled.div`
  width: 300px;
  height: 300px;
  border: 2px solid black;
`;

const Bin = ({ children }: { children: React.ReactNode }) => {
  return <StyledBin>{children}</StyledBin>;
};

export default Bin;
