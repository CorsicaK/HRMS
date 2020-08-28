package com.hrmsht.service;

import com.hrmsht.entity.HTAllowance;

import java.util.List;
import java.util.Map;

public interface HTAllowanceService {

    /**
     * 获取高温津贴档次列表
     * @return
     */
    List<Map<String, Object>> findAll();
    /**
     * 判断是否存在该档高温津贴
     * @param ht_id
     * @return
     */
    int isHasGrade(int ht_id);

    /**
     * 删除该档高温津贴
     * @param ht_id
     * @return
     */
    int deleteGrade(int ht_id);

    /**
     * 增加高温津贴档次
     * @param htAllowance
     * @return
     */
    int addGrade(HTAllowance htAllowance);

    /**
     * 修改该档高温津贴
     * @param htAllowance
     * @return
     */
    int updateGrade(HTAllowance htAllowance);
}
