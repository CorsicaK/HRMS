package com.hrmsht.controller;

import com.hrmsht.entity.Login;
import com.hrmsht.service.LoginService;
import com.hrmsht.utils.resUtil.Result;
import com.hrmsht.utils.resUtil.ResultUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    private LoginService service;

    @ApiOperation(value="确认登录" ,notes="")
    @PostMapping(value="/")
    public Result<Boolean> canLogin(@RequestBody Login login){
        Boolean yes=service.canLogin(login);
        return  ResultUtil.success(yes);
    }


    @ApiOperation(value = "用户注册",notes = "用户注册")
    @PostMapping(value = "/register")
    public Result<Integer> addLogin(@RequestBody Login login){
        int res = service.addLogin(login);
        return ResultUtil.success(res);
    }
}
