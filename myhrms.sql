/*
Navicat MySQL Data Transfer

Source Server         : hrms
Source Server Version : 80021
Source Host           : localhost:3306
Source Database       : myhrms

Target Server Type    : MYSQL
Target Server Version : 80021
File Encoding         : 65001

Date: 2020-08-28 11:06:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for apartment
-- ----------------------------
DROP TABLE IF EXISTS `apartment`;
CREATE TABLE `apartment` (
  `a_id` varchar(20) NOT NULL,
  `a_name` varchar(20) NOT NULL,
  `a_admin` varchar(10) NOT NULL,
  `phone` int NOT NULL,
  PRIMARY KEY (`a_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of apartment
-- ----------------------------
INSERT INTO `apartment` VALUES ('CWB01', '财务部', '陈楼', '75656565');
INSERT INTO `apartment` VALUES ('DADA', '测试', '111', '12345678');
INSERT INTO `apartment` VALUES ('JSB03', '技术部', '程光', '85656567');
INSERT INTO `apartment` VALUES ('RSB02', '人事部', '张丽', '85656566');
INSERT INTO `apartment` VALUES ('SWB04', '事务部', '朱丽霞', '85656568');

-- ----------------------------
-- Table structure for basic_salary
-- ----------------------------
DROP TABLE IF EXISTS `basic_salary`;
CREATE TABLE `basic_salary` (
  `b_id` int NOT NULL AUTO_INCREMENT,
  `b_name` varchar(15) NOT NULL,
  `b_salary` int NOT NULL,
  `b_range` varchar(100) DEFAULT NULL,
  `b_explain` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`b_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of basic_salary
-- ----------------------------
INSERT INTO `basic_salary` VALUES ('1', '退休离职档', '0', '退休或离职人员', '退休人员以退休金形式发放基本工资');
INSERT INTO `basic_salary` VALUES ('2', '一档', '5000', '', '');
INSERT INTO `basic_salary` VALUES ('3', '实习一档', '3000', '一般实习人员', null);
INSERT INTO `basic_salary` VALUES ('4', '实习二档', '4000', null, null);
INSERT INTO `basic_salary` VALUES ('5', '二档', '5500', null, null);
INSERT INTO `basic_salary` VALUES ('6', '三档', '6000', null, null);
INSERT INTO `basic_salary` VALUES ('7', '四档', '7000', null, null);
INSERT INTO `basic_salary` VALUES ('14', '人防', '520', null, null);

-- ----------------------------
-- Table structure for ht_allowance
-- ----------------------------
DROP TABLE IF EXISTS `ht_allowance`;
CREATE TABLE `ht_allowance` (
  `ht_id` int NOT NULL AUTO_INCREMENT,
  `ht_name` varchar(15) NOT NULL,
  `ht_salary` int NOT NULL,
  `ht_range` varchar(100) DEFAULT NULL,
  `ht_explain` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ht_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ht_allowance
-- ----------------------------
INSERT INTO `ht_allowance` VALUES ('1', '一档', '800', '本月高温户外作业时长>48h', null);
INSERT INTO `ht_allowance` VALUES ('2', '二档', '500', '本月高温户外作业时长>32h', null);
INSERT INTO `ht_allowance` VALUES ('3', '三档', '1500', '本月高温户外作业时长>60h', null);

-- ----------------------------
-- Table structure for pension_allowance
-- ----------------------------
DROP TABLE IF EXISTS `pension_allowance`;
CREATE TABLE `pension_allowance` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `p_name` varchar(15) NOT NULL,
  `p_salary` int NOT NULL,
  `p_range` varchar(100) DEFAULT NULL,
  `p_explain` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pension_allowance
-- ----------------------------
INSERT INTO `pension_allowance` VALUES ('1', '一档', '8000', '高干退休人员', null);
INSERT INTO `pension_allowance` VALUES ('2', '二档', '6000', '在职期间有杰出贡献', null);
INSERT INTO `pension_allowance` VALUES ('3', '三档', '4000', '一般退休人员', null);
INSERT INTO `pension_allowance` VALUES ('4', '四档', '2000', null, null);
INSERT INTO `pension_allowance` VALUES ('5', '五档', '6000', null, null);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `r_id` int NOT NULL AUTO_INCREMENT,
  `r_name` varchar(20) NOT NULL,
  `authority` varchar(150) NOT NULL,
  PRIMARY KEY (`r_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '超级管理员', '111');
INSERT INTO `role` VALUES ('2', '财务部主管', '222');
INSERT INTO `role` VALUES ('3', '人事部主管', '333');
INSERT INTO `role` VALUES ('4', '技术部主管', '444');
INSERT INTO `role` VALUES ('5', '事务部主管', '555');
INSERT INTO `role` VALUES ('6', '普通员工', '666');

-- ----------------------------
-- Table structure for salary
-- ----------------------------
DROP TABLE IF EXISTS `salary`;
CREATE TABLE `salary` (
  `s_id` int NOT NULL,
  `b_id` int DEFAULT NULL,
  `ht_id` int DEFAULT NULL,
  `t_id` int DEFAULT NULL,
  `p_id` int DEFAULT NULL,
  `achievements` double DEFAULT NULL,
  `a_explain` varchar(100) DEFAULT NULL,
  `other_allowance` int DEFAULT NULL,
  `o_explain` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`s_id`),
  KEY `s_b` (`b_id`),
  KEY `s_t` (`t_id`),
  KEY `s_p` (`p_id`),
  KEY `s_ht` (`ht_id`),
  CONSTRAINT `s_ht` FOREIGN KEY (`ht_id`) REFERENCES `ht_allowance` (`ht_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `s_s` FOREIGN KEY (`s_id`) REFERENCES `staff` (`s_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of salary
-- ----------------------------
INSERT INTO `salary` VALUES ('200101010', '1', null, null, '3', null, null, null, '');
INSERT INTO `salary` VALUES ('201501001', '7', null, '1', null, '0.3', null, null, null);
INSERT INTO `salary` VALUES ('201503001', '7', null, '1', null, '0.3', null, null, null);
INSERT INTO `salary` VALUES ('201503002', '6', null, '2', null, '0.15', null, null, null);
INSERT INTO `salary` VALUES ('201503003', '6', null, '1', null, '0.15', null, null, null);
INSERT INTO `salary` VALUES ('201503004', '6', null, '2', null, '0.15', null, null, null);
INSERT INTO `salary` VALUES ('201504001', '7', null, null, null, '0.3', null, null, null);
INSERT INTO `salary` VALUES ('201504005', '6', null, '1', null, '0.2', null, null, null);
INSERT INTO `salary` VALUES ('201603005', '6', null, '1', null, '0.2', null, null, null);
INSERT INTO `salary` VALUES ('201604002', '6', null, '2', null, '0.2', null, null, null);
INSERT INTO `salary` VALUES ('201604004', '6', null, '1', null, '0.2', null, null, null);
INSERT INTO `salary` VALUES ('201701002', '6', null, '1', null, '0.2', null, null, null);
INSERT INTO `salary` VALUES ('201702002', '6', null, '1', null, '0.2', null, null, null);
INSERT INTO `salary` VALUES ('201704003', '5', null, '1', null, '0.25', null, null, null);
INSERT INTO `salary` VALUES ('201801003', '6', null, '3', null, '0.25', null, null, null);
INSERT INTO `salary` VALUES ('201802001', '7', null, '1', null, '0.3', null, null, null);
INSERT INTO `salary` VALUES ('201802003', '6', null, '2', null, '0.2', null, null, null);
INSERT INTO `salary` VALUES ('202003006', '3', null, '1', null, '0.1', null, null, null);

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff` (
  `s_id` int NOT NULL,
  `s_name` varchar(10) NOT NULL,
  `a_id` varchar(20) NOT NULL,
  `education` enum('专科','本科','硕士','博士','其他') NOT NULL,
  `duty` varchar(20) DEFAULT NULL,
  `card_id` varchar(18) NOT NULL,
  `in_time` date NOT NULL,
  `stype` enum('实习','正式','退休','离职') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(11) NOT NULL,
  `nation` varchar(10) NOT NULL,
  `gender` enum('男','女') NOT NULL,
  `marry` enum('已婚','未婚') NOT NULL,
  `political` enum('中共党员','非党员') NOT NULL,
  `area` varchar(50) NOT NULL,
  `birth` date NOT NULL,
  `toregular_time` date DEFAULT NULL,
  `quit_time` date DEFAULT NULL,
  `retire_time` date DEFAULT NULL,
  `other` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`s_id`),
  KEY `s_a` (`a_id`),
  CONSTRAINT `s_a` FOREIGN KEY (`a_id`) REFERENCES `apartment` (`a_id`),
  CONSTRAINT `s_u` FOREIGN KEY (`s_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES ('200101010', '朱兴一', 'RSB02', '本科', null, '201251955111563331', '2001-06-01', '退休', '1785465235', '汉族', '男', '已婚', '中共党员', '上海', '1955-11-15', null, null, '2015-10-01', null);
INSERT INTO `staff` VALUES ('201501001', '陈楼', 'JSB03', '本科', '部门主管', '330713199105042565', '1970-01-01', '正式', '1742153265', '汉族', '男', '未婚', '中共党员', '浙江', '1991-05-04', null, null, null, '');
INSERT INTO `staff` VALUES ('201503001', '程光', 'JSB03', '本科', '部门主管', '330124199105231634', '2015-08-01', '正式', '1752365143', '汉族', '男', '未婚', '非党员', '浙江', '1991-05-23', null, null, null, null);
INSERT INTO `staff` VALUES ('201503002', '陈旭', 'JSB03', '硕士', null, '330213199011123131', '2015-04-02', '正式', '1785462153', '汉族', '男', '未婚', '中共党员', '浙江', '1990-11-23', null, null, null, null);
INSERT INTO `staff` VALUES ('201503003', '林火', 'JSB03', '本科', null, '330112199410131312', '2015-07-08', '正式', '1751626231', '汉族', '男', '未婚', '非党员', '浙江', '1994-10-13', null, null, null, null);
INSERT INTO `staff` VALUES ('201503004', '黄莉莉', 'JSB03', '硕士', null, '330124199310232212', '2015-06-02', '离职', '1562653265', '汉族', '女', '未婚', '非党员', '浙江', '1993-10-23', null, '2020-08-05', null, null);
INSERT INTO `staff` VALUES ('201504001', '朱丽霞', 'SWB04', '专科', '部门主管', '330215198910100226', '2015-06-01', '正式', '1721656325', '汉族', '女', '未婚', '中共党员', '浙江', '1989-10-11', null, null, null, null);
INSERT INTO `staff` VALUES ('201504005', '徐璐', 'SWB04', '本科', null, '330121992041523224', '2015-07-08', '离职', '1562635326', '汉族', '女', '已婚', '中共党员', '浙江', '1992-04-15', null, '2020-08-05', null, null);
INSERT INTO `staff` VALUES ('201603005', '徐晨', 'JSB03', '本科', null, '330124199505136221', '2016-08-04', '退休', '1562356235', '汉族', '女', '未婚', '非党员', '浙江', '1995-05-13', null, null, '2020-08-05', null);
INSERT INTO `staff` VALUES ('201604002', '陈欢', 'SWB04', '硕士', null, '330125199210242222', '2016-06-02', '正式', '1721565125', '布依族', '女', '未婚', '非党员', '浙江', '1992-10-24', null, null, null, null);
INSERT INTO `staff` VALUES ('201604004', '朱世新', 'SWB04', '本科', null, '330112199010111233', '2016-03-03', '正式', '1541265632', '白族', '男', '已婚', '非党员', '浙江', '1990-10-11', null, null, null, null);
INSERT INTO `staff` VALUES ('201701002', '庄行路', 'SWB04', '本科', null, '330625199402132332', '1970-01-01', '退休', '1785426536', '汉族', '男', '未婚', '非党员', '浙江', '1994-02-13', null, null, '2020-08-05', null);
INSERT INTO `staff` VALUES ('201702002', '陈凯', 'RSB02', '本科', null, '33060819940213631X', '2017-03-31', '离职', '1785469523', '汉族', '男', '未婚', '非党员', '浙江', '1994-02-13', null, '2020-08-06', null, null);
INSERT INTO `staff` VALUES ('201704003', '张兴', 'SWB04', '本科', null, '330212199305211214', '2017-07-01', '正式', '1752623526', '汉族', '男', '未婚', '非党员', '浙江', '1993-05-21', null, null, null, null);
INSERT INTO `staff` VALUES ('201801003', '楚新', 'JSB03', '博士', null, '330125198910231235', '1970-01-01', '退休', '1756565253', '汉族', '男', '已婚', '中共党员', '浙江', '1989-10-23', null, null, '2020-08-06', null);
INSERT INTO `staff` VALUES ('201802001', '张丽', 'RSB02', '本科', '部门主管', '330251994052622422', '2018-02-01', '正式', '1702563235', '汉族', '女', '未婚', '非党员', '浙江', '1994-05-26', null, null, null, null);
INSERT INTO `staff` VALUES ('201802003', '陈思璇', 'RSB02', '硕士', null, '330123199505130224', '2018-03-01', '正式', '1786523145', '汉族', '女', '未婚', '非党员', '江苏', '1995-05-13', null, null, null, null);
INSERT INTO `staff` VALUES ('202003006', '陈煦', 'JSB03', '本科', null, '330716199809163116', '2020-07-01', '正式', '1752632532', '汉族', '男', '未婚', '非党员', '浙江', '1998-09-16', '2020-08-05', null, null, null);
INSERT INTO `staff` VALUES ('202004006', '朱欣欣', 'SWB04', '本科', null, '330511998021265424', '2020-07-08', '正式', '1652953526', '汉族', '女', '未婚', '非党员', '浙江', '1998-02-12', '2020-08-05', null, null, null);
INSERT INTO `staff` VALUES ('202006112', '水电费', 'CWB01', '专科', null, '4554554', '2020-08-26', '正式', '17857698896', '大范甘迪', '女', '已婚', '非党员', '浙江', '2020-08-17', null, null, null, null);

-- ----------------------------
-- Table structure for talent_allowance
-- ----------------------------
DROP TABLE IF EXISTS `talent_allowance`;
CREATE TABLE `talent_allowance` (
  `t_id` int NOT NULL AUTO_INCREMENT,
  `t_name` varchar(15) NOT NULL,
  `t_salary` int NOT NULL,
  `t_range` varchar(100) DEFAULT NULL,
  `t_explain` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of talent_allowance
-- ----------------------------
INSERT INTO `talent_allowance` VALUES ('1', '一档', '250', '本科毕业生', '按月结算,标准2400元/年');
INSERT INTO `talent_allowance` VALUES ('2', '二档', '500', '硕士研究生', '按月结算,标准6000元/年');
INSERT INTO `talent_allowance` VALUES ('3', '三档', '1000', '博士研究生', '按月结算,标准12000元/年');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `u_id` int NOT NULL,
  `psd` varchar(20) NOT NULL,
  `r_id` int NOT NULL DEFAULT '6',
  `stat` int NOT NULL DEFAULT '0' COMMENT '0为启用,1为禁用',
  PRIMARY KEY (`u_id`),
  KEY `u_r` (`r_id`),
  CONSTRAINT `u_r` FOREIGN KEY (`r_id`) REFERENCES `role` (`r_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1111111', '11111111', '1', '0');
INSERT INTO `user` VALUES ('122254548', 'zhanxginnn', '6', '1');
INSERT INTO `user` VALUES ('200101010', 'zxx01010', '6', '0');
INSERT INTO `user` VALUES ('201501001', 'cl01005', '2', '0');
INSERT INTO `user` VALUES ('201503001', 'cg03001', '6', '0');
INSERT INTO `user` VALUES ('201503002', 'cx03002', '6', '0');
INSERT INTO `user` VALUES ('201503003', 'lh03003', '6', '0');
INSERT INTO `user` VALUES ('201503004', 'hll03004', '6', '0');
INSERT INTO `user` VALUES ('201504001', 'zlx04001', '6', '0');
INSERT INTO `user` VALUES ('201504005', 'xl04005', '6', '0');
INSERT INTO `user` VALUES ('201603005', 'xc03005', '6', '0');
INSERT INTO `user` VALUES ('201604002', 'ch04002', '6', '0');
INSERT INTO `user` VALUES ('201604004', 'zsx04004', '6', '0');
INSERT INTO `user` VALUES ('201701002', 'zx01001', '6', '0');
INSERT INTO `user` VALUES ('201702002', 'ck02002', '6', '0');
INSERT INTO `user` VALUES ('201704003', 'zx04003', '6', '0');
INSERT INTO `user` VALUES ('201801003', 'cx01002', '6', '0');
INSERT INTO `user` VALUES ('201802001', 'zl02001', '6', '0');
INSERT INTO `user` VALUES ('201802003', 'csx02003', '6', '0');
INSERT INTO `user` VALUES ('202003006', 'cx03006', '6', '0');
INSERT INTO `user` VALUES ('202004006', 'zxx04006', '6', '0');
INSERT INTO `user` VALUES ('202006111', 'zxxx1212', '6', '0');
INSERT INTO `user` VALUES ('202006112', 'zxx1212', '4', '0');
INSERT INTO `user` VALUES ('202016111', 'xxzxzx', '1', '0');
