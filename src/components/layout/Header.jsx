import React, { useState } from 'react';
import SearchBar from '../searchbar/SearchBar.jsx';
import { useLocation, useNavigate } from 'react-router';
import queryAtom from '../../atoms/queryAtom';
import { useRecoilState } from 'recoil';
import pageUrlConfig from '../../config/pageUrlConfig';
import styled from 'styled-components';
import theme from '../../style/theme.js';

const Header = () => {
  const [query, setQuery] = useRecoilState(queryAtom);

  //IsShowSearchBar는 첫 렌더 시에만 필요한 값이며, useState를 쓰면 안됩니다.
  //useState로 사용할 경우 상태가 변경되어 다시 렌더가 되면 또 값이 바뀌고 리렌더링 시키는 무한 렌더링 상태가 됩니다.
  let IsShowSearchBar = true;

  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  const { pathname } = useLocation();

  let placeholder;
  switch (pathname) {
    case `${pageUrlConfig.homePage}`:
      placeholder = `지하철역을 검색해주세요!`;
      break;
    case `${pageUrlConfig.feedPage}`:
      placeholder = `유저를 검색해주세요`;
      break;
    default:
      IsShowSearchBar = false;
  }

  const backPath = pathname.split('/')[1];

  return (
    <>
      <StyledHeader>
        {IsShowSearchBar && (
          <SearchBar
            placeholder={placeholder}
            onChange={handleChangeQuery}
            value={query}
            backPath={backPath}
          />
        )}
      </StyledHeader>
      <BackGround></BackGround>
    </>
  );
};

export default Header;
const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  padding: 8px;
  max-width: 410px;
  height: 48px;
  z-index: 10;
  background-color: ${theme.color.white};
  border-bottom: 1px solid #dbdbdb;
`;

const BackGround = styled.div`
  height: 48px;
`;
