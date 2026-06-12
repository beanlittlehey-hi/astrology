const SAFE_BOTTOM_PADDING = 12
const DEFAULT_STATUS_BAR_HEIGHT = 44
const DEFAULT_MENU_BUTTON_HEIGHT = 32
const DEFAULT_MENU_BUTTON_WIDTH = 88
const DEFAULT_MENU_BUTTON_RIGHT_GAP = 10
const DESIGN_WIDTH_RPX = 750
const NAV_EDGE_RPX = 32
const NAV_TITLE_GAP_RPX = 16

const fallbackWindowWidth = 375

function rpxToPx(rpx, windowWidth) {
  return Math.round((windowWidth || fallbackWindowWidth) * rpx / DESIGN_WIDTH_RPX)
}

function getWindowInfo() {
  if (wx.getWindowInfo) return wx.getWindowInfo()
  return wx.getSystemInfoSync ? wx.getSystemInfoSync() : {}
}

function getFallbackMenuButton(windowInfo = {}) {
  const statusBarHeight = windowInfo.statusBarHeight || DEFAULT_STATUS_BAR_HEIGHT
  const windowWidth = windowInfo.windowWidth || fallbackWindowWidth
  const top = statusBarHeight + 4
  const height = DEFAULT_MENU_BUTTON_HEIGHT
  const width = DEFAULT_MENU_BUTTON_WIDTH
  const right = windowWidth - DEFAULT_MENU_BUTTON_RIGHT_GAP
  return {
    top,
    bottom: top + height,
    left: right - width,
    right,
    width,
    height
  }
}

function normalizeMenuButton(menuButtonRect, windowInfo) {
  if (
    menuButtonRect &&
    Number.isFinite(menuButtonRect.top) &&
    Number.isFinite(menuButtonRect.height) &&
    Number.isFinite(menuButtonRect.left) &&
    Number.isFinite(menuButtonRect.right) &&
    Number.isFinite(menuButtonRect.width) &&
    Number.isFinite(menuButtonRect.bottom) &&
    menuButtonRect.height > 0 &&
    menuButtonRect.width > 0
  ) {
    return menuButtonRect
  }
  return getFallbackMenuButton(windowInfo)
}

function getNavLayout() {
  try {
    const windowInfo = getWindowInfo()
    const windowWidth = windowInfo.windowWidth || fallbackWindowWidth
    const statusBarHeight = windowInfo.statusBarHeight || DEFAULT_STATUS_BAR_HEIGHT
    const rawMenuButtonRect = wx.getMenuButtonBoundingClientRect
      ? wx.getMenuButtonBoundingClientRect()
      : null
    const menuButtonRect = normalizeMenuButton(rawMenuButtonRect, windowInfo)
    const navContentTop = menuButtonRect.top
    const navContentHeight = menuButtonRect.height
    const navTotalHeight = menuButtonRect.bottom + SAFE_BOTTOM_PADDING
    const titleRight = Math.max(windowWidth - menuButtonRect.left + rpxToPx(NAV_TITLE_GAP_RPX, windowWidth), menuButtonRect.width)
    const leftButtonLeft = rpxToPx(NAV_EDGE_RPX, windowWidth)
    const titleLeftNoBack = leftButtonLeft
    const titleLeft = leftButtonLeft + menuButtonRect.height + rpxToPx(NAV_TITLE_GAP_RPX, windowWidth)

    return {
      statusBarHeight,
      menuButtonTop: menuButtonRect.top,
      menuButtonHeight: menuButtonRect.height,
      menuButtonRight: menuButtonRect.right,
      menuButtonWidth: menuButtonRect.width,
      navBarHeight: navTotalHeight - statusBarHeight,
      navContentTop,
      navContentHeight,
      navTotalHeight,
      leftButtonSize: menuButtonRect.height,
      leftButtonLeft,
      leftButtonTop: menuButtonRect.top,
      titleTop: menuButtonRect.top,
      titleHeight: menuButtonRect.height,
      titleLeft,
      titleLeftNoBack,
      titleRight
    }
  } catch (error) {
    const fallback = getFallbackMenuButton()
    const titleRight = Math.max(fallbackWindowWidth - fallback.left + rpxToPx(NAV_TITLE_GAP_RPX, fallbackWindowWidth), fallback.width)
    const leftButtonLeft = rpxToPx(NAV_EDGE_RPX, fallbackWindowWidth)
    const titleLeftNoBack = leftButtonLeft
    const titleLeft = leftButtonLeft + fallback.height + rpxToPx(NAV_TITLE_GAP_RPX, fallbackWindowWidth)
    return {
      statusBarHeight: DEFAULT_STATUS_BAR_HEIGHT,
      menuButtonTop: fallback.top,
      menuButtonHeight: fallback.height,
      menuButtonRight: fallback.right,
      menuButtonWidth: fallback.width,
      navBarHeight: fallback.bottom + SAFE_BOTTOM_PADDING - DEFAULT_STATUS_BAR_HEIGHT,
      navContentTop: fallback.top,
      navContentHeight: fallback.height,
      navTotalHeight: fallback.bottom + SAFE_BOTTOM_PADDING,
      leftButtonSize: fallback.height,
      leftButtonLeft,
      leftButtonTop: fallback.top,
      titleTop: fallback.top,
      titleHeight: fallback.height,
      titleLeft,
      titleLeftNoBack,
      titleRight
    }
  }
}

module.exports = {
  getNavLayout
}
