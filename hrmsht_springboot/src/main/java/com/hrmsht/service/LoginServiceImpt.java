package com.hrmsht.service;

import com.hrmsht.entity.Login;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class LoginServiceImpt implements LoginService{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public Boolean canLogin(Login login) {
        int uid=login.getU_id();
        String psd=login.getPsd();
        String sql = "select u_id,psd from user where u_id=?";
        List<Login> list = jdbcTemplate.query(sql, new Object[]{uid}, new LoginServiceRowMapper());
        if (list!=null && list.size()>0){
            Login thelogin=list.get(0);
            String thepsd=thelogin.getPsd();
            if(psd.equals(thepsd)){
                return true;
            }else{
                return false;
            }
        } else {
            return false;
        }
    }

    @Override
    public int addLogin(Login login) {
        String sql = "insert into user(u_id,psd,r_id,stat) values(?,?,6,1)";
        int resRow = jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement newUser = connection.prepareStatement(sql, new String[]{});
                newUser.setInt(1, login.getU_id());
                newUser.setString(2, login.getPsd());
                return newUser;
            }
        });
        return resRow;
    }

}

class LoginServiceRowMapper implements RowMapper<Login> {

    public Login mapRow(ResultSet resultSet, int i) throws SQLException {
        Login login = new Login();
        login.setU_id(resultSet.getInt("u_id"));
        login.setPsd(resultSet.getString("psd"));
        return login;
    }
}
