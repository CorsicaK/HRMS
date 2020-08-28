package com.hrmsht.service;

import com.hrmsht.entity.Pension;
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
public class PensionServiceImpt implements PensionService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT pension_allowance.*,count(salary.p_id) as num FROM pension_allowance LEFT JOIN salary " +
                "ON pension_allowance.p_id = salary.p_id GROUP BY pension_allowance.p_id";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
        return data;
    }

    @Override
    public int isHasGrade(int p_id) {
        String sql = "SELECT * FROM pension_allowance WHERE p_id=?;";
        List<Pension> pension = jdbcTemplate.query(sql, new Object[]{p_id}, new PensionServiceRowMapper());
        if (pension != null && pension.size() > 0) {
            return 1;
        } else {
            return 0;
        }
    }


    @Override
    public int deleteGrade(int p_id) {
        String sql = "delete from pension_allowance where p_id = ?";
        return jdbcTemplate.update(sql, p_id);
    }

    @Override
    public int addGrade(Pension pension) {
        String sql = "insert into pension_allowance(p_name,p_salary,p_range,p_explain) values(?,?,?,?)";
        int resRow = jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement newGrade = connection.prepareStatement(sql, new String[]{});
                newGrade.setString(1, pension.getP_name());
                newGrade.setInt(2, pension.getP_salary());
                newGrade.setString(3, pension.getP_range());
                newGrade.setString(4, pension.getP_explain());
                return newGrade;
            }
        });
        return resRow;
    }

    @Override
    public int updateGrade(Pension pension) {
        String sql = "UPDATE pension_allowance SET p_name=?,p_salary=?,p_range=?,p_explain=? WHERE p_id=?";
        int resRow = jdbcTemplate.update(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement changeGrade) throws SQLException {
                changeGrade.setString(1, pension.getP_name());
                changeGrade.setInt(2, pension.getP_salary());
                changeGrade.setString(3, pension.getP_range());
                changeGrade.setString(4, pension.getP_explain());
                changeGrade.setInt(5, pension.getP_id());
            }
        });
        return resRow;
    }
}


class PensionServiceRowMapper implements RowMapper<Pension> {

    public Pension mapRow(ResultSet resultSet, int i) throws SQLException {
        Pension pension = new Pension();
        pension.setP_id(resultSet.getInt("p_id"));
        pension.setP_name(resultSet.getString("p_name"));
        pension.setP_salary(resultSet.getInt("p_salary"));
        pension.setP_range(resultSet.getString("p_range"));
        pension.setP_explain(resultSet.getString("p_explain" ));
        return pension;
    }
}
