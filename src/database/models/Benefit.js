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
        description: {
            type: DataTypes.TEXT,
            allowNull: true

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
        tableName: 'Benefit',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    Category.associate = function() {
        Category.belongsToMany(models.Category, {
            as: "categories",
            through: "benefit_category",
            foreignKey: "benefit_id",
            otherKey: "category_id",
            timestamps: true
        })
    }
    
    
    return Benefit;
}