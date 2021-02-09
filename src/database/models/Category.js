module.exports = (sequelize, DataTypes) => {

    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        transaction_cost_percent: {
            type: DataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull: false
        },
        web_sections: {
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
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true
    }
    
    const Category = sequelize.define("Category", cols, config);
    
    Category.associate = function(models) {
        Category.hasMany(models.User, {
            as: "Users",
            foreignKey: "category_id"
        })
        Category.belongsToMany(models.Product, {
            as: "Products",
            through: "category_product",
            foreignKey: "category_id",
            otherKey: "product_id",
            timestamps: true
        })
        Category.hasMany(models.Cart, {
            as: "Carts",
            foreignKey: "category_id"
        })
        Category.belongsToMany(models.Benefit, {
            as: "Benefits",
            through: "benefit_category",
            foreignKey: "category_id",
            otherKey: "benefit_id",
            timestamps: true
        })
    }
    
    
    return Category;
    
    }
    