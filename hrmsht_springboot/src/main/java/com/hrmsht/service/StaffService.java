package com.hrmsht.service;

import com.hrmsht.entity.Staff;

import java.util.List;
import java.util.Map;


public interface StaffService {
    /**
     * 获取员工数量
     * @return
     */
    int[] getAllStaffs();

    /**
     * 获取全部员工
     * @return
     */
    List<Map<String, Object>> findAll();

    /**
     * 获取无工资条员工
     * @return
     */
    List<Map<String, Object>> findNoSalaryStaff();

    /**
     * 获取员工学历数据
     * @return
     */
    List<Map<String, Object>> findEducation();
    /**
     * 获取部门各类员工数据
     * @return
     */
    List<Map<String, Object>> findApartmentStaff();

    /**
     * 根据员工类型获取员工
     * @param stype
     * @return
     */
    List<Staff> getBystype(String stype);

    /**
     * 根据员工编号获取员工
     * @param s_id
     * @return
     */
    List<Staff> getById(int s_id);

    /**
     * 根据部门类型获取员工
     * @param a_id
     * @return
     */
    List<Staff> getByAId(String a_id);

    /**
     * 增加员工
     * @param staff
     * @return
     */
    int addStaff(Staff staff);

    /**
     * 根据员工编号删除员工
     * @param s_id
     * @return
     */
    int deleteStaff(int s_id);

    /**
     * 修改员工信息
     * @param staff
     * @return
     */
    int updateStaff(Staff staff);


    /**
     * 员工离职操作
     * @param s_id
     * @return
     */
    int quitStaff(int s_id);

    /**
     * 实习员工转正操作
     * @param s_id
     * @return
     */
    int toRegularStaff(int s_id);

    /**
     * 员工退休操作
     * @param s_id
     * @return
     */
    int retireStaff(int s_id);

    /**
     * 判断是否存在该员工
     * @param s_id
     * @return
     */
    int isHasStaff(int s_id);
}


