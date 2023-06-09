import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonGameList from "./game/CommonGameList";
import { PageXY } from "@/pages/MainPage";
import { mobile } from "@/util/Mixin";

type RankItemList = {
  appid: number;
};

type RankList = {
  name: string;
  start_of_month: number;
  url_path: string;
  item_ids: RankItemList[];
};

type TopRankNewReleaseProps = {
  setAppid: React.Dispatch<React.SetStateAction<number | null>>;
  setIsEnter: React.Dispatch<React.SetStateAction<boolean>>;
  setColId: React.Dispatch<React.SetStateAction<string>>;
  setPageXY: React.Dispatch<React.SetStateAction<PageXY>>;
  currentColId: string;
  canClickWithHover: boolean;
};

function TopRankNewRelease(props: TopRankNewReleaseProps) {
  const [topRankLists, setTopRankLists] = useState<RankList[]>([]);

  useEffect(() => {
    TopRankListApi();
    return () => {};
  }, []);

  const TopRankListApi = async () => {
    try {
      const response = await axios.get(
        "https://c4q3ics2qk.execute-api.ap-northeast-2.amazonaws.com/test/isteamchart/gettopreleasespages"
      );
      setTopRankLists(response.data.response.pages);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div css={topRankDiv}>
      <span>TOP RANK</span>
      <br />
      <span>NEW RELEASE</span>
      <CommonGameList
        gameList={topRankLists[0]?.item_ids}
        imgType="header"
        scrollType={-1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        setPageXY={props.setPageXY}
        colId="toprate1"
        currentColId={props.currentColId}
        canClickWithHover={props.canClickWithHover}
      />
      <CommonGameList
        gameList={topRankLists[1]?.item_ids}
        imgType="header"
        scrollType={1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        setPageXY={props.setPageXY}
        colId="toprate2"
        currentColId={props.currentColId}
        canClickWithHover={props.canClickWithHover}
      />
      <CommonGameList
        gameList={topRankLists[2]?.item_ids}
        imgType="header"
        scrollType={-1}
        setAppid={props.setAppid}
        setIsEnter={props.setIsEnter}
        setColId={props.setColId}
        setPageXY={props.setPageXY}
        colId="toprate3"
        currentColId={props.currentColId}
        canClickWithHover={props.canClickWithHover}
      />
    </div>
  );
}

const topRankDiv = css`
  > span {
    font-size: 60px;
    color: #352c42;
    text-shadow: -1px 0px #f6b4ff, 0 0 2px #fff, 0 0 8px #ffd8f8, 0 0 4px #fff,
      0px 1px #f1c1ff, 1px 0px #ffd8f8, 0px -1px #ffa9cb;
    /* color: #fff;
    text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 4px #fff, 0 0 7px #f6b4ff,
      0 0 10px #f1c1ff, 0 0 15px #ffd8f8, 0 0 18px #eb68ff, 0 0 23px #ffa9cb; */
  }
  margin: 10rem 6rem;
  padding: 1rem 0rem 1rem 0rem;
  background-color: #352c42;
  border-radius: 30px;

  ${mobile} {
    > span {
      font-size: 30px;
    }
    margin: 3rem 1rem;
    padding: 1rem 0rem;
    border-radius: 20px;
  }
`;

export default TopRankNewRelease;
