module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
});
  
//User.associate = (models) => {
  // Um usuário pode ter muitos produtos
 // User.hasMany(models.Product, {
   // as: "products", // Alias para a associação
   // foreignKey: {
   //   name: "userId",
   //   allowNull: false,
   // },
   // onDelete: "CASCADE",
  //});
//};

return Users;
};

