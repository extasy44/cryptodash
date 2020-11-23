import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: green;
`;

const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

const ConfirmButton = () => {
  const { confirmFavorites } = useContext(AppContext);

  return (
    <CenterDiv>
      <ConfirmButtonStyled onClick={() => confirmFavorites()}>
        Confirm Favorites
      </ConfirmButtonStyled>
    </CenterDiv>
  );
};

export default ConfirmButton;
