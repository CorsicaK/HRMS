package com.hrmsht.service;

import com.hrmsht.entity.Apartment;

import java.util.List;
import java.util.Map;

public interface ApartmentService {
    /**
     * 获取部门列表
     * @return
     */
    List<Map<String, Object>> findAll();
    /**
     * 判断是否存在该员工
     * @param a_id
     * @return
     */
    int isHasApartment(String a_id);

    /**
     * 根据部门号删除部门
     * @param a_id
     * @return
     */
    int deleteApartment(String a_id);

    /**
     * 增加部门
     * @param apartment
     * @return
     */
    int addApartment(Apartment apartment);

    /**
     * 修改部门信息
     * @param apartment
     * @return
     */
    int updateApartment(Apartment apartment);

}
