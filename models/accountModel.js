import { Accounts} from "../database/models";


export const getAccountByID = async (userId) => {

    // hoặc cách này : isDeleted = 0 là tài khoản chưa xóa thôi, hiện tại chưa xóa thì nó vẫn = 0 hết
    const _users = await Accounts.findOne({
        where: {
            isDeleted: 0,
            id: userId
        }
    });
    return _users;
}
export const updateUserInfo = async (Name, phone, email, adress, userID)=>{
    await Accounts.update({
        name : Name,
        phonenumber: phone,
        address: adress,
        email:email
   },{
       where:{
           id: userID
       }
   });
}

// luu hinh anh nguoi dung vao db 
export const saveUser1 = async (id, update_img) => {

    // hoặc cách này : isDeleted = 0 là tài khoản chưa xóa thôi, hiện tại chưa xóa thì nó vẫn = 0 hết
    const _users = await Accounts.findOne({
        where: {
            isDeleted: 0,
            id: id
        }
    });
    _users.image = update_img;
    await _users.save();
    return _users;
}