const Sequelize = require("sequelize");

module.exports = class Room extends Sequelize.Model{
    static init(sequelize){
        return super.init(
            {
                title:{
                    type:Sequelize.STRING(200),
                    allowNull:false
                },
                content:{
                    type:Sequelize.TEXT
                },
                address:{
                    type:Sequelize.TEXT,
                    allowNull:false
                },
                latitude:{
                    type:Sequelize.STRING(200),
                },
                longitude:{
                    type:Sequelize.STRING(200),
                }
            },
            {
                sequelize,
                timestamps:true,
                underscored:true,
                paranoid: true,
                charset:"utf8mb4",
                collate:"utf8mb4_general_ci"
            }
        )
    }
    static associate(db){
        //room은 seller에 연관이 되어있다 belongsTo
        //room은 여러개의 option을 가질 수 있다 hasMany
        //room은 여러개의 이미지를 가질 수 있다 hasMany
        db.Room.belongsTo(db.Seller,{foreignKey:"seller_id",targetKey:"id"});
        db.Room.hasMany(db.Option,{foreignKey:"room_id",sourceKey:"id"});
        db.Room.hasMany(db.Image,{foreignKey:"room_id",sourceKey:"id"});
        
    }

}