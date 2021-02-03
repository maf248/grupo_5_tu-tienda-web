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
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('tienda_web', 'pagina_web'),
            allowNull: false
        },
        title_banner: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        subtitle_banner: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: null
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
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
    const Product = sequelize.define("Product", cols, config);
    
    Product.associate = function() {
        Product.hasMany(models.User, {
            as: "Users",
            foreignKey: "product_id"
        })
        Product.hasMany(models.Section, {
            as: "Sections",
            foreignKey: "product_id"
        })
        Product.hasMany(models.Cart, {
            as: "Carts",
            foreignKey: "product_id"
        })
        Product.belongsToMany(models.Category, {
            as: "Categories",
            through: "category_product",
            foreignKey: "product_id",
            otherKey: "category_id",
            timestamps: true
        })
    }
    
    
    return Product;
    
    }