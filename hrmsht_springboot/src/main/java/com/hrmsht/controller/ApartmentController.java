package com.hrmsht.controller;

import com.hrmsht.entity.Apartment;
import com.hrmsht.service.ApartmentService;
import com.hrmsht.utils.resUtil.Result;
import com.hrmsht.utils.resUtil.ResultUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manage/apartment")
public class ApartmentController {
    @Autowired
    private ApartmentService service;

    @ApiOperation(value = "获取所有部门列表",notes = "所有部门")
    @GetMapping(value = "/")
    public Result<Map<String, Object>> findAll(){
        List<Map<String, Object>> data = service.findAll();
        return  ResultUtil.success(data);
    }

    @ApiOperation(value = "删除部门",notes = "根据部门编号删除部门")
    @DeleteMapping(value = "/{a_id}")
    public Result<Integer> deleteApartment(@PathVariable String a_id){
        int isHas = service.isHasApartment(a_id);
        int res = 0;
        if (isHas==1) {
            res = service.deleteApartment(a_id);
        }
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "添加部门",notes = "添加部门")
    @PostMapping(value = "/")
    public Result<Integer> addApartment(@RequestBody Apartment apartment){
        int res = service.addApartment(apartment);
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "修改部门信息",notes = "根据部门编号修改员工信息")
    @PutMapping(value = "/")
    public Result<Integer> updateApartment(@RequestBody Apartment apartment){
        int isHas = service.isHasApartment(apartment.getA_id());
        int res = 0;
        if (isHas==1){
                res = service.updateApartment(apartment);
        }
        return ResultUtil.success(res);
    }

}
