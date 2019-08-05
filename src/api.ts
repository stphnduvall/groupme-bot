import * as https from 'https'

export function sendMessage(message: Message) {

  const post_options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    port: '443',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  const post_request = https.request(post_options, (res) => {
    console.log(`Post request status code: ${res.statusCode}`)

    res.on('data', (d) => {
      process.stdout.write(d)
    })
  })

  post_request.on('error', (error) => {
    console.log(error)
  })

  console.log(JSON.stringify(message))

  post_request.write(JSON.stringify(message))
  post_request.end()
}
