import { RequestConfig, RequestService } from '..'

const service = new RequestService({
  baseURL: 'http://localhost:23520',
  timeout: 10000,
  queue: {
    maxConcurrent: 6,
  },
})

function API(config?: RequestConfig) {
  return service.get('/api', config)
}

function waitAPI(ms?: number) {
  return service.get('/wait', { params: { ms } })
}

function errorAPI() {
  return service.get('/error')
}

function testQueue() {
  for (let i = 0; i < 99; i++) {
    waitAPI().then(() => {
      console.log(i + 1)
    })
  }
}

function testDuplicate() {
  const request = () => {
    return API({ preventDuplicate: 'link' })
  }

  let res1: any
  let res2: any

  request()
    .then((res) => {
      res1 = res
      console.log(1)
    })
    .catch((error) => {
      console.log(1, 'error', error)
    })

  request()
    .then((res) => {
      res2 = res
      console.log(2)
    })
    .catch((error) => {
      console.log(2, 'error', error)
    })

  setTimeout(() => {
    console.log(res1 === res2)
  }, 1000)
}

function testPriority() {
  for (let i = 0; i < 99; i++) {
    const priority = random(0, 9)
    API({ priority, params: { priority } })
  }
}

// testQueue()
// errorAPI()

test()

async function test() {
  testPriority()
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
