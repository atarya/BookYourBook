const { sequelize } = require('../../config/psqldb');

const Exchange = sequelize.define('Exchange', {
    exchange_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    book_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    holder_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    exchange_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    borrow_duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    return_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    review: {
        type: DataTypes.UUID,
        allowNull: true
    }
}, {
    // For the sake of clarity we specify our indexes
    indexes: [{ unique: true, fields: ['exchange_id'] }],
    timestamps: true
});

// `sequelize.define` also returns the model
console.log(Exchange === sequelize.models.Exchange); // true

module.exports = {
    Exchange,
    sequelize,
}