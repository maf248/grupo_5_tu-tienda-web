module.exports = (sequelize, DataTypes) => {
    
    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        product_id: {
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
        tableName: 'sections',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    
    const Section = sequelize.define("Section", cols, config);
    
    Section.associate = function(models) {
        Section.belongsTo(models.Product, {
            as: "Products",
            foreignKey: "product_id"
        })
        Section.hasMany(models.Content, {
            as: "contens",
            foreignKey: "contens_id"
        })
    }
    
    
    return Section;
    
}