const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init(
            {
                email:{
                    type: Sequelize.STRING(200),
                    allowNull:false,
                    unique:true,
                },
                password:{ 
                    type: Sequelize.STRING(200),
                    allowNull:false,    
                },
                name:{
                    type: Sequelize.STRING(30),
                    allowNull:false,                
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
        db.User.hasMany(db.Post, {foreignKey:"user_id", sourceKey:"id"});
    }
}