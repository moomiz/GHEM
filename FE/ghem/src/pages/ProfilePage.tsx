import React from "react";
import { css } from "@emotion/react";
import { Routes, Route } from "react-router-dom";
import Profile from "../components/profile/Profile";
import GameList from "@components/profile/gamelist/GameList";
import ComputerSpec from "@components/profile/computerSpec/ComputerSpec";

function ProfilePage() {
  return (
    <div css={wrapper}>
      <div css={profileWrapper}>
        <h2>닉네임 님의 프로필</h2>
        <div>
          <Profile />
          <Routes>
            <Route path="/gamelist" element={<GameList />} />
            <Route path="/computerspec" element={<ComputerSpec />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

const wrapper = css`
  padding: 50px 136px;
`;

const profileWrapper = css`
  width: 100%;
  height: 100%;

  > h2 {
    margin-bottom: 30px;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 60px;
  }
`;

export default ProfilePage;
