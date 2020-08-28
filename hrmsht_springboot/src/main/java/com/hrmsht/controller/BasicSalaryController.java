package com.hrmsht.controller;


import com.hrmsht.entity.BasicSalary;
import com.hrmsht.service.BasicSalaryService;
import com.hrmsht.utils.resUtil.Result;
import com.hrmsht.utils.resUtil.ResultUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/manage/salary/basicSalary")
public class BasicSalaryController {
    @Autowired
    private BasicSalaryService service;

    @ApiOperation(value = "获取所有档次的基本工资",notes = "基本工资类型")
    @GetMapping(value = "/")
    public Result<Map<String, Object>> findAll(){
        List<Map<String, Object>> data = service.findAll();
        return  ResultUtil.success(data);
    }

    @ApiOperation(value = "删除档次",notes = "删除该档基本工资")
    @DeleteMapping(value = "/{b_id}")
    public Result<Integer> deleteGrade(@PathVariable int b_id){
        int isHas = service.isHasGrade(b_id);
        int res = 0;
        if (isHas==1) {
            res = service.deleteGrade(b_id);
        }
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "添加档次",notes = "添加基本工资档次")
    @PostMapping(value = "/")
    public Result<Integer> addGrade(@RequestBody BasicSalary grade){
        int res = service.addGrade(grade);
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "修改",notes = "修改该档基本工资信息")
    @PutMapping(value = "/")
    public Result<Integer> updateGrade(@RequestBody BasicSalary grade){
        int isHas = service.isHasGrade(grade.getB_id());
        int res = 0;
        if (isHas==1){
            res = service.updateGrade(grade);
        }
        return ResultUtil.success(res);
    }
}
