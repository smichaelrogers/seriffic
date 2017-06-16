import uniq from 'lodash/uniq'

const STORAGE_KEY = '__FONTS__'

async function saveFonts(fonts) {
  const json = JSON.stringify(fonts)
  localStorage.setItem(STORAGE_KEY, json)
}

export function getFonts() {
  return new Promise(resolve => {
    const persisted = localStorage.getItem(STORAGE_KEY)
    if (persisted) {
      resolve(JSON.parse(persisted))
    } else {
      require('font-manager').getAvailableFonts(result => {
        const fonts = uniq(result.map(font => font.family)).sort()
        saveFonts(fonts)
        resolve(fonts)
      })
    }
  })
}
