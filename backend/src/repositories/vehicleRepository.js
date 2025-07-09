const { Vehicle } = require('../models')

const createVehicle = async (data) => {
  return await Vehicle.create(data)
}

const getVehiclesByUser = async (userId) => {
  return await Vehicle.findAll({ where: { userId } })
}

const getVehicleById = async (id) => {
  return await Vehicle.findByPk(id)
}

const deleteVehicle = async (id) => {
  return await Vehicle.destroy({ where: { id } })
}

const updateVehicle = async (id, data) => {
  return await Vehicle.update(data, { where: { id } })
}

module.exports = {
  createVehicle,
  getVehiclesByUser,
  getVehicleById,
  deleteVehicle,
  updateVehicle
}
