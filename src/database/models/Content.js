module.exports = (sequelize, DataTypes) => {

    const cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        section_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
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
    
    const Content = sequelize.define("Content", cols, config);
    
    Content.associate = function(models) {
        Content.belongsTo(models.Section, {
            as: "Sections",
            foreignKey: "section_id"
        })
    }
    
    
    return Content;
    
    }