
const refUser = sequelize.define('refUser', {

    user_id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },


    home_society: {
        type: DataTypes.STRING,
        allowNull: false,
    },


    invite_code: {
        type: DataTypes.STRING,
        allowNull: false

    },

    users_inviteCode: {
        type: DataTypes.STRING,
        allowNull: false
    },

    verified_user: {
        type: DataTypes.Boolean,
        allowNull: false,
        defaultValue: false
    }


}, { timestamp: true });

module.exports = refUser;