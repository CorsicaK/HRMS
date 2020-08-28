package com.hrmsht.controller;

import com.hrmsht.entity.TalentAllowance;
import com.hrmsht.service.TalentAllowanceService;
import com.hrmsht.utils.resUtil.Result;
import com.hrmsht.utils.resUtil.ResultUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manage/salary/talent")
public class TalentAllowanceController {
    @Autowired
    private TalentAllowanceService service;

    @ApiOperation(value = "获取所有档次的人才津贴",notes = "人才津贴类型")
    @GetMapping(value = "/")
    public Result<Map<String, Object>> findAll(){
        List<Map<String, Object>> data = service.findAll();
        return  ResultUtil.success(data);
    }

    @ApiOperation(value = "删除档次",notes = "删除该档人才津贴")
    @DeleteMapping(value = "/{t_id}")
    public Result<Integer> deleteGrade(@PathVariable int t_id){
        int isHas = service.isHasGrade(t_id);
        int res = 0;
        if (isHas==1) {
            res = service.deleteGrade(t_id);
        }
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "添加档次",notes = "添加人才津贴档次")
    @PostMapping(value = "/")
    public Result<Integer> addGrade(@RequestBody TalentAllowance grade){
        int res = service.addGrade(grade);
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "修改",notes = "修改该档人才津贴信息")
    @PutMapping(value = "/")
    public Result<Integer> updateGrade(@RequestBody TalentAllowance grade){
        int isHas = service.isHasGrade(grade.getT_id());
        int res = 0;
        if (isHas==1){
            res = service.updateGrade(grade);
        }
        return ResultUtil.success(res);
    }
}
