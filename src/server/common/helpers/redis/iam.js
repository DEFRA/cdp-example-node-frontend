import { defaultProvider } from '@aws-sdk/credential-provider-node'
import { SignatureV4 } from '@aws-sdk/signature-v4'
import { HttpRequest } from '@aws-sdk/protocol-http'
import { Sha256 } from '@aws-crypto/sha256-js'

export async function generateAuthToken({ region, host }) {
  const credentials = await defaultProvider()()

  const signer = new SignatureV4({
    service: 'elasticache',
    region,
    credentials,
    sha256: Sha256
  })

  const request = new HttpRequest({
    method: 'GET',
    protocol: 'https:',
    path: '/',
    headers: {
      host
    },
    hostname: host
  })

  const signed = await signer.presign(request)
  return signed.headers.authorization
}
