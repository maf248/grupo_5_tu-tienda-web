module.exports = (sequelize, DataTypes) => {

    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }
    
    const config = {
        tableName: 'carts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
    const Cart = sequelize.define("Cart", cols, config);
    
    Cart.associate = function(models) {
        Cart.belongsTo(models.User, {
            as: "Users",
            foreignKey: "user_id"
        })
        Cart.belongsTo(models.Category, {
            as: "Categories",
            foreignKey: "category_id"
        })
        Cart.belongsTo(models.Product, {
            as: "Products",
            foreignKey: "product_id"
        })
    }
    
    
    return Cart;
    
    }
    