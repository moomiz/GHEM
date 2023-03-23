package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.UserService;
import com.ssafy.ghem.user.model.vo.HttpVo;
import com.ssafy.ghem.user.model.vo.SteamUser;
import com.ssafy.ghem.user.model.vo.UserInfo;
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

    @PutMapping()
    @ApiOperation(value = "처음 닉네임과 자기소개 설정 및 닉네임/자기소개 수정에 사용하시면 됩니다.\n" +
            "#은 꼭 막아주세요!!!!",
            notes = "",
            response = String.class)
    public ResponseEntity<?> updateUserInfo(@RequestBody UserInfo userInfo){
        HttpVo http = userService.updateUserInfo(userInfo);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

    @PutMapping("/steam")
    @ApiOperation(value = "스팀아이디를 설정할 때, 사용하시면 됩니다.\n" +
            "ID에 특수기호를 삽입하지 못하도록 해주세요!!!",
            notes = "",
            response = String.class)
    public ResponseEntity<?> updateSteamId(@RequestBody SteamUser steamUser){
        HttpVo http = userService.updateSteamId(steamUser);
        return new ResponseEntity<HttpVo>(http, HttpStatus.OK);
    }

}
