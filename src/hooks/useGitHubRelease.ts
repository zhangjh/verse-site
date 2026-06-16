import { useState, useEffect } from 'react'

interface ReleaseAsset {
  name: string
  url: string
}

export interface ReleaseInfo {
  version: string
  assets: ReleaseAsset[]
  loading: boolean
  error: boolean
}

const GH_PROXY = 'https://gh-proxy.org/'
const API = 'https://api.github.com/repos/zhangjh/verse-site/releases/latest'

export function useGitHubRelease() {
  const [info, setInfo] = useState<ReleaseInfo>({
    version: '',
    assets: [],
    loading: true,
    error: false,
  })

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error('No release found')
        return res.json()
      })
      .then((data) => {
        const version = data.tag_name.replace(/^v/, '')
        const assets: ReleaseAsset[] = (data.assets || []).map(
          (a: { name: string; browser_download_url: string }) => ({
            name: a.name,
            url: `${GH_PROXY}${a.browser_download_url}`,
          }),
        )
        setInfo({ version, assets, loading: false, error: false })
      })
      .catch(() => {
        setInfo((prev) => ({ ...prev, loading: false, error: true }))
      })
  }, [])

  return info
}
