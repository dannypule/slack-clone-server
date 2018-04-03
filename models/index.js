import config from '../config'
import Sequelize from 'sequelize'

// const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db)
const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: 'postgres',
  define: { underscored: true },
})

const models = {
  User: sequelize.import('./user'),
  Channel: sequelize.import('./channel'),
  Message: sequelize.import('./message'),
  Team: sequelize.import('./team'),
}

console.log(models)

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models
