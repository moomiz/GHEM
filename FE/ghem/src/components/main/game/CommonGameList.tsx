import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { disLikeGameList, banGameList, userAllApp } from "@/store/mainState";
import CommonGameListItem from "./CommonGameListItem";
import { PageXY } from "@/pages/MainPage";

type GameList = {
  appid: number;
  discountPercent?: number;
  originalPrice?: number;
  finalPrice?: number;
  largeImage?: string;
  smallImage?: string;
  headerImage?: string;
};

type CommonGameListProps = {
  gameType?: "discount" | "steady";
  gameList?: GameList[];
  imgType: "header" | "capsule";
  scrollType: -1 | 1;
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  setPageXY: React.Dispatch<React.SetStateAction<PageXY>>;
  colId: string;
  currentColId: string;
  canClickWithHover: boolean;
};

function CommonGameList(props: CommonGameListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [canClick, setCanClick] = useState<boolean>(true); // 드래그 중이 아닐 때만 클릭 가능함을 나타내는 변수
  const [isMouseOn, setIsMouseOn] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [currentScroll, setCurrentScroll] = useState<number>(0);
  const [forTime, setForTime] = useState<number>(0);
  const [gameList, setGameList] = useState<GameList[]>();

  const [userDisLikeGame, setUserDisLikeGame] =
    useRecoilState<number[]>(disLikeGameList); // 가져온 게임 리스트에서 밴 or 관심 없는 게임 필터링 처리
  const [banGame, setBanGame] = useRecoilState<number[]>(banGameList);
  const [useAllApp, setUseAllApp] = useRecoilState<boolean>(userAllApp);

  // current type error 때문에 임의로 만들어주는 코드
  const scrollElement = scrollRef.current as HTMLDivElement;

  useEffect(() => {
    const newList = props.gameList?.filter((game) => {
      return !userDisLikeGame.includes(game.appid);
    });
    // console.log(newList, "=====================");
    if (!useAllApp) {
      const newNewList = newList?.filter((newGame) => {
        return !banGame.includes(newGame.appid);
      });
      // console.log(useAllApp, "=====???")
      setGameList(newNewList);
    } else {
      // console.log(useAllApp, "=====!!!!!")
      setGameList(newList);
    }
  }, [props.gameList, userDisLikeGame, useAllApp]);

  useEffect(() => {
    const timeout = setTimeout(() => setForTime(forTime + 1), 30);

    if (
      props.scrollType === -1 &&
      scrollElement &&
      !isMouseOn &&
      props.currentColId !== props.colId
    ) {
      if (scrollElement.scrollLeft === currentScroll) {
        scrollElement.scrollLeft = 0;
      }
      setCurrentScroll(scrollElement.scrollLeft);
      scrollElement.scrollLeft += 1.5;
    }

    if (
      props.scrollType === 1 &&
      scrollElement &&
      !isMouseOn &&
      props.currentColId !== props.colId
    ) {
      if (scrollElement.scrollLeft === currentScroll) {
        scrollElement.scrollLeft = 100000;
      }
      setCurrentScroll(scrollElement.scrollLeft);
      scrollElement.scrollLeft -= 0.6;
    }

    return () => clearTimeout(timeout);
  }, [forTime]);

  const onDragStart = (e: React.MouseEvent<HTMLElement>) => {
    setIsDrag(true);
    setStartX(e.pageX);
  };

  const onDragLeave = () => {
    setIsDrag(false);
    setIsMouseOn(false);
    setTimeout(() => setCanClick(true), 50); // 약간의 시간차가 있어야 클릭과 드래그를 구분 가능
  };

  const onDragEnd = () => {
    setIsDrag(false);
    setTimeout(() => setCanClick(true), 50); // 약간의 시간차가 있어야 클릭과 드래그를 구분 가능
  };

  const onDragMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isDrag) {
      props.setIsEnter(false);
      setCanClick(false); // 드래그에 있어야 일반 클릭과 드래그를 true false 나누어 처리 가능
      e.preventDefault();
      scrollElement.scrollLeft += startX - e.pageX;
      setStartX(e.pageX);
    }
  };

  return (
    <div
      css={rowScroll}
      style={
        props.gameType === "steady"
          ? {
              msTransform: `rotate(${-5 * props.scrollType}deg)`,
              WebkitTransform: `rotate(${-5 * props.scrollType}deg)`,
              transform: `rotate(${-5 * props.scrollType}deg)`,
            }
          : {}
      }
      id="gameList"
      ref={scrollRef}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragLeave}
      onMouseOver={() => setIsMouseOn(true)}
      // onMouseOut={() => setIsMouseOn(false)}
    >
      {gameList?.map((item, index) => {
        return (
          <CommonGameListItem
            gameType={props.gameType}
            appid={item.appid}
            imgType={props.imgType}
            key={item.appid}
            canClick={canClick}
            discountPercent={item.discountPercent}
            originalPrice={item.originalPrice}
            finalPrice={item.finalPrice}
            largeImage={item.largeImage}
            smallImage={item.smallImage}
            headerImage={item.headerImage}
            setAppid={props.setAppid}
            setIsEnter={props.setIsEnter}
            setColId={props.setColId}
            setPageXY={props.setPageXY}
            colId={props.colId}
            canClickWithHover={props.canClickWithHover}
            isDrag={isDrag}
          />
        );
      })}
    </div>
  );
}

const rowScroll = css`
  display: flex;
  overflow: scroll;
  /* background-color: #584a6e; */
  padding: 1rem 0rem;
  /* scroll-behavior: smooth;
  transition: 0.3s; */
  /* margin: 1rem 0rem; */
  /* 가로 스크롤 + 숨기기 */
  /* overflow: hidden; */
  white-space: nowrap;
  /* scroll bar 제거 ( chrome 환경)*/
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default CommonGameList;
