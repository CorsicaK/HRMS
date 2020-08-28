package com.hrmsht.controller;

import com.hrmsht.entity.Staff;
import com.hrmsht.service.StaffService;
import com.hrmsht.utils.resUtil.Result;
import com.hrmsht.utils.resUtil.ResultUtil;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/manage/staff")
public class StaffController {
    @Autowired
    private StaffService service;

    @ApiOperation(value="获取员工总数" ,notes="")
    @GetMapping(value="/allnum")
    public Result<int[]> getAllStaffs(){
        return  ResultUtil.success(service.getAllStaffs());
    }

    @ApiOperation(value = "获取所有员工列表",notes = "所有员工")
    @GetMapping(value = "/")
    public Result<Map<String, Object>> findAll(){
        List<Map<String, Object>> data = service.findAll();
        return  ResultUtil.success(data);
    }

    @ApiOperation(value = "获取无工资条员工列表",notes = "暂无工资条员工")
    @GetMapping(value = "/nosalary")
    public Result<Map<String, Object>> findNoSalaryStaff(){
        List<Map<String, Object>> data = service.findNoSalaryStaff();
        return  ResultUtil.success(data);
    }

    @ApiOperation(value = "员工学历分布",notes = "员工学历")
    @GetMapping(value = "/education")
    public Result<Map<String, Object>> findEducation(){
        List<Map<String, Object>> data = service.findEducation();
        return  ResultUtil.success(data);
    }

    @ApiOperation(value = "获取部门各类员工数",notes = "部门各类员工数量")
    @GetMapping(value = "/apartmentStaff")
    public Result<Map<String, Object>> findApartmentStaff(){
        List<Map<String, Object>> data = service.findApartmentStaff();
        return  ResultUtil.success(data);
    }

    @ApiOperation(value = "获取员工",notes = "根据员工类型获取员工")
    @GetMapping(value = "/{stype}")
    public Result<Staff> getBystype(@PathVariable String stype){
        List<Staff> data = service. getBystype(stype);
        return ResultUtil.success(data);
    }

    @ApiOperation(value = "获取员工",notes = "根据部门获取员工")
    @GetMapping(value = "/apart/{a_id}")
    public Result<Staff> getByAId(@PathVariable String a_id){
        List<Staff> data = service. getByAId(a_id);
        return ResultUtil.success(data);
    }

    @ApiOperation(value = "根据员工编号获取员工",notes = "根据员工编号获取员工")
    @GetMapping(value = "/user/{s_id}")
    public Result<Staff> getById(@PathVariable int s_id){
        List<Staff> data = service. getById(s_id);
        return ResultUtil.success(data);
    }

    @ApiOperation(value = "添加员工",notes = "添加员工")
    @PostMapping(value = "/")
    public Result<Integer> addStaff(@RequestBody Staff staff){
        int res = service.addStaff(staff);
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "删除员工",notes = "根据员工编号删除员工")
    @DeleteMapping(value = "/{s_id}")
    public Result<Integer> deleteStaff(@PathVariable int s_id){
        int isHas = service.isHasStaff(s_id);
        int res = 0;
        if (isHas==1) {
            res = service.deleteStaff(s_id);
        }
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "修改员工信息",notes = "根据员工编号修改员工信息")
    @PutMapping(value = "/")
    public Result<Integer> updateStaff(@RequestBody Staff staff){
    // System.out.println(staff.getS_id());
        int isHas = service.isHasStaff(staff.getS_id());
        int res = 0;
        if (isHas==1){
            res = service.updateStaff(staff);
        }
        return ResultUtil.success(res);
    }

    @ApiOperation(value = "员工离职操作",notes = "根据员工编号等级员工离职信息")
    @PutMapping(value = "/quit/{s_id}")
    public Integer quitStaff(@PathVariable int s_id){
        //  System.out.println(s_id);
        int isHas = service.isHasStaff(s_id);
        int res = 0;
        if (isHas==1) {
            res = service.quitStaff(s_id);
        }
        return res;
    }

    @ApiOperation(value = "实习员工转正操作",notes = "根据员工编号登记员工转正信息")
    @PutMapping(value = "/toregular/{s_id}")
    public Integer toRegularStaff(@PathVariable int s_id){
        //  System.out.println(s_id);
        int isHas = service.isHasStaff(s_id);
        int res = 0;
        if (isHas==1) {
            res = service.toRegularStaff(s_id);
        }
        return res;
    }

    @ApiOperation(value = "员工退休操作",notes = "根据员工编号登记退休信息")
    @PutMapping(value = "/retire/{s_id}")
    public Integer retireStaff(@PathVariable int s_id){
        //  System.out.println(s_id);
        int isHas = service.isHasStaff(s_id);
        int res = 0;
        if (isHas==1) {
            res = service.retireStaff(s_id);
        }
        return res;
    }
}
