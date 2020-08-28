package com.hrmsht.service;

import com.hrmsht.entity.BasicSalary;
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
public class BasicSalaryImpt implements BasicSalaryService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT basic_salary.*,count(salary.b_id) as num FROM basic_salary LEFT JOIN salary ON basic_salary.b_id = salary.b_id GROUP BY basic_salary.b_id";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
        return data;
    }

    @Override
    public int isHasGrade(int b_id) {
        String sql = "select * from basic_salary where b_id=?";
        List<BasicSalary> basicSalary = jdbcTemplate.query(sql, new Object[]{b_id}, new BasicSalaryRowMapper());
        if (basicSalary!=null && basicSalary.size()>0){
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public int deleteGrade(int b_id) {
        String sql = "delete from basic_salary where b_id = ?";
        return jdbcTemplate.update(sql,b_id);
    }

    @Override
    public int addGrade(BasicSalary basicSalary) {
        String sql = "insert into basic_salary(b_name,b_salary,b_range,b_explain) values(?,?,?,?)";
        int resRow = jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement newGrade = connection.prepareStatement(sql,new String[]{});
                newGrade.setString(1,basicSalary.getB_name());
                newGrade.setInt(2,basicSalary.getB_salary());
                newGrade.setString(3,basicSalary.getB_range());
                newGrade.setString(4,basicSalary.getB_explain());
                return newGrade;
            }
        });
        return resRow;
    }

    @Override
    public int updateGrade(BasicSalary basicSalary) {
        String sql = "update basic_salary set  b_name=?,b_salary=?,b_range=?,b_explain=? where b_id=?";
        int res = jdbcTemplate.update(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement changeGrade) throws SQLException {
                changeGrade.setString(1, basicSalary.getB_name());
                changeGrade.setInt(2, basicSalary.getB_salary());
                changeGrade.setString(3, basicSalary.getB_range());
                changeGrade.setString(4, basicSalary.getB_explain());
                changeGrade.setInt(5, basicSalary.getB_id());
            }
        });
        return res;
    }
}
class BasicSalaryRowMapper implements RowMapper<BasicSalary> {

    public BasicSalary mapRow(ResultSet resultSet, int i) throws SQLException {
        BasicSalary basicSalary = new BasicSalary();
        basicSalary.setB_id(resultSet.getInt("b_id"));
        basicSalary.setB_name(resultSet.getString("b_name"));
        basicSalary.setB_salary(resultSet.getInt("b_salary"));
        basicSalary.setB_range(resultSet.getString("b_range"));
        basicSalary.setB_explain(resultSet.getString("b_explain" ));
        return basicSalary;
    }
}

