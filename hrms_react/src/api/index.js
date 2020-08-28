/* 
  包含应用中所有接口请求函数的模块 
  所有接口函数都以reg开头 
  每个接口函数返回值都是promise
*/
import ajax from './ajax'


/* 登录页 */
//登录
const BASE = ''
export const regLogin = (login) => ajax(BASE + '/login/', login, 'POST')
//注册
export const regRegister = (register) => ajax(BASE + '/login/register/', register, 'POST')

/* 员工管理 */
//查询所有员工
export const reqStaff = () => ajax(BASE + '/manage/staff/', 'GET')
//删除员工操作
export const reqDeleteStaff = (staffId) => ajax(BASE + '/manage/staff/' + staffId, staffId, 'DELETE')
//查询不同类型员工
export const reqStypeStaff = (stype) => ajax(BASE + '/manage/staff/' + stype, 'GET')
//查询员工编号查询员工
export const regGetStaffById = (staffId) => ajax(BASE + '/manage/staff/user/' + staffId, 'GET')
//添加员工
export const reqAddStaff = (staff) => ajax(BASE + '/manage/staff/', staff, 'POST')
//修改员工信息操作
export const reqUpdateStaff = (staff) => ajax(BASE + '/manage/staff/', staff, 'PUT')
//根据部门获取员工
export const reqGetStaff = (ApartmentId) => ajax(BASE + '/manage/staff/apart/' + ApartmentId, 'GET')
//员工离职操作
export const reqQuit = (staffId) => ajax(BASE + '/manage/staff/quit/' + staffId, staffId, 'PUT')
//实习员工转正操作
export const reqToRegular = (staffId) => ajax(BASE + '/manage/staff/toregular/' + staffId, staffId, 'PUT')
//员工退休操作
export const reqRetire = (staffId) => ajax(BASE + '/manage/staff/retire/' + staffId, staffId, 'PUT')
//获取总员工数
export const reqStaffNum = () => ajax(BASE + '/manage/staff/allnum', 'GET')
//获取部门员工数
export const reqGetApartmentStaff =()=> ajax(BASE+'/manage/staff/apartmentStaff','GET')
//获取部门员工分布
export const reqGetEducation =()=>ajax(BASE+'/manage/staff/education','GET')
//查询暂无工资条员工
export const reqNoSalaryStaff = () => ajax(BASE + '/manage/staff/nosalary', 'GET')


/* 部门管理 */
//查询所有部门
export const reqApartments = () => ajax(BASE + '/manage/apartment/', 'GET')
//删除部门
export const reqDeleteApartment = (ApartmentId) => ajax(BASE + '/manage/apartment/' + ApartmentId, ApartmentId, 'DELETE')
//修改部门信息
export const reqUpdateApartment = (apartment) => ajax(BASE + '/manage/apartment/', apartment, 'PUT')
//增加部门
export const reqAddApartment = (apartment) => ajax(BASE + '/manage/apartment/', apartment, 'POST')

/* 工资类别 */
/* 基本工资 */
//查询基本工资类别
export const reqBasicSalary = () => ajax(BASE + '/manage/salary/basicSalary/', 'GET')
//删除基本工资类别
export const reqDeleteBasicSalary = (basicSalaryId) => ajax(BASE + '/manage/salary/basicSalary/' + basicSalaryId, basicSalaryId, 'DELETE')
//增加基本工资类别
export const reqAddBasicSalary = (basicSalary) => ajax(BASE + '/manage/salary/basicSalary/', basicSalary, 'POST')
//更新基本工资类别
export const reqUpdateBasicSalary = (basicSalary) => ajax(BASE + '/manage/salary/basicSalary/', basicSalary, 'PUT')
/* 高温津贴 */
//查询高温津贴类别
export const reqHighTempSalary = () => ajax(BASE + '/manage/salary/htAllowance/', 'GET')
//删除高温津贴类别
export const reqDeleteHighTempSalary = (highTempSalaryId) => ajax(BASE + '/manage/salary/htAllowance/' + highTempSalaryId, highTempSalaryId, 'DELETE')
//更新高温津贴类别
export const reqUpdateHighTempSalary = (highTempSalary) => ajax(BASE + '/manage/salary/htAllowance/', highTempSalary, 'PUT')
//增加高温津贴类别
export const reqAddHighTempSalary = (highTempSalary) => ajax(BASE + '/manage/salary/htAllowance/', highTempSalary, 'POST')
/* 人才津贴 */
//查询人才津贴类别
export const reqTalentSalary = () => ajax(BASE + '/manage/salary/talent/', 'GET')
//删除人才津贴类别
export const reqDeleteTalentSalary = (talentSalaryId) => ajax(BASE + '/manage/salary/talent/' + talentSalaryId, talentSalaryId, 'DELETE')
//增加人才津贴类别
export const reqAddTalentSalary = (talentSalary) => ajax(BASE + '/manage/salary/talent/', talentSalary, 'POST')
//更新人才津贴类别
export const reqUpdateTalentSalary = (talentSalary) => ajax(BASE + '/manage/salary/talent/', talentSalary, 'PUT')
/* 退休金 */
//查询退休金类别
export const reqPensionSalary = () => ajax(BASE + '/manage/salary/pension/', 'GET')
//更新退休金类别
export const reqUpdatePensionSalary = (pensionSalary) => ajax(BASE + '/manage/salary/pension/', pensionSalary, 'PUT')
//删除退休金类别
export const reqDeletePensionSalary = (pensionSalaryId) => ajax(BASE + '/manage/salary/pension/' + pensionSalaryId, pensionSalaryId, 'DELETE')
//增加退休金类别
export const reqAddPensionSalary = (pensionSalary) => ajax(BASE + '/manage/salary/pension/', pensionSalary, 'POST')
/* 员工工资记录 */
//查询所有工资记录
export const reqSalary = () => ajax(BASE + '/manage/salary/','GET')
//删除员工工资记录
export const reqDeleteSalary = (staffId) => ajax(BASE + '/manage/salary/'+staffId, staffId, 'DELETE')
//更新员工工资记录
export const reqUpdateSalary = (salary) => ajax(BASE + '/manage/salary/', salary, 'PUT')
//添加员工工资记录
export const reqAddSalary = (salary) => ajax(BASE + '/manage/salary/', salary, 'POST')

//添加用户
export const regAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

/* 角色管理 */
//获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')
//添加角色
export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add', { roleName }, 'POST')