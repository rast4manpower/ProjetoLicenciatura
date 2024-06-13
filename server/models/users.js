module.exports = (sequelize, DataTypes) => {

   const users =  sequelize.define("users", {  
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
   });

   return users 
}