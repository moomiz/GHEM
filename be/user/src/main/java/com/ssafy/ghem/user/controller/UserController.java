package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.UserService;
import com.ssafy.ghem.user.model.vo.HttpVO;
import com.ssafy.ghem.user.model.vo.SteamUserVO;
import com.ssafy.ghem.user.model.vo.UserVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping
    @ApiOperation(value = "처음 닉네임과 자기소개 설정 및 닉네임/자기소개 수정에 사용하시면 됩니다.\n",
            notes = "user_id : 유저 교유번호\n" +
                    "nickname : 설정하고자 하는 닉네임\n"+
                    "introduce : 설정하고자 하는 자기소개\n" +
                    "gender : 설정하고자 하는 성별" +
                    "birth :  설정하고자 하는 생일" +
                    "#은 꼭 막아주세요!!!!",
            response = String.class)
    public ResponseEntity<?> updateUserInfo(@RequestBody UserVO userInfo){
        HttpVO http = userService.updateUserInfo(userInfo);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("{user_id}")
    @ApiOperation(value = "사용자 디테일 정보 조회",
            notes = "user_id를 넘겨주세요!",
            response = String.class)
    public ResponseEntity<?> getUserDetail(@PathVariable String user_id){
        HttpVO http = userService.getUserDetail(Long.parseLong(user_id));
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복 체크 조회",
            notes = "posible이 true를 리턴하면 해당 닉네임 사용가능 \n" +
                    "false를 리턴하면 해당 닉네임 사용불가능",
            response = String.class)
    public ResponseEntity<?> checkNickname(@PathVariable String nickname){
        HttpVO http = userService.checkNickname(nickname);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @PutMapping("/steam")
    @ApiOperation(value = "스팀아이디를 설정할 때, 사용",
            notes = "user_id, steam_id를 body에 담아서 넘겨주세요",
            response = String.class)
    public ResponseEntity<?> updateSteamId(@RequestBody SteamUserVO steamUser){
        HttpVO http = userService.updateSteamId(steamUser);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

}
