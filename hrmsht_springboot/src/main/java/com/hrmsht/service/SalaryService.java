package com.hrmsht.service;

import com.hrmsht.entity.Salary;

import java.util.List;
import java.util.Map;

public interface SalaryService {
    /**
     * 获取员工工资列表
     * @return
     */
    List<Map<String, Object>> findAll();
    /**
     * 判断该员工是否有工资组成条
     * @param s_id
     * @return
     */
    int isHasSalary(int s_id);

    /**
     * 删除该员工工资条
     * @param s_id
     * @return
     */
    int deleteSalary(int s_id);

    /**
     * 增加员工工资
     * @param salary
     * @return
     */
    int addSalary(Salary salary);

    /**
     * 修改员工工资
     * @param salary
     * @return
     */
    int updateSalary(Salary salary);
}
