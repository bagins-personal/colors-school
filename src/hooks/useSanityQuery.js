import { useEffect, useState } from 'react'
import { client, sanityConfigured } from '../lib/sanity'

// In-memory cache + in-flight dedupe so pages sharing a query (e.g. Home and Events) fetch once
// per visit, and navigating back shows content instantly while it refreshes in the background.
// Listeners keep every component using the same query (e.g. header + footer) in sync.
const cache = new Map()
const inflight = new Map()
const listeners = new Map()

function fetchQuery(key, query, params) {
  if (!inflight.has(key)) {
    const p = client
      .fetch(query, params)
      .then((data) => {
        cache.set(key, data)
        listeners.get(key)?.forEach((fn) => fn(data))
        return data
      })
      .finally(() => inflight.delete(key))
    inflight.set(key, p)
  }
  return inflight.get(key)
}

const notConfigured = new Error(
  'Sanity is not configured. Set VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET in your .env file.',
)

export default function useSanityQuery(query, params = {}) {
  const key = query + JSON.stringify(params)
  const [state, setState] = useState(() => ({
    data: cache.get(key) ?? null,
    loading: !cache.has(key) && sanityConfigured,
    error: sanityConfigured ? null : notConfigured,
  }))

  useEffect(() => {
    if (!sanityConfigured) return
    let active = true
    const onData = (data) => active && setState({ data, loading: false, error: null })
    if (!listeners.has(key)) listeners.set(key, new Set())
    listeners.get(key).add(onData)
    fetchQuery(key, query, params).catch((error) => {
      console.error('[sanity]', error)
      if (active) setState((s) => ({ data: s.data, loading: false, error }))
    })
    return () => {
      active = false
      listeners.get(key)?.delete(onData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return state
}
