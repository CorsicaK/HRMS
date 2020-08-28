package com.hrmsht.service;

import com.hrmsht.entity.Apartment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;


import java.sql.*;
import java.util.List;
import java.util.Map;

@Service
public class ApartmentServiceImpt implements ApartmentService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT apartment.*,count(s_id) as num FROM apartment LEFT JOIN staff ON (staff.a_id = apartment.a_id AND (staff.stype='实习' OR staff.stype='正式')) GROUP BY a_id";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
        return data;
    }

    @Override
    public int isHasApartment(String a_id) {
        String sql = "select * from apartment where a_id=?";
        List<Apartment> apartment = jdbcTemplate.query(sql, new Object[]{a_id}, new ApartmentRowMapper());
        if (apartment!=null && apartment.size()>0){
            return 1;
        } else {
            return 0;
        }
    }


    @Override
    public int deleteApartment(String a_id) {
        String sql = "delete from apartment where a_id = ?";
        return jdbcTemplate.update(sql,a_id);
    }

    @Override
    public int addApartment(Apartment apartment) {
        String sql = "insert into apartment(a_id,a_name,a_admin,phone) values(?,?,?,?)";
        int resRow = jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement newapartment = connection.prepareStatement(sql,new String[]{});
                newapartment.setString(1,apartment.getA_id());
                newapartment.setString(2,apartment.getA_name());
                newapartment.setString(3,apartment.getA_admin());
                newapartment.setInt(4,apartment.getPhone());
                return newapartment;
            }
        });
        return resRow;
    }


    @Override
    public int updateApartment(Apartment apartment) {
        String sql = "update apartment set  a_name=?,a_admin=?,phone=? where a_id=?";
        int res = jdbcTemplate.update(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement changeApartment) throws SQLException {
                changeApartment.setString(1, apartment.getA_name());
                changeApartment.setString(2, apartment.getA_admin());
                changeApartment.setInt(3, apartment.getPhone());
                changeApartment.setString(4, apartment.getA_id());
            }
        });
        return res;
    }
}

class ApartmentRowMapper implements RowMapper<Apartment> {

    public Apartment mapRow(ResultSet resultSet, int i) throws SQLException {
        Apartment apartment = new Apartment();
        apartment.setA_id(resultSet.getString("a_id"));
        apartment.setA_name(resultSet.getString("a_name"));
        apartment.setA_admin(resultSet.getString("a_admin"));
        apartment.setPhone(resultSet.getInt("phone"));
        return apartment;
    }
}

