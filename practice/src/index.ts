import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string
  }
}>()

app.use('/api/*', cors())

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json()

  try{
    const resp = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      }
    });

    const jwt = await sign( { id: resp.id }, c.env.JWT_SECRET )
    return c.text(jwt);
  }
  catch(e){
    return c.json({
      error: e
    })
  }
})

app.get('/api/v1/fetch/:name', async(c) => {
  const name = c.req.param("name");
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
      const data = await prisma.user.findFirst({
        where: {
          name: name
        },
        select: {
          name: true,
          email: true,
          password: true,
        }
      })

      return c.json({
        data: data
      });
    } catch (error) {
      c.status(411);
      return c.json({
        message: "error while fetchgin data"
      })
    }
}
)

app.post('/api/v1/info', async(c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    }
  });

  try {
    const info = await prisma.info.create({
      data: {
        userId: Number(user?.id),
        information: body.info
      }
    })
    return c.json({
      info : info.information
    })
  } catch (e) {
    return c.json({
      error: e
    })
  }
})

export default app
