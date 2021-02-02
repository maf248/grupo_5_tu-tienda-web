module.exports = (sequelize, DataTypes) => {

const cols = {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    hash_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: NULL
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
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
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}

const User = sequelize.define("User", cols, config);

return User;

}
