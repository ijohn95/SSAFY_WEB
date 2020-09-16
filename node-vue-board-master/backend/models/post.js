const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                title:{
                    type: Sequelize.STRING(200),
                    allowNull : false,
                },
                content:{
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                file: {
                    type: Sequelize.TEXT
                }
            },{
                sequelize,
                timestamps: true,
                underscored: true,
                paranoid: false,
                charset: "utf8mb4",
                collate:"utf8mb4_general_ci"
            }
        )
    }
    static associate(db){
        db.Post.belongsTo(db.User, {foreignKey: "user_id", targetKey: "id"});
    }
}