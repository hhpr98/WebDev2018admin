export const getHomePage = (req, res) => {

    res.render("home/index", { title: "Trang chủ" });
}