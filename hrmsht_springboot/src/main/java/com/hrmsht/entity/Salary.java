package com.hrmsht.entity;

import lombok.Data;

@Data
public class Salary {
    private int s_id;
    private String s_name;
    private String duty;
    private String education;
    private String type;
    private int b_id;
    private int b_salary;
    private int ht_id;
    private int ht_salary;
    private int t_id;
    private int t_salary;
    private int p_id;
    private int p_salary;
    private int achievements;
    private String a_explain;
    private int other_allowance;
    private String o_explain;

}
