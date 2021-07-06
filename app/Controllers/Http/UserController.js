'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store({ request, response }) {
    const trx = await Database.beginTransaction()

    try {

      const data = request.only(['username', 'email', 'password'])
      const addresses = request.input('addresses')

      const user = await User.create(data, trx)

      await user.addresses().createMany(addresses, trx)

      await trx.commit()

      return user

    } catch (err) {
        await trx.rollback()
        return response.status(err.status).send({ error: { message: error.messages } })
    }

  }
}

module.exports = UserController
