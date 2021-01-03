
import { getAccountByID, updateUserInfo} from "../models/accountModel";


import catchAsync from "../libs/catchAsync";

export const getAccountPage = catchAsync(
    async (req, res) => {
        const id = "14653d9c-95c3-482f-b4cf-f7b15ddff46c";
        const users = await getAccountByID(id);
        res.render("account/info", { title: "Account", user:users});
    }
  );

  export const updateInfo = catchAsync(
    async(req, res) => {
      //
        // thay đổi id này sau
      const id = '14653d9c-95c3-482f-b4cf-f7b15ddff46c';
      //
      await updateUserInfo(req.body.userName, req.body.userPhone, req.body.userEmail, req.body.userAddress, id);
        const users = await getAccountByID(id);
        res.redirect("/account");
      }
  )
  