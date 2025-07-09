const User = require('./user')
const Vehicle = require('./vehicle')

User.hasMany(Vehicle, { foreignKey: 'userId' })
Vehicle.belongsTo(User, { foreignKey: 'userId' })

module.exports = {
  User,
  Vehicle
}
