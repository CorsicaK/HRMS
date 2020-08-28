package com.hrmsht.entity;

//序列化接口
import lombok.Data;

import java.sql.Date;

@Data
public class Staff {
    private int s_id;
    private String s_name;
    private String a_id;
    private String a_name;
    private String education;
    private String duty;
    private String card_id;
    private Date in_time;
    private String stype;
    private String phone;
    private String nation;
    private String gender;
    private String marry;
    private String political;
    private String area;
    private Date birth;
    private Date toregular_time;
    private Date quit_time;
    private Date retire_time;
    private String other;
    private int hasSalary;
    private int b_id;
    private int t_id;
    private int ht_id;
    private int p_id;
    private int achievements;
    private int other_allowance;
}
