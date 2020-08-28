package com.hrmsht.service;

import com.hrmsht.entity.Salary;
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
public class SalaryServiceImpt implements SalaryService{
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT sa.*,s.duty,s.education,s.stype,s.s_name,b.b_salary,ht.ht_salary,p.p_salary,t.t_salary " +
                "FROM salary sa LEFT JOIN staff s ON  sa.s_id=s.s_id " +
                "LEFT JOIN pension_allowance p ON sa.p_id=p.p_id " +
                "LEFT JOIN ht_allowance ht ON sa.ht_id=ht.ht_id " +
                "LEFT JOIN talent_allowance t ON sa.t_id=t.t_id " +
                "LEFT JOIN basic_salary b ON sa.b_id=b.b_id";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
        return data;
    }

    @Override
    public int isHasSalary(int s_id) {
        String sql = "SELECT * FROM salary WHERE s_id=?;";
        List<Salary> salary = jdbcTemplate.query(sql, new Object[]{s_id}, new SalaryServiceRowMapper());
        if (salary != null && salary.size() > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public int deleteSalary(int s_id) {
        String sql = "delete from salary where s_id = ?";
        return jdbcTemplate.update(sql, s_id);
    }

    @Override
    public int addSalary(Salary salary) {
        String sql = "insert into salary(s_id,b_id,ht_id,t_id,p_id,achievements,a_explain,other_allowance,o_explain) " +
                "values(?,?,?,?,?,?,?,?,?)";
        int resRow = jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement newSalary = connection.prepareStatement(sql, new String[]{});
                newSalary.setInt(1, salary.getS_id());
                newSalary.setInt(2, salary.getB_id());
                newSalary.setInt(3, salary.getHt_id());
                newSalary.setInt(4, salary.getT_id());
                newSalary.setInt(5, salary.getP_id());
                newSalary.setInt(6, salary.getAchievements());
                newSalary.setString(7, salary.getA_explain());
                newSalary.setInt(8, salary.getOther_allowance());
                newSalary.setString(9, salary.getO_explain());
                return newSalary;
            }
        });
        return resRow;
    }

    @Override
    public int updateSalary(Salary salary) {
        String sql = "UPDATE salary SET b_id=?,ht_id=?,t_id=?,p_id=?,achievements=?,a_explain=?," +
                "other_allowance=?,o_explain=? WHERE s_id=?";
        int resRow = jdbcTemplate.update(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement changeSalary) throws SQLException {
                changeSalary.setInt(1, salary.getB_id());
                changeSalary.setInt(2, salary.getHt_id());
                changeSalary.setInt(3, salary.getT_id());
                changeSalary.setInt(4, salary.getP_id());
                changeSalary.setInt(5, salary.getAchievements());
                changeSalary.setString(6, salary.getA_explain());
                changeSalary.setInt(7, salary.getOther_allowance());
                changeSalary.setString(8, salary.getO_explain());
                changeSalary.setInt(9, salary.getS_id());
            }
        });
        return resRow;
    }
}

class SalaryServiceRowMapper implements RowMapper<Salary> {

    public Salary mapRow(ResultSet resultSet, int i) throws SQLException {
        Salary salary = new Salary();
        salary.setS_id(resultSet.getInt("s_id"));
        salary.setB_id(resultSet.getInt("b_id"));
        salary.setHt_id(resultSet.getInt("ht_id"));
        salary.setT_id(resultSet.getInt("t_id"));
        salary.setP_id(resultSet.getInt("p_id"));
        salary.setAchievements(resultSet.getInt("achievements"));
        salary.setA_explain(resultSet.getString("a_explain"));
        salary.setOther_allowance(resultSet.getInt("other_allowance"));
        salary.setO_explain(resultSet.getString("o_explain" ));
        return salary;
    }
}
