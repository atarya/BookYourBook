/*
Book ID
Owner
Title
Author
Description
Genre
Rating
ISBN
Availability
Current Holder
Timestamp
Earliest Availability
*/

const { sequelize } = require('../../config/psqldb');

const Book = sequelize.define('Book', {
    // Here we define our model attributes
    // Each attribute will pair to a column in our database

    // Our primaryKey, book id, our unique identifier
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },

    // A column for the title of our book
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // A column for the author name 
    authorName: {
        type: DataTypes.STRING
        // remember allowNull defaults to true
    }
}, {
    // For the sake of clarity we specify our indexes
    indexes: [{ unique: true, fields: ['id'] }]
});

// `sequelize.define` also returns the model
console.log(Book === sequelize.models.Book); // true

module.exports = {
    Book,
    sequelize,
}