module.exports = (sequelize, DataTypes) => {
    
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        products_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false

        },
        title: {
            type: DataTypes.STRING,
        allowNull: false

        },
        image: {
            type: DataTypes.STRING,
        allowNull: false

        },
        crated_at: {
            type: DataTypes.DATE,
            allowNull: false

        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false

        }
    }
    const config = {
        tableName: 'section',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
    const User = sequelize.define("User", cols, config);
    
    Section.associate = function() {
        User.belongsTo(models.Product, {
            as: "Products",
            foreignKey: "product_id"
        })
    }
    Section.associate = function() {
        User.belongsTo(models.Contens, {
            as: "contens",
            foreignKey: "contens_id"
        })
    

    }
    
    
    return Section;
    
}