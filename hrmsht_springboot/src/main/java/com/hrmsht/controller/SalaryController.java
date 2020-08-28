package com.hrmsht.controller;

import com.hrmsht.entity.Pension;
import com.hrmsht.entity.Salary;
import com.hrmsht.service.SalaryService;
import com.hrmsht.utils.resUtil.Result;
import com.hrmsht.utils.resUtil.ResultUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manage/salary")
public class SalaryController {
    @Autowired
    private SalaryService service;

    @ApiOperation(value = "获取员工工资条",notes = "所有员工工资条")
    @GetMapping(value = "/")
    public Result<Map<String, Object>> findAll(){
        List<Map<String, Object>> data = service.findAll();
        return  ResultUtil.success(data);
    }

    @ApiOperation(value = "删除员工工资条",notes = "删除该条工资组成记录")
    @DeleteMapping(value = "/{s_id}")
    public Result<Integer> deleteSalary(@PathVariable int s_id){
        int isHas = service.isHasSalary(s_id);
        int res = 0;
        if (isHas==1) {
            res = service.deleteSalary(s_id);
        }
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "添加工资记录",notes = "添加工资记录")
    @PostMapping(value = "/")
    public Result<Integer> addSalary(@RequestBody Salary salary){
        int res = service.addSalary(salary);
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "修改该员工工资组成",notes = "修改")
    @PutMapping(value = "/")
    public Result<Integer> updateSalary(@RequestBody Salary salary){
        int isHas = service.isHasSalary(salary.getS_id());
        int res = 0;
        if (isHas==1){
            res = service.updateSalary(salary);
        }
        return ResultUtil.success(res);
    }
}
