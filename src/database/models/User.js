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
        defaultValue: null
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    },
    product_id: {
        type: DataTypes.INTEGER.UNSIGNED
    },
    category_id: {
        type: DataTypes.INTEGER.UNSIGNED
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

User.associate = function(models) {
    User.belongsTo(models.Product, {
        as: "Products",
        foreignKey: "product_id"
    })
    User.belongsTo(models.Category, {
        as: "Categories",
        foreignKey: "category_id"
    })
    User.hasMany(models.Cart, {
        as: "Carts",
        foreignKey: "user_id"
    })
}


return User;

}
