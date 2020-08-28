package com.hrmsht.service;

import com.hrmsht.entity.BasicSalary;

import java.util.List;
import java.util.Map;

public interface BasicSalaryService {
    /**
     * 获取基本工资档次列表
     * @return
     */
    List<Map<String, Object>> findAll();
    /**
     * 判断是否存在该档基本工资
     * @param b_id
     * @return
     */
    int isHasGrade(int b_id);

    /**
     * 删除该档工资
     * @param b_id
     * @return
     */
    int deleteGrade(int b_id);

    /**
     * 增加基本工资档次
     * @param basicSalary
     * @return
     */
    int addGrade(BasicSalary basicSalary);

    /**
     * 修改基本工资
     * @param basicSalary
     * @return
     */
    int updateGrade(BasicSalary basicSalary);
}
