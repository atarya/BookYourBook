const { sequelize } = require('../../config/psqldb');

const Book = sequelize.define('Book', {
    book_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    owner: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    genre: {
        type: DataTypes.ARRAY,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: true
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    holder: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Owner'
    },
    availability: {
        type: DataTypes.DATEONLY
    }
}, {
    // For the sake of clarity we specify our indexes
    indexes: [{ unique: true, fields: ['book_id'] }],
    timestamps: true
});

// `sequelize.define` also returns the model
console.log(Book === sequelize.models.Book); // true

module.exports = {
    Book,
    sequelize,
}