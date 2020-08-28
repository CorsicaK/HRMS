package com.hrmsht.service;

import com.hrmsht.entity.HTAllowance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Service
public class HTAllowanceImpt implements HTAllowanceService{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT ht_allowance.*,count(salary.ht_id) as num FROM ht_allowance LEFT JOIN salary ON ht_allowance.ht_id = salary.ht_id GROUP BY ht_allowance.ht_id";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
        return data;
    }

    @Override
    public int isHasGrade(int ht_id) {
        String sql = "select * from ht_allowance where ht_id=?";
        List<HTAllowance> htAllowance = jdbcTemplate.query(sql, new Object[]{ht_id}, new HTAllowanceRowMapper());
        if (htAllowance!=null && htAllowance.size()>0){
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public int deleteGrade(int ht_id) {
        String sql = "delete from ht_allowance where ht_id = ?";
        return jdbcTemplate.update(sql,ht_id);
    }

    @Override
    public int addGrade(HTAllowance htAllowance) {
        String sql = "insert into ht_allowance(ht_name,ht_salary,ht_range,ht_explain) values(?,?,?,?)";
        int resRow = jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement newGrade = connection.prepareStatement(sql,new String[]{});
                newGrade.setString(1,htAllowance.getHt_name());
                newGrade.setInt(2,htAllowance.getHt_salary());
                newGrade.setString(3,htAllowance.getHt_range());
                newGrade.setString(4,htAllowance.getHt_explain());
                return newGrade;
            }
        });
        return resRow;
    }

    @Override
    public int updateGrade(HTAllowance htAllowance) {
        String sql = "update ht_allowance set  ht_name=?,ht_salary=?,ht_range=?,ht_explain=? where ht_id=?";
        int res = jdbcTemplate.update(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement changeGrade) throws SQLException {
                changeGrade.setString(1, htAllowance.getHt_name());
                changeGrade.setInt(2, htAllowance.getHt_salary());
                changeGrade.setString(3, htAllowance.getHt_range());
                changeGrade.setString(4, htAllowance.getHt_explain());
                changeGrade.setInt(5, htAllowance.getHt_id());
            }
        });
        return res;
    }
}



class HTAllowanceRowMapper implements RowMapper<HTAllowance> {

    public HTAllowance mapRow(ResultSet resultSet, int i) throws SQLException {
        HTAllowance htAllowance = new HTAllowance();
        htAllowance.setHt_id(resultSet.getInt("ht_id"));
        htAllowance.setHt_name(resultSet.getString("ht_name"));
        htAllowance.setHt_salary(resultSet.getInt("ht_salary"));
        htAllowance.setHt_range(resultSet.getString("ht_range"));
        htAllowance.setHt_explain(resultSet.getString("ht_explain" ));
        return htAllowance;
    }
}
