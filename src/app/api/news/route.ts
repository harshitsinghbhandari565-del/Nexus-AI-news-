import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

const FEEDS = [
  'https://news.google.com/rss/search?q=artificial+intelligence&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=ChatGPT+OpenAI+GPT&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Claude+Anthropic+AI&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=Gemini+Google+DeepMind+AI&hl=en-US&gl=US&ceid=US:en',
  'https://news.google.com/rss/search?q=AI+India+technology+2025&hl=en-IN&gl=IN&ceid=IN:en',
  'https://news.google.com/rss/search?q=artificial+intelligence+India+startup&hl=en-IN&gl=IN&ceid=IN:en',
  'https://news.google.com/rss/search?q=Krutrim+Sarvam+AI+India&hl=en-IN&gl=IN&ceid=IN:en',
  'https://news.google.com/rss/search?q=machine+learning+AI+model+2025&hl=en-US&gl=US&ceid=US:en',
]

const NAMES = [
  'Google News AI','Google News OpenAI','Google News Claude',
  'Google News Gemini','Google News India AI','Google News India Startups',
  'Google News India Companies','Google News ML',
]

function clean(str: string): string {
  return str
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'))
    || xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return m ? clean(m[1]) : ''
}

function hashStr(s: string): string {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0
  }
  return Math.abs(h).toString(36)
}

async function fetchFeed(url: string, name: string): Promise<any[]> {
  try {
    const controller = new AbortController()
    const t = setTimeout(() => controller.abort(), 10000)
    const r = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HarshAI/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    })
    clearTimeout(t)
    if (!r.ok) return []
    const xml = await r.text()
    const items = xml.match(/<item[\s\S]*?<\/item>/gi) || []
    const out = []
    for (const item of items.slice(0, 15)) {
      const title = getTag(item, 'title')
      const link  = getTag(item, 'link') || getTag(item, 'guid')
      const desc  = getTag(item, 'description') || getTag(item, 'summary') || ''
      const pub   = getTag(item, 'pubDate') || getTag(item, 'published') || ''
      if (!title || title.length < 10) continue
      if (!link || !link.startsWith('http')) continue
      const txt = (title + ' ' + desc).toLowerCase()
      const isIndia = ['india','indian','bangalore','bengaluru','mumbai','delhi','hyderabad','pune','chennai','iit','nasscom','krutrim','sarvam','infosys','tcs','wipro','reliance','niti','bharat','rupee'].some(k => txt.includes(k))
      const isModel = ['gpt','chatgpt','claude','gemini','llama','grok','mistral','openai','anthropic','deepmind','copilot','dall-e','sora','midjourney','perplexity','hugging face'].some(k => txt.includes(k))
      let publishedAt = new Date().toISOString()
      try { if (pub) publishedAt = new Date(pub).toISOString() } catch {}
      out.push({
        id: hashStr(link),
        title,
        url: link,
        sourceName: name,
        summary: desc.substring(0, 300),
        publishedAt,
        isIndia,
        isModel,
      })
    }
    return out
  } catch {
    return []
  }
}

export async function GET() {
  try {
    const results = await Promise.allSettled(
      FEEDS.map((url, i) => fetchFeed(url, NAMES[i]))
    )

    const all: any[] = results.flatMap(r =>
      r.status === 'fulfilled' ? r.value : []
    )

    const seen = new Set<string>()
    const unique = all.filter(a => {
      if (!a?.url || seen.has(a.url)) return false
      seen.add(a.url)
      return true
    })

    const sorted = unique.sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    const models = sorted.filter(a => a.isModel).slice(0, 5)
    const india  = sorted.filter(a => a.isIndia).slice(0, 10)
    const global = sorted.filter(a => !a.isIndia).slice(0, 10)

    return NextResponse.json({
      success: true,
      total: sorted.length,
      timestamp: new Date().toISOString(),
      sections: {
        top_models:   models.length > 0 ? models : sorted.slice(0, 5),
        global_top10: global.length > 0 ? global : sorted.slice(0, 10),
        india_top10:  india.length  > 0 ? india  : sorted.slice(0, 10),
      }
    })

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: String(err),
      sections: { top_models: [], global_top10: [], india_top10: [] }
    }, { status: 500 })
  }
}
