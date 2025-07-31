const API_URL = 'https://api.github.com/gists/f5b886b0f9daea632372445d47e65932'

const DOM = {
  select: (selector) => document.querySelector(selector),
  setAttribute: (element, attribute, value) =>
    element?.setAttribute(attribute, value),
  setContent: (element, content) => element && (element.textContent = content),
  createElement: (tag, className, attributes = {}) => {
    const element = document.createElement(tag)
    if (className) element.className = className
    Object.entries(attributes).forEach(([key, value]) =>
      element.setAttribute(key, value),
    )
    return element
  },
}

function updatePageMetadata(pageData) {
  if (!pageData) return

  document.title = pageData.title

  const metaDescription = DOM.select('meta[name="description"]')
  DOM.setAttribute(metaDescription, 'content', pageData.description)

  const favicon = DOM.select('link[rel="icon"]')
  DOM.setAttribute(favicon, 'href', pageData.icon)
}

function updateProfile(data) {
  const { image, title, description } = data

  const profileImage = DOM.select('.profile-image')
  if (!profileImage || !image) return

  profileImage.src = image
  profileImage.alt = title

  DOM.setContent(DOM.select('.profile-name'), title)
  DOM.setContent(DOM.select('.profile-description'), description)
}

function createLinkIcon(linkData) {
  return DOM.createElement('img', 'link-icon', {
    src: linkData.icon,
    alt: linkData.title,
  })
}

function createLinkElement(linkData) {
  if (!linkData.url) return null

  const linkElement = DOM.createElement('a', 'link', {
    href: linkData.url,
    target: '_blank',
  })

  const iconElement = createLinkIcon(linkData)
  const textElement = DOM.createElement('span', 'link-text')
  textElement.textContent = linkData.title

  linkElement.appendChild(iconElement)
  linkElement.appendChild(textElement)

  return linkElement
}

function updateLinks(links) {
  const linksContainer = DOM.select('.links')
  if (!linksContainer || !Array.isArray(links)) return

  linksContainer.innerHTML = ''

  const linkElements = links.map(createLinkElement).filter(Boolean)

  linkElements.forEach((linkElement) => {
    linksContainer.appendChild(linkElement)
  })
}

function updateFooter(copyright) {
  const footer = DOM.select('.footer')
  DOM.setContent(footer, copyright)
}

async function fetchLinkTreeData() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()

  const linkTreeData = JSON.parse(data.files['linktree.json'].content)

  return linkTreeData
}

function applyDataToPage(data) {
  if (!data) return

  updatePageMetadata(data.page)
  updateProfile(data)
  updateLinks(data.links)
  updateFooter(data.copyright)
}

async function loadLinkTreeData() {
  try {
    const data = await fetchLinkTreeData()
    applyDataToPage(data)
    console.log('>>> Data loaded successfully from API')
  } catch (error) {
    console.error('>>> Error loading data from API:', error)
    console.log('>>> Keeping default page content')
  }
}

document.addEventListener('DOMContentLoaded', loadLinkTreeData)
