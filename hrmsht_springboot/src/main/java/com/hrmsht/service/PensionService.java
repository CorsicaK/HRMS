package com.hrmsht.service;

import com.hrmsht.entity.Pension;

import java.util.List;
import java.util.Map;

public interface PensionService {
    /**
     * 获取退休金档次列表
     * @return
     */
    List<Map<String, Object>> findAll();
    /**
     * 判断是否存在该档退休金
     * @param p_id
     * @return
     */
    int isHasGrade(int p_id);

    /**
     * 删除该档退休金
     * @param p_id
     * @return
     */
    int deleteGrade(int p_id);

    /**
     * 增加退休金档次
     * @param pension
     * @return
     */
    int addGrade(Pension pension);

    /**
     * 修改退休金
     * @param pension
     * @return
     */
    int updateGrade(Pension pension);
}
