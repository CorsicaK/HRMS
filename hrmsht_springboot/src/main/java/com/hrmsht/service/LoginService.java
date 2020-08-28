package com.hrmsht.service;

import com.hrmsht.entity.Login;


public interface LoginService {
    /**
     * 获取部门列表
     * @param login
     * @return
     */
    Boolean canLogin(Login login);

    /**
     * 用户注册
     * @param login
     * @return
     */
    int addLogin(Login login);

}
