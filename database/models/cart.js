module.exports = (sequelize, DataTypes) => {
    const Carts = sequelize.define(
        "Carts",
        {
            id: { // id giỏ hàng
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                autoIncrement: true,
                autoIncrement: 1
            },
            totalAmount: {// tổng tiền
                type: DataTypes.BIGINT,
                allowNull: true,
                defaultValue: 0
            },
            isDeleted: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0 // chưa xóa
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {}
    );
    Carts.associate = () => {
        // associations can be defined here

    };
    return Carts;
};