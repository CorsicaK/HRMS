package com.hrmsht.controller;

import com.hrmsht.entity.HTAllowance;
import com.hrmsht.service.HTAllowanceService;
import com.hrmsht.utils.resUtil.Result;
import com.hrmsht.utils.resUtil.ResultUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manage/salary/htAllowance")
public class HTAllowanceController {
    @Autowired
    private HTAllowanceService service;

    @ApiOperation(value = "获取所有档次的高温津贴",notes = "高温津贴类型")
    @GetMapping(value = "/")
    public Result<Map<String, Object>> findAll(){
        List<Map<String, Object>> data = service.findAll();
        return  ResultUtil.success(data);
    }

    @ApiOperation(value = "删除档次",notes = "删除该档高温津贴")
    @DeleteMapping(value = "/{ht_id}")
    public Result<Integer> deleteGrade(@PathVariable int ht_id){
        int isHas = service.isHasGrade(ht_id);
        int res = 0;
        if (isHas==1) {
            res = service.deleteGrade(ht_id);
        }
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "添加档次",notes = "添加高温津贴档次")
    @PostMapping(value = "/")
    public Result<Integer> addGrade(@RequestBody HTAllowance grade){
        int res = service.addGrade(grade);
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "修改",notes = "修改该档高温津贴信息")
    @PutMapping(value = "/")
    public Result<Integer> updateGrade(@RequestBody HTAllowance grade){
        int isHas = service.isHasGrade(grade.getHt_id());
        int res = 0;
        if (isHas==1){
            res = service.updateGrade(grade);
        }
        return ResultUtil.success(res);
    }
}
