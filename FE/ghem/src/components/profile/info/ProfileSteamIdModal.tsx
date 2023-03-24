import React from "react";
import { css } from "@emotion/react";
import { AiOutlineClose } from "react-icons/ai";

type ProfileSteamIdModalProps = {
  handleOpenSteamIdModal: () => void;
};

function ProfileSteamIdModal({ handleOpenSteamIdModal }: ProfileSteamIdModalProps) {
  const handleCloseModal = (): void => {
    handleOpenSteamIdModal();
  };

  return (
    <div css={wrapper}>
      <div css={modalWrapper}>
        <div css={headerWrapper}>
          <h5>Steam ID 등록</h5>
          <AiOutlineClose onClick={handleCloseModal} size="23" />
        </div>
        <input type="text" placeholder="Steam ID" />
        <input type="password" placeholder="Password" />
        <div css={buttonWrapper}>
          <button>등록</button>
        </div>
      </div>
    </div>
  );
}

const wrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const modalWrapper = css`
  width: 360px;
  background: #352c42;
  border-radius: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 35px;
  display: flex;
  flex-direction: column;

  > input {
    border: none;
    outline: none;
    background: none;
    font-size: 16px;
    color: #ffffff;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 15px;
    box-shadow: inset 5px 5px 10px 1px #271f31;

    ::placeholder {
      color: #b4b4b4;
      opacity: 1;
    }
  }

  > button {
    text-align: center;
    width: 200px;
  }
`;

const headerWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  > svg {
    cursor: pointer;
  }
`;

const buttonWrapper = css`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;

  > button {
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 5px;
    padding: 10px 70px;
    font-size: 16px;
    background: #756292;
    color: white;

    :hover {
      transition: all 1s;
      background: #a692c4;
    }
  }
`;

export default ProfileSteamIdModal;