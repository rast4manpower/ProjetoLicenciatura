module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Products", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  return Product;

 // Product.associate = (models) => {
    // Um produto pertence a um usuário
   // Product.belongsTo(models.User, {
    //  foreignKey: {
   //     name: "userId",
     //   allowNull: false,
    //  },
   // });
 // };

  
};
