package com.hrmsht.controller;

import com.hrmsht.entity.Pension;
import com.hrmsht.service.PensionService;
import com.hrmsht.utils.resUtil.Result;
import com.hrmsht.utils.resUtil.ResultUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manage/salary/pension")
public class PensionController {
    @Autowired
    private PensionService service;

    @ApiOperation(value = "获取所有档次的退休金",notes = "退休金类型")
    @GetMapping(value = "/")
    public Result<Map<String, Object>> findAll(){
        List<Map<String, Object>> data = service.findAll();
        return  ResultUtil.success(data);
    }

    @ApiOperation(value = "删除档次",notes = "删除该档退休金")
    @DeleteMapping(value = "/{p_id}")
    public Result<Integer> deleteGrade(@PathVariable int p_id){
        int isHas = service.isHasGrade(p_id);
        int res = 0;
        if (isHas==1) {
            res = service.deleteGrade(p_id);
        }
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "添加档次",notes = "添加退休金档次")
    @PostMapping(value = "/")
    public Result<Integer> addGrade(@RequestBody Pension grade){
        int res = service.addGrade(grade);
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "修改",notes = "修改该档退休金信息")
    @PutMapping(value = "/")
    public Result<Integer> updateGrade(@RequestBody Pension grade){
        int isHas = service.isHasGrade(grade.getP_id());
        int res = 0;
        if (isHas==1){
            res = service.updateGrade(grade);
        }
        return ResultUtil.success(res);
    }
}
