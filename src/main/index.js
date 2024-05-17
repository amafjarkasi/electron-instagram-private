import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'
import https from 'https'
import fs from 'fs'
import path from 'path'

const storage = createStorage({
  driver: fsDriver({ base: './tmp' })
})

let { igApi, getCookie } = require('insta-fetcher')

async function fetchAndDownloadPosts(username) {
  let session_id = await storage.getItem('ig:cookie')
  let ig = new igApi(session_id)
  let posts = await ig.fetchUserPosts(username)

  console.log(posts.length)

  // for (let post of posts.edges) {
  //   console.log(post.node.display_url)
  //   if (post.node.display_url) {
  //     let filename = post.node.shortcode + '.jpg'
  //     await downloadProfilePic(post.node.display_url, filename)
  //   }
  // }
}

async function downloadProfilePic(url, filename) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`))
          return
        }

        const file = fs.createWriteStream(path.join('./tmp', filename))
        response.pipe(file)
        file.on('finish', () => {
          file.close(resolve(true))
        })
      })
      .on('error', (error) => {
        fs.unlink(path.join('./tmp', filename), () => {})
        reject(error.message)
      })
  })
}

async function getIgCookie(username, password) {
  const session_id = await getCookie(username, password)

  if (session_id) await storage.setItem('ig:cookie', session_id)

  return session_id
}

async function getAccountInfo() {
  let session_id = await storage.getItem('ig:cookie')
  let accountInfo = await new igApi(session_id).accountInfo()
  return accountInfo
}

async function getUserName() {
  return await storage.getItem('ig:username')
}

async function getPassword() {
  return await storage.getItem('ig:password')
}

async function retrieveIgCookie() {
  return await storage.getItem('ig:cookie')
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 700,
    height: 500,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.webContents.openDevTools()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.on('ping', (event) => {
    console.log('ping received')
    event.sender.send('pong')
  })

  ipcMain.handle('get-username', async (_event) => {
    console.log('getUsername-async received')
    let username = await getUserName()
    return username
  })

  ipcMain.handle('get-account-info', async (_event) => {
    console.log('getAccountInfo-async received')

    // await fetchAndDownloadPosts('instagram')
    let accountInfo = await getAccountInfo()
    if (accountInfo && accountInfo.user && accountInfo.user.profile_pic_url) {
      await downloadProfilePic(accountInfo.user.profile_pic_url, 'profile_pic.jpg')
    }
    return accountInfo
  })

  ipcMain.handle('get-password', async (_event) => {
    console.log('getPassword-async received')
    let password = await getPassword()
    return password
  })

  ipcMain.handle('login', async (event, { username, password }) => {
    console.log('login-async received')

    await storage.setItem('ig:username', username)
    await storage.setItem('ig:password', password)

    let loggedIn = await getIgCookie(username, password)
    return loggedIn
  })

  ipcMain.handle('get-cookie', async (_event) => {
    console.log('getCookie-async received')
    let cookie = retrieveIgCookie()
    return cookie
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
