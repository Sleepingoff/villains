import React, { useState } from "react";
import SearchBar from "../searchbar/SearchBar.jsx";
import { useLocation } from "react-router";
import queryAtom from "../../atoms/queryAtom";
import { useRecoilState } from "recoil";
import pageUrlConfig from "../../config/pageUrlConfig";
import styled from "styled-components";

const Header = () => {
    const [query, setQuery] = useState("");
    const [queries, setQueries] = useRecoilState(queryAtom);

    //IsShowSearchBar는 첫 렌더 시에만 필요한 값이며, useState를 쓰면 안됩니다.
    //useState로 사용할 경우 상태가 변경되어 다시 렌더가 되면 또 값이 바뀌고 리렌더링 시키는 무한 렌더링 상태가 됩니다.
    let IsShowSearchBar = true;
    
    const handleChangeQuery = (event) => {
        setQuery(event.target.value)
        setQueries(event.target.value);
    }

    //메인의 상태를 모르기 때문에 url을 사용하여 placeholder를 바꿔줌
    const { pathname } = useLocation();

    let placeholder;
    switch(pathname){
        case `${pageUrlConfig.homePage}`:
            placeholder = `지하철역을 검색해주세요!`;
            break;
        case `feed`:
            placeholder = `유저를 검색해주세요`;
            break;
        default:
            IsShowSearchBar = false;
    }

    return (
        <StyledHeader>
        {IsShowSearchBar && <SearchBar placeholder={placeholder} onChange={handleChangeQuery} value={query}/>}
        </StyledHeader>
    )
}

export default Header;

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    margin: 0 auto;
    max-width: 412px;
    z-index: 10;
`;