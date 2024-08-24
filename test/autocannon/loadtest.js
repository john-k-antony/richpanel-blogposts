const autocannon = require('autocannon')

const API_KEY = 'N2E5OTNmNzg3NTQ2MmM4YmFkNmNmODE3NDE4MGZkY2Q=';

function runLoadTest(endpoint, httpMethod, payload) {
  return new Promise((resolve) => {
    const instance = autocannon({
      url: `http://localhost:3000${endpoint}`,
      method: httpMethod,
      body: payload || undefined,
      headers: {
        'Authorization': `bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      connections: 100,
      pipelining: 10,
      duration: 10,
    }, (err, results) => {
      console.log('+++++++++++++++++++++++++++++')
      console.log(`Load test results for ${httpMethod} ${endpoint}:`)
      console.log(`Requests/sec: ${results.requests.average}`)
      console.log(`Latency (ms): ${results.latency.average}`)
      console.log('-----------------------------')
      resolve(results)
    })
  })
}

async function runAllTests() {
  await runLoadTest('/posts', 'POST', JSON.stringify({title: "test title", contents: "test contents"}))
  await runLoadTest('/posts', 'GET')
  await runLoadTest('/posts/2', 'GET')
  await runLoadTest('/posts/2', 'PUT', JSON.stringify({title: "updated title", contents: "updated contents"}))
  await runLoadTest('/posts/1', 'DELETE')
  // Add more endpoints as needed
}

runAllTests()