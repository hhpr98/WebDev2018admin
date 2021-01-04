import {
  getAccountByID,
  updateUserImage,
  updateUserInfoById,
  updatePasswordById,
  getNPIById,
  getAdminAccount,
  getAccountListDatabase,
  lockAcoount
} from "../models/accountModels";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;
import catchAsync from "../libs/catchAsync";

// function 
const getListPaginate = (currentPage, pageCount) => {
  const arrPage = [];
  for (var i = 1; i <= pageCount; i++) {
      arrPage.push({
          isCurrentPage: i === currentPage ? true : false,
          pageId: i
      });
  }
  return arrPage;
}
// get layout
export const getLoginPage = catchAsync(
  async (req, res) => {
    // var noti = req.flash('loginMessage')[0];
    var message = req.session.valid;
    req.session.valid = null;
    res.render("home/login", { title: "Đăng nhập", layout: "layout/loginlayout" , Noti:message});
  }
);

export const getAccountPage = catchAsync(
  async (req, res) => {
    var message = req.session.valid;
    req.session.valid = null;
    // lay tam thong tin acc
    const id = req.user;
    const user_info = await getAccountByID(id);
    res.render("account/info", { title: "Tài khoản", user: user_info, noti:message});
  }
);
export const getAccountDetail = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    // lay tam thong tin acc
    const user_info = await getAccountByID(id);
    res.render("account/account-detail", { title: "Thông tin tài khoản", user: user_info});
  }
);
// get
export const getAccountAuthenticate = async (accountName) => {
  const pw = await getAdminAccount(accountName);
  return pw;
}
// get all 
export const getAllAccountPage = catchAsync(
  async (req, res) => {

      const currentPage = +req.query.page || 1;
      const limitPerPage = 6;
      const list = await getAccountListDatabase(limitPerPage, currentPage);

      const totalCount = list.count || 0;
      const pageCount = Math.ceil(totalCount / limitPerPage);
      const previousPage = currentPage - 1;
      const nextPage = currentPage + 1;
      const isPreviousPage = (currentPage <= 1 ? false : true);
      const isNextPage = (currentPage >= pageCount ? false : true);

      res.render("account/account-list", {
          title: "Danh sách tài khoản",
          accountList: list.rows,
          currentPage, pageCount, previousPage, nextPage, isPreviousPage, isNextPage,
          listPaginate: getListPaginate(currentPage, pageCount)
      });
  }
);


// action
export const lockSelectedAccount = catchAsync(
  async (req, res) => {
    const id = req.params.id;
    var value = req.params.isBanned;
    console.log(value);
    if(value == "0")  // khoa tai khoan
      value =1;
    else
      value = 0;
      console.log(value);
    // lay tam thong tin acc
    const user_info = await lockAcoount(id, value);
    res.redirect("/dashboard/account/account-list");
  }
);

export const logoutAccount = catchAsync(
  async (req, res) => {
    req.logout();
    res.redirect('/');
  }
)

// update
export const updateAvata = catchAsync(
  async (req, res, filename) => {
    const id = req.user;
    const file_src = "/img/uploads/" + filename;
    await updateUserImage(id, file_src);
    res.redirect("/dashboard/account");
  }
);
export const updateInfo = catchAsync(
  async (req, res) => {
    const id = req.user;
    req.session.valid = "Đã cập nhật thông tin tài khoản";

    await updateUserInfoById(req.body.name, req.body.phone, req.body.email, req.body.address, id);
    res.redirect("/dashboard/account");
  }
)
export const updatePassword = catchAsync(
  async (req, res) => {
    const id = req.user;
    const account = await getNPIById(id);
    //
    if (bcrypt.compareSync(req.body.oldpw, account.pw)){
      await updatePasswordById(req.body.newpw, id);
      req.session.valid = "Đã cập nhật mật khẩu";
    }
      
    else{
      req.session.valid = 'Mật khẩu cũ không khớp!!';
    }
      res.redirect("/dashboard/account");
  }
)

////


