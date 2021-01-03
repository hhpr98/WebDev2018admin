import express from "express";
// for authenticate
import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
import passport from "passport";
const localStrategy = require("passport-local").Strategy;

import { Products } from "../database/models";
import homeRouter from "./homeRouter";
import productRouter from "./productRouter";
import accountRounter from "./accountRouter";

import { getAccountAuthenticate, getLoginPage, getRegisterPage, postRegisterPage } from "../controllers/accountController"

const indexRouter = express.Router();

indexRouter.use("/dashboard", homeRouter);
indexRouter.use("/account", (req, res, next) => {
    // neu da authenticat thi cho phep di vao trong
    if (req.isAuthenticated()) {
        next();
    }
    else
        res.render("error/autheticate");
}, accountRounter);
// indexRouter.use("/user", userRouter);
indexRouter.use("/product", productRouter);
indexRouter.get("/test", async (req, res) => { // test thử connect database
    const product = await Products.findAll();
    console.log(product); // test OK
    res.render("home/index");
});

// for login


indexRouter.route("/")
    .get(getLoginPage)
    // .post(passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/",failureFlash : true}));
    .post(function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) { 
                return next(err); }
            if (!user) { 
                req.session.valid = "Mật khẩu hoặc tài khoản không đúng";
                return res.redirect('/'); 
            }
            req.logIn(user, function (err) {

                
                if (err) { 
                    return next(err); }
                return res.redirect('/dashboard');
            });
        })(req, res, next);
    });
passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
// check tài khoản để login vào
passport.use(new localStrategy( // này để passport dùng
    async (username, password, done) => {
        // lay tu db ra password tuong ung voi username, neu khong co thi la "";
        var account;
        try {
            account = await getAccountAuthenticate(username);// chỗ này nè a
        }
        catch (err) {
            console.log("Err while getting password from db!!")
        }

        if (account == null) {
            return done(null, false);
        }
        else {
            if (bcrypt.compareSync(password, account.pw)) {
                return done(null, account.id);
            }
            else {
                return done(null, false);
            }
        }
    }
))
passport.serializeUser((id, done) => {
    // ghi vao session
    done(null, id);
})
passport.deserializeUser((id, done) => {

    //deserializeUser để kiểm tra thông tin người dùng mỗi khi người dùng access vào các tài nguyên khác (/private). Vì lúc này thông tin xác thực đã được generate ra một session và được lưu trong cookies  của trình duyệt.
    if (id != null) {
        return done(null, id);
    }
    else {
        return done(null, false);
    }
})

export default indexRouter;