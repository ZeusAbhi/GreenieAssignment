import type { NextApiRequest, NextApiResponse } from 'next'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  // force a 1 second delay
  // to simulate the network
  // latency
  await wait(1000)
  res.status(200).json({ name: 'John Doe' })
}
