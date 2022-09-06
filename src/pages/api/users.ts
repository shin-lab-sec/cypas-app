import prisma from 'libs/prisma'
import { apiHandler } from 'utils/api/apiHandler'

export default apiHandler('/api/users', {
  async postHandler(req, res) {
    try {
      const result = await prisma.user.create({
        data: req.body,
      })
      res.send(result)
    } catch (e) {
      console.error(e)
      res.status(500).end()
    }
  },
})
