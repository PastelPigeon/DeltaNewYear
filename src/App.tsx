import { createContext, useContext, useRef, useState } from 'react'
import './App.css'
import softwaresInfo from "./softwares/softwaresInfo.json"
import locale from "./locales/zhHans.json"
import useWindowSize from './useWindowSize'
import Draggable from 'react-draggable'
import WebBrowser from './softwares/WebBrowser/WebBrowser'
import Game from './softwares/Game/Game'
import MediaPlayer from './softwares/MediaPlayer/MediaPlayer'
import DeltaFuns from './softwares/DeltaFuns/DeltaFuns'

const ActiveWindowsContext = createContext(null)

function getLocaleValue(key: string){
  return locale.filter((e) => {return e.key == key})[0].value
}

function Window(props: {softwareID: number}){
  const {activeWindows, setActiveWindows} = useContext(ActiveWindowsContext)
  const originalWindowSize:[number, number] = [softwaresInfo.filter((e) => {return e.softwareID == props.softwareID})[0].window.width, softwaresInfo.filter((e) => {return e.softwareID == props.softwareID})[0].window.height]
  const [isMaximized, setMaximizationState] = useState<boolean>(false)
  const currentWindowSize = useWindowSize()
  
  return(
    <Draggable handle={isMaximized ? '' : '.titleBar'}>
      <div className='window' style={{width: isMaximized ? currentWindowSize.width : originalWindowSize[0], height: isMaximized ? currentWindowSize.height : originalWindowSize[1], left: isMaximized ? 0 : 100, top: isMaximized? 0 : 100}}>
        <div className='titleBar'>
          <label className='name'>{getLocaleValue(softwaresInfo.filter((e) => {return e.softwareID == props.softwareID})[0].name)}</label>
          <div className='controlButtons'>
            {
              softwaresInfo.filter((e) => {return e.softwareID == props.softwareID})[0].window.allowMaximize == true &&
              <button className='maxButton' onClick={() => setMaximizationState(!isMaximized)}/>
            }
            <button className='closeButton' onClick={() => {
              let activeWindowsTemp:number[] = JSON.parse(JSON.stringify(activeWindows))
              activeWindowsTemp.splice(activeWindowsTemp.indexOf(activeWindowsTemp.filter((e) => {return e == props.softwareID})[0]), 1)
              setActiveWindows(activeWindowsTemp)
            }}/>
          </div>
        </div>
        <div className='content' style={{width: (isMaximized ? currentWindowSize.width : originalWindowSize[0]) - 12, height: (isMaximized ? currentWindowSize.height : originalWindowSize[1]) - 45}}>
          {
            props.softwareID == 0 &&
            <Game/>
          }
          {
            props.softwareID == 1 &&
            <WebBrowser/>
          }
          {
            props.softwareID == 2 &&
            <div className='settings'>
              <label>欢迎回来，登录<a href='https://www.bilibili.com/video/BV1GJ411x7h7/?share_source=copy_web&vd_source=6ebb218133f66394131324163333c000'>ADMIN</a>账号以继续使用设置</label>
              <input placeholder='admin'/>
              <input placeholder='密码'/>
              <label><a href='https://www.bilibili.com/video/BV1Zv4y1v7a8/?share_source=copy_web&vd_source=6ebb218133f66394131324163333c000'>登录</a></label>
            </div>
          }
          {
            props.softwareID == 3 &&
            <img src={new URL("/assets/waring.png", import.meta.url).href}/>
          }
          {
            props.softwareID == 4 &&
            <DeltaFuns/>
          }
        </div>
      </div>
    </Draggable>
  )
}

function TaskBar(){
  const {activeWindows, setActiveWindows} = useContext(ActiveWindowsContext)
  const [isMenuShowing, setMenuShowingState] = useState<boolean>(false)

  return(
    <>
      <div className='taskBar'>
        <button className='startButton' onClick={() => setMenuShowingState(!isMenuShowing)}>
          <img src={new URL("./assets/icons/siteIcon.png", import.meta.url).href} className='startSign'/>
          <label>START</label>
        </button>
        <div className='activeWindowsBar'>
          {
            activeWindows.map((softwareID:number) => {
              return(
                <button className='activeWindowButton' data-style="transparent">
                  <img src={new URL(softwaresInfo.filter((e) => {return e.softwareID == softwareID})[0].icon, import.meta.url).href} className='activeWindowIcon'/>
                </button>
              )
            })
          }
        </div>
      </div>
      {
        isMenuShowing &&
        <div className='menu'>
          <div className='sideBar'>
            <img src={new URL("./assets/icons/deltaruneTitle.png", import.meta.url).href} className='logo'/>
          </div>
          <div className='content'>
            <label className='softwareListTitle'>本机软件</label>
            <div className='softwareList'>
              {
                softwaresInfo.map((software) => {
                  return(
                    <button data-style="transparent" className='softwareItem' onClick={() => {setActiveWindows([...activeWindows, software.softwareID])}}>
                      <img src={new URL(softwaresInfo.filter((e) => {return e.softwareID == software.softwareID})[0].icon, import.meta.url).href} className='icon'/>
                      <label className='name'>{getLocaleValue(softwaresInfo.filter((e) => {return e.softwareID == software.softwareID})[0].name)}</label>
                    </button>
                  )
                })
              }
            </div>
          </div>
        </div>
      }
    </>
  )
}

function Desktop(){
  const {activeWindows, setActiveWindows} = useContext(ActiveWindowsContext)

  return(
    <div className='desktop'>
      <img className='background' src={new URL("./assets/backgrounds/snowtown.png", import.meta.url).href}/>
      <div className='softwareGrid'>
        {
          softwaresInfo.map((software) => {
            return(
              <button data-style="transparent" className='softwareItem' onClick={() => {setActiveWindows([...activeWindows, software.softwareID])}}>
                <img src={new URL("/assets/gameIcon.png", import.meta.url).href} className='icon'/>
                <label className='name'>{getLocaleValue(softwaresInfo.filter((e) => {return e.softwareID == software.softwareID})[0].name)}</label>
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

function SplashScreen(){
  const [counter, setCounter] = useState(0)

  setTimeout(() => {
    if (counter < 40){
      setCounter(counter + 1)
    }
  }, 200)

  const getCounterArray = () => {
    let counterArray = []
    
    if (counter < 30){
      for (var i = 0; i < counter; i++){
        counterArray.push(i)
      }
    } else {
      for (var i = 0; i < 30; i++){
        counterArray.push(i)
      }
    }

    return counterArray
  }

  return(
    <div className='splashScreen'>
      {
        counter >= 2 &&
        <>
          <label className='cliText'>World Webcam System</label>
          <label className='cliText'>键入“帮助”来获取帮助信息</label>
        </>
      }
      {
        counter >= 7 &&
        <label className='cliText'>初始化 全局.世界对象</label>
      }
      {
        counter >= 9 &&
        <label className='cliText'>全局.世界对象 初始化完毕</label>
      }
      {
        counter >= 12 &&
        <label className='cliText'>设置 全局.世界对象.当前世界 为 三角符文</label>
      }
      {
        counter >= 13 &&
        <label className='cliText'>成功设置</label>
      }
      {
        counter >= 14 &&
        <label className='cliText'>正在初始化系统</label>
      }
      {
        counter >= 16 &&
        <>
          {
            getCounterArray().map((item) => {
              return(
                <label className='cliText'>正在从 系统 加载 必要的系统运行文件 (文件 {item ** 8}{item ** 8}{item ** 8})</label>
              )
            })
          }
        </>
      }
      {
        counter >= 25 &&
        <img src={new URL("./assets/icons/deltaruneTitle.png", import.meta.url).href} className='splashLogo'/>
      }
    </div>
  )
}

function App() {
  const [activeWindows, setActiveWindows] = useState<number[]>([])

  return (
    <>
      <div className='app'>
        <ActiveWindowsContext.Provider value={{activeWindows, setActiveWindows}}>
          {
            activeWindows.map((e) => {
              return <Window softwareID={e}/>
            })
          }
          <Desktop/>
          <TaskBar/>
        </ActiveWindowsContext.Provider>
      </div>
    </>
  )
}

export default App
