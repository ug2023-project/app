const fakeDelay = async <T>(fn: (...args: any[]) => Promise<T> | T) => {
  const delay = 1000
  const delayPromise = new Promise((r) => setTimeout(r, delay))

  const [res] = await Promise.all([fn(), delayPromise])

  return res
}

export default fakeDelay
