module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Products", {
    sellerId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return Product;




};
