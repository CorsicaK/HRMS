package com.hrmsht.service;

import com.hrmsht.entity.TalentAllowance;

import java.util.List;
import java.util.Map;

public interface TalentAllowanceService {
    /**
     * 获取人才津贴档次列表
     * @return
     */
    List<Map<String, Object>> findAll();
    /**
     * 判断是否存在该档人才津贴
     * @param t_id
     * @return
     */
    int isHasGrade(int t_id);

    /**
     * 删除该档人才津贴
     * @param t_id
     * @return
     */
    int deleteGrade(int t_id);

    /**
     * 增加人才津贴档次
     * @param talentAllowance
     * @return
     */
    int addGrade(TalentAllowance talentAllowance);

    /**
     * 修改人才津贴
     * @param talentAllowance
     * @return
     */
    int updateGrade(TalentAllowance talentAllowance);
}
