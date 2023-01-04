import { apiHandler } from 'apiRoutes/apiHandler'
import prisma from 'libs/prisma'

export default apiHandler('/api/users', {
  async post(req, res) {
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
