package com.hrmsht.service;

import com.hrmsht.entity.TalentAllowance;
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
public class TalentAllowanceServiceImpt implements TalentAllowanceService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT talent_allowance.*,count(salary.t_id) as num FROM talent_allowance LEFT JOIN salary " +
                "ON talent_allowance.t_id = salary.t_id GROUP BY talent_allowance.t_id";
        List<Map<String, Object>> data = jdbcTemplate.queryForList(sql);
        return data;
    }

    @Override
    public int isHasGrade(int t_id) {
        String sql = "select * from talent_allowance where t_id=?";
        List<TalentAllowance> talentAllowance = jdbcTemplate.query(sql, new Object[]{t_id}, new TalentAllowanceRowMapper());
        if (talentAllowance!=null && talentAllowance.size()>0){
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public int deleteGrade(int t_id) {
        String sql = "delete from talent_allowance where t_id = ?";
        return jdbcTemplate.update(sql,t_id);
    }

    @Override
    public int addGrade(TalentAllowance talentAllowance) {
        String sql = "insert into talent_allowance(t_name,t_salary,t_range,t_explain) values(?,?,?,?)";
        int resRow = jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement newGrade = connection.prepareStatement(sql,new String[]{});
                newGrade.setString(1,talentAllowance.getT_name());
                newGrade.setInt(2,talentAllowance.getT_salary());
                newGrade.setString(3,talentAllowance.getT_range());
                newGrade.setString(4,talentAllowance.getT_explain());
                return newGrade;
            }
        });
        return resRow;
    }

    @Override
    public int updateGrade(TalentAllowance talentAllowance) {
        String sql = "update talent_allowance set  t_name=?,t_salary=?,t_range=?,t_explain=? where t_id=?";
        int res = jdbcTemplate.update(sql, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement changeGrade) throws SQLException {
                changeGrade.setString(1, talentAllowance.getT_name());
                changeGrade.setInt(2, talentAllowance.getT_salary());
                changeGrade.setString(3, talentAllowance.getT_range());
                changeGrade.setString(4, talentAllowance.getT_explain());
                changeGrade.setInt(5, talentAllowance.getT_id());
            }
        });
        return res;
    }


}
class TalentAllowanceRowMapper implements RowMapper<TalentAllowance> {

    public TalentAllowance mapRow(ResultSet resultSet, int i) throws SQLException {
        TalentAllowance talentAllowance = new TalentAllowance();
        talentAllowance.setT_id(resultSet.getInt("t_id"));
        talentAllowance.setT_name(resultSet.getString("t_name"));
        talentAllowance.setT_salary(resultSet.getInt("t_salary"));
        talentAllowance.setT_range(resultSet.getString("t_range"));
        talentAllowance.setT_explain(resultSet.getString("t_explain" ));
        return talentAllowance;
    }
}