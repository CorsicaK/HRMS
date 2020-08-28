package com.hrmsht.service;

import com.hrmsht.entity.Staff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;


import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Date;

@Service
public class StaffServiceImpt implements StaffService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public int[] getAllStaffs() {
        String sql = "SELECT education name,count(*) as value FROM staff GROUP BY name;";
        List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);
        int[] data = new int[5];
        data[0] = jdbcTemplate.queryForObject("select count(1) from staff where stype<>'离职'", int.class);
        data[1] = jdbcTemplate.queryForObject("select count(1) from staff " +
                "where gender='男' and stype<>'离职'", int.class);
        data[2] =data[0]-data[1];
        data[3] = jdbcTemplate.queryForObject("select count(1) from staff " +
                "where area='浙江' and stype<>'离职'", int.class);
        data[4] =data[0]-data[3];
        return data;
    }

    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT staff.*,a_name,b_id FROM staff INNER JOIN apartment ON staff.a_id = apartment.a_id LEFT JOIN salary ON staff.s_id = salary.s_id;";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
        return data;
    }

    @Override
    public List<Map<String, Object>> findNoSalaryStaff() {
        String sql = "SELECT staff.s_id,s_name FROM staff LEFT JOIN salary ON staff.s_id=salary.s_id WHERE salary.s_id IS NULL";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
        return data;
    }

    @Override
    public List<Map<String, Object>> findEducation() {
        String sql = "SELECT education name,count(*) as value FROM staff GROUP BY name;";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
        return data;
    }

    @Override
    public List<Map<String, Object>> findApartmentStaff() {
        String sql = " select a_name name ,count(*) value,\n" +
                "sum(case when marry='已婚' then 1 else 0 end) marry,\n" +
                "sum(case when marry='未婚' then 1 else 0 end) unmarry,\n" +
                "sum(case when political='中共党员' then 1 else 0 end) dangyuan,\n" +
                "sum(case when political='非党员' then 1 else 0 end) undangyuan,\n" +
                "sum(case when stype='实习' then 1 else 0 end) internship,\n" +
                "sum(case when stype='正式' then 1 else 0 end) regular,\n" +
                "sum(case when stype='退休' then 1 else 0 end) retire\n" +
                "from staff,apartment \n" +
                "WHERE staff.a_id =apartment.a_id AND stype<>'离职'\n" +
                "GROUP BY a_name";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
        return data;
    }

//    @Override
//    public Staff getBystype(String stype) {
//        // TODO: 分页
//        String sql = "SELECT staff.*,a_name FROM staff INNER JOIN apartment ON staff.a_id = apartment.a_id AND staff.stype=?";
//        List<Staff> staff = jdbcTemplate.query(sql, new Object[]{stype}, new StaffRowMapper());
//        Staff data = null;
//        if (!staff.isEmpty()) {
//            data=staff.get(0);
//        }
//        return data;
//    }

    @Override
    public List<Staff> getBystype(String stype) {
        // TODO: 分页
        String sql = "SELECT staff.*,a_name FROM staff INNER JOIN apartment ON staff.a_id = apartment.a_id AND staff.stype=?";
        List<Staff> staff = jdbcTemplate.query(sql, new Object[]{stype}, new StaffRowMapper());
        return staff;
    }

    @Override
    public List<Staff> getById(int s_id) {
        String sql = "SELECT staff.*,a_name,salary.* FROM staff INNER JOIN apartment ON staff.a_id = apartment.a_id " +
                "INNER JOIN salary ON staff.s_id=salary.s_id AND staff.s_id=?";
        List<Staff> staff = jdbcTemplate.query(sql, new Object[]{s_id}, new StaffAllRowMapper());
        return staff;
    }

    @Override
    public List<Staff> getByAId(String a_id) {
        String sql = "SELECT staff.*,a_name FROM staff INNER JOIN apartment ON staff.a_id = apartment.a_id AND staff.a_id=?";
        List<Staff> staff = jdbcTemplate.query(sql, new Object[]{a_id}, new StaffRowMapper());
        return staff;
    }

    /**
     * @param staff
     * @return
     */
    @Override
    public int addStaff(Staff staff) {
        String sql = "insert into staff(s_id,s_name,a_id,education,duty,card_id,in_time,stype,phone,nation,gender,marry,political,area,birth,toregular_time,quit_time,retire_time,other)" +
                " values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        //KeyHolder keyHolder = new GeneratedKeyHolder();
        int resRow = jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement newstaff = connection.prepareStatement(sql,new String[]{});
                newstaff.setInt(1,staff.getS_id());
                newstaff.setString(2,staff.getS_name());
                newstaff.setString(3,staff.getA_id());
                newstaff.setString(4,staff.getEducation());
                newstaff.setString(5,staff.getDuty());
                newstaff.setString(6,staff.getCard_id());
                newstaff.setDate(7,staff.getIn_time());
                newstaff.setString(8,staff.getStype());
                newstaff.setString(9,staff.getPhone());
                newstaff.setString(10,staff.getNation());
                newstaff.setString(11,staff.getGender());
                newstaff.setString(12,staff.getMarry());
                newstaff.setString(13,staff.getPolitical());
                newstaff.setString(14,staff.getArea());
                newstaff.setDate(15,staff.getBirth());
                newstaff.setDate(16,staff.getToregular_time());
                newstaff.setDate(17,staff.getQuit_time());
                newstaff.setDate(18,staff.getRetire_time());
                newstaff.setString(19,staff.getOther());
                return newstaff;
            }
        });
        return resRow;
    }

    @Override
    public int deleteStaff(int s_id) {
        String sql = "delete from staff where s_id = ?";
        return jdbcTemplate.update(sql,s_id);
    }

    @Override
    public int updateStaff(Staff staff) {
        String sql = "update staff set  s_name=?,a_id=?,education=?,duty=?,card_id=?,in_time=?,stype=?," +
                "phone=?,nation=?,gender=?,marry=?,political=?,area=?,birth=?,toregular_time=?,quit_time=?,retire_time=?,other=? where s_id=?";
        int res = jdbcTemplate.update(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement changeStaff) throws SQLException {
                changeStaff.setString(1,staff.getS_name());
                changeStaff.setString(2,staff.getA_id());
                changeStaff.setString(3,staff.getEducation());
                changeStaff.setString(4,staff.getDuty());
                changeStaff.setString(5,staff.getCard_id());
                changeStaff.setDate(6,staff.getIn_time());
                changeStaff.setString(7,staff.getStype());
                changeStaff.setString(8,staff.getPhone());
                changeStaff.setString(9,staff.getNation());
                changeStaff.setString(10,staff.getGender());
                changeStaff.setString(11,staff.getMarry());
                changeStaff.setString(12,staff.getPolitical());
                changeStaff.setString(13,staff.getArea());
                changeStaff.setDate(14,staff.getBirth());
                changeStaff.setDate(15,staff.getToregular_time());
                changeStaff.setDate(16,staff.getQuit_time());
                changeStaff.setDate(17,staff.getRetire_time());
                changeStaff.setString(18,staff.getOther());
                changeStaff.setInt(19,staff.getS_id());
            }
        });
        return res;
    }

    @Override
    public int quitStaff(int s_id) {
        String sql = "update staff set stype='离职',quit_time=? where s_id=?";
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String today=sdf.format(date);
        int res = jdbcTemplate.update(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement changeStaff) throws SQLException {
                changeStaff.setDate(1, java.sql.Date.valueOf(today));
                changeStaff.setInt(2,s_id);
            }
        });
        return res;
    }

    @Override
    public int toRegularStaff(int s_id) {
        String sql = "update staff set stype='正式',toregular_time=? where s_id=?";
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String today=sdf.format(date);
        int res = jdbcTemplate.update(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement changeStaff) throws SQLException {
                changeStaff.setDate(1, java.sql.Date.valueOf(today));
                changeStaff.setInt(2,s_id);
            }
        });
        return res;
    }

    @Override
    public int retireStaff(int s_id) {
        String sql = "update staff set stype='退休',retire_time=? where s_id=?";
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String today=sdf.format(date);
        int res = jdbcTemplate.update(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement changeStaff) throws SQLException {
                changeStaff.setDate(1, java.sql.Date.valueOf(today));
                changeStaff.setInt(2,s_id);
            }
        });
        return res;
    }

    @Override
    public int isHasStaff(int s_id) {
        String sql = "select staff.*,a_name from staff inner join apartment where staff.a_id=apartment.a_id and s_id=?";
            List<Staff> staff = jdbcTemplate.query(sql, new Object[]{s_id}, new StaffRowMapper());
        if (staff!=null && staff.size()>0){
            return 1;
        } else {
            return 0;
        }
    }
}


    class StaffRowMapper implements RowMapper<Staff> {

        public Staff mapRow(ResultSet resultSet, int i) throws SQLException {
            Staff staff = new Staff();
            staff.setS_id(resultSet.getInt("s_id"));
            staff.setS_name(resultSet.getString("s_name"));
            staff.setA_id(resultSet.getString("a_id"));
            staff.setA_name(resultSet.getString("a_name"));
            staff.setEducation(resultSet.getString("education"));
            staff.setDuty(resultSet.getString("duty"));
            staff.setCard_id(resultSet.getString("card_id"));
            staff.setIn_time(resultSet.getDate("in_time"));
            staff.setStype(resultSet.getString("stype"));
            staff.setPhone(resultSet.getString("phone"));
            staff.setNation(resultSet.getString("nation"));
            staff.setGender(resultSet.getString("gender"));
            staff.setMarry(resultSet.getString("marry"));
            staff.setPolitical(resultSet.getString("political"));
            staff.setArea(resultSet.getString("area"));
            staff.setBirth(resultSet.getDate("birth"));
            staff.setToregular_time(resultSet.getDate("toregular_time"));
            staff.setQuit_time(resultSet.getDate("quit_time"));
            staff.setRetire_time(resultSet.getDate("retire_time"));
            staff.setOther(resultSet.getString("other"));
            return staff;
        }
    }

class StaffAllRowMapper implements RowMapper<Staff> {

    public Staff mapRow(ResultSet resultSet, int i) throws SQLException {
        Staff staff = new Staff();
        staff.setS_id(resultSet.getInt("s_id"));
        staff.setS_name(resultSet.getString("s_name"));
        staff.setA_id(resultSet.getString("a_id"));
        staff.setA_name(resultSet.getString("a_name"));
        staff.setEducation(resultSet.getString("education"));
        staff.setDuty(resultSet.getString("duty"));
        staff.setCard_id(resultSet.getString("card_id"));
        staff.setIn_time(resultSet.getDate("in_time"));
        staff.setStype(resultSet.getString("stype"));
        staff.setPhone(resultSet.getString("phone"));
        staff.setNation(resultSet.getString("nation"));
        staff.setGender(resultSet.getString("gender"));
        staff.setMarry(resultSet.getString("marry"));
        staff.setPolitical(resultSet.getString("political"));
        staff.setArea(resultSet.getString("area"));
        staff.setBirth(resultSet.getDate("birth"));
        staff.setToregular_time(resultSet.getDate("toregular_time"));
        staff.setQuit_time(resultSet.getDate("quit_time"));
        staff.setRetire_time(resultSet.getDate("retire_time"));
        staff.setOther(resultSet.getString("other"));
        staff.setB_id(resultSet.getInt("b_id"));
        staff.setHt_id(resultSet.getInt("ht_id"));
        staff.setT_id(resultSet.getInt("t_id"));
        staff.setP_id(resultSet.getInt("p_id"));
        staff.setOther_allowance(resultSet.getInt("other_allowance"));
        staff.setAchievements(resultSet.getInt("achievements"));
        return staff;
    }
}

