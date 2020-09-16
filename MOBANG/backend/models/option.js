const Sequelize = require("sequelize");

module.exports = class Option extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                item:{
                    type:Sequelize.STRING(200)
                }
            },
            {
                sequelize,
                timestamps:true,
                underscored:true,
                paranoid: false,
                charset:"utf8mb4",
                collate:"utf8mb4_general_ci"
            }
        )
    }
    static associate(db){
        // foreignKey:"room_id"
        db.Option.belongsTo(db.Room,{foreignKey:"room_id",targetKey:"id"});
    }

}