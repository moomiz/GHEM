import React from "react";
import { css } from "@emotion/react";
import { AiOutlineCheck } from "react-icons/ai";

function ProfileNickname() {
  return (
    <div css={wrapper}>
      <div css={headerWrapper}>
        <h5>닉네임</h5>
        <span>(최대 6자)</span>
      </div>
      <div css={inputWrapper}>
        <input type="text" />
        <AiOutlineCheck />
      </div>
    </div>
  );
}

const wrapper = css`
  margin-top: 50px;
  width: 100%;
`;

const headerWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;

  > span {
    margin-left: 10px;
    font-size: 16px;
  }
`;

const inputWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  border-bottom: 1px solid #ffffff;

  > input {
    width: 100%;
    height: 35px;
    background: none;
    border: none;
    outline: none;
    color: white;
    font-size: 16px;
    padding: 0 5px;
  }

  > svg {
    color: #f90808;
    /* color: #08f908; */
  }
`;

export default ProfileNickname;
