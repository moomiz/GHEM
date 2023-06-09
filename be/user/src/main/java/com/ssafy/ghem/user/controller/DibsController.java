package com.ssafy.ghem.user.controller;

import com.ssafy.ghem.user.model.service.DibsService;
import com.ssafy.ghem.user.model.vo.DibsVO;
import com.ssafy.ghem.user.model.vo.HttpVO;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/dibs")
public class DibsController {

    private final DibsService dibsService;

    @PostMapping
    @ApiOperation(value = "찜 API\n",
            notes = "app_id = (게임 고유번호)\n" +
                    "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)\n",
            response = String.class)
    public ResponseEntity<?> doDibs(@RequestBody DibsVO dibsInfo){
        HttpVO http = dibsService.doDibs(dibsInfo);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("/{app_id}/{user_id}")
    @ApiOperation(value = "게임당 찜 여부를 알려주는 API\n",
            notes = "user_id = 유저 고유번호(카카오, 네이버 고유번호 아님)\n" +
                    "app_id = 게임 고유번호\n" +
                    "data에 아무것도 날라오지 않으면 찜하지 않은 게임입니다.",
            response = String.class)
    public ResponseEntity<?> checkDibs(@PathVariable Long app_id, @PathVariable Long user_id){
        HttpVO http = dibsService.checkDibs(app_id, user_id);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @GetMapping("/my/{user_id}")
    @ApiOperation(value = "유저가 찜한 모든 게임 목록을 보여주는 API",
    notes = "user_id = 유저 고유번호",
    response = String.class)
    public ResponseEntity<?> listDibGames(@PathVariable Long user_id){
        HttpVO http = dibsService.listDibGame(user_id);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{dibs_id}")
    @ApiOperation(value = "찜을 해제하는 API",
            notes = "dibs_id = 찜 고유번호\n",
            response = String.class)
    public ResponseEntity<?> deleteDibs(@PathVariable Long dibs_id ){
        HttpVO http = dibsService.deleteDibs(dibs_id);
        return new ResponseEntity<HttpVO>(http, HttpStatus.OK);
    }
}
