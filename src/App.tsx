import { createContext, useContext, useEffect, useState } from 'react'
import siteIcon from "./assets/site_icon.png";
import siteTitle from "./assets/site_title.png"
import siteTitleVanilla from "./assets/site_title_vanilla.png"
import softwareIcon from "./assets/software_icon.png"
import worksListIcon from "./assets/software_worksList_icon.svg"
import worksInfo from "./works/worksinfo.json"
import dogSleep from "./assets/dog-sleep.gif"

import './App.css'
import Draggable from 'react-draggable';

if (/Mobi|Android|iPhone/i.test(navigator.userAgent)){
  import("./App_mobile.css")
}

const activatedSoftwaresContext = createContext<string[]>([]);

function Desktop(){

  const {activatedSoftwares, SetActivatedSoftwares} = useContext(activatedSoftwaresContext)

  return(
    <div className='desktop'>
      <div className='siteBackground'/>

      <div className='softwareGrid'>
        <button onClick={() => {
          if (!activatedSoftwares.includes("worksList")) {
            var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
            activatedSoftwaresTemp.push("worksList")
            SetActivatedSoftwares(activatedSoftwaresTemp)
          }
        }}><img src={softwareIcon}/> 作品列表</button>
        <button disabled><img src={softwareIcon}/> 作品投票</button>
        <button onClick={() => {
          if (!activatedSoftwares.includes("bookLive")) {
            var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
            activatedSoftwaresTemp.push("bookLive")
            SetActivatedSoftwares(activatedSoftwaresTemp)
          }
        }}><img src={softwareIcon}/> 预约拜年祭</button>
        <button disabled><img src={softwareIcon}/> 拜年祭直播</button>
        <button disabled><img src={softwareIcon}/> 直播回放</button>
        <button onClick={() => {
          if (!activatedSoftwares.includes("about")) {
            var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
            activatedSoftwaresTemp.push("about")
            SetActivatedSoftwares(activatedSoftwaresTemp)
          }
        }}><img src={softwareIcon}/> 关于拜年祭</button>
      </div>
    </div>
  )
}

function TaskBar(){

  const [isTaskBarMenuVisable, SetTaskBarMenuVisibility] = useState(false);

  const {activatedSoftwares, SetActivatedSoftwares} = useContext(activatedSoftwaresContext)

  return(
    <>
      <div className='taskBar'>
        <div className='softwares'>
          <button onClick={() => SetTaskBarMenuVisibility(isTaskBarMenuVisable ? false : true)}>
            <img src={siteIcon} width={35} height={35}/>
          </button>
          {
            activatedSoftwares.includes("worksList") &&
            <button>
              <img src={worksListIcon} width={35} height={35}/>
            </button>
          }
          {
            activatedSoftwares.includes("bookLive") &&
            <button>
              <img src={softwareIcon} width={35} height={35}/>
            </button>
          }
          {
            activatedSoftwares.includes("about") &&
            <button>
              <img src={softwareIcon} width={35} height={35}/>
            </button>
          }
        </div>
      </div>

      {
        isTaskBarMenuVisable &&
        <div className='taskBarMenu'>
          <div className='sideBar'>
            <img src={siteTitleVanilla} className='siteTitleImg'/>
          </div>

          <div className='softwareList'>
            <label className='listTitle'>本机软件</label>

            <button onClick={() => {
                if (!activatedSoftwares.includes("worksList")) {
                  var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                  activatedSoftwaresTemp.push("worksList")
                  SetActivatedSoftwares(activatedSoftwaresTemp)
                  SetTaskBarMenuVisibility(false)
                }
              }}><img src={worksListIcon}/> 作品列表</button>
            <button disabled><img src={softwareIcon}/> 作品投票</button>
            <button onClick={() => {
                if (!activatedSoftwares.includes("bookLive")) {
                  var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                  activatedSoftwaresTemp.push("bookLive")
                  SetActivatedSoftwares(activatedSoftwaresTemp)
                  SetTaskBarMenuVisibility(false)
                }
              }}><img src={softwareIcon}/> 预约拜年祭</button>
            <button disabled><img src={softwareIcon}/> 拜年祭直播</button>
            <button disabled><img src={softwareIcon}/> 直播回放</button>
            <button onClick={() => {
                if (!activatedSoftwares.includes("about")) {
                  var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                  activatedSoftwaresTemp.push("about")
                  SetActivatedSoftwares(activatedSoftwaresTemp)
                  SetTaskBarMenuVisibility(false)
                }
              }}><img src={softwareIcon}/> 关于拜年祭</button>
          </div>
        </div>
      }
    </>
  )
}

function WorksList(){

  const [worksData, SetWorksData] = useState(worksInfo)
  const [worksView, SetWorksView] = useState([])
  const [query, SetQuery] = useState("")

  const {activatedSoftwares, SetActivatedSoftwares} = useContext(activatedSoftwaresContext)

  const UpdateWorksView = useEffect(() => {
    var worksViewTemp = [];

    if(query != ""){
      filteredWorksData = worksData.filter((e) => {
        return e.name.includes(query)
      })
    }else{
      var filteredWorksData = worksData
    }

    console.log(filteredWorksData.length);

    if (filteredWorksData.length != 0){
      filteredWorksData.forEach((e) => {
        worksViewTemp.push(
          <div className='workItem'>
            <div className='thumbnail' style={{background: `url(${e.thumbnail})`}}/>
  
            <div className='textInfo'>
              <label className='name'>{e.name}</label>
              <label className='description'>{e.description}</label>
            </div>
  
            <div className='authorInfo'>
              <label className='name'>{e.author.name}</label>
              <div className='avater' style={{background: `url(${e.author.avater})`}}/>
            </div>
          </div>
        )
      })
    } else {
      worksViewTemp.push(
        <div className='nothingInfo'>
          <img src={dogSleep} width={108} height={48}/>
          <label>e..这里还没有东西，你就没有其它事情可以干了吗</label>
        </div>
      )
    }

    SetWorksView(worksViewTemp)
  }, [worksData, query])

  return(
    <>
      {
        (!/Mobi|Android|iPhone/i.test(navigator.userAgent)) &&
        <Draggable handle='.titleBar'>
          <div className='window' style={{width: 800, height: 600}}>
            <div className='titleBar'>
              作品列表
              <button className='closeButton'  onClick={() => {
                if (activatedSoftwares.includes("worksList")){
                  var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                  activatedSoftwaresTemp = activatedSoftwaresTemp.filter((e) => {
                    return e !== "worksList"
                  })
                  SetActivatedSoftwares(activatedSoftwaresTemp)
                }
              }}/>
            </div>

            <div className='content'>
              <div className='worksList'>
                <div className='topBar'>
                  <img src={siteTitle} className='logo'/>

                  <input className='queryBox' onChange={(e) => SetQuery(e.currentTarget.value)}/>
                </div>

                <div className='worksView'>
                  {worksView}
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      }
      {
        (document.body.clientWidth < 767) &&
        <div className='window' style={{width: "calc(100% - 6px)", height: "calc(100% - 76px)"}}>
          <div className='titleBar'>
            作品列表
            <button className='closeButton'  onClick={() => {
              if (activatedSoftwares.includes("worksList")){
                var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                activatedSoftwaresTemp = activatedSoftwaresTemp.filter((e) => {
                  return e !== "worksList"
                })
                SetActivatedSoftwares(activatedSoftwaresTemp)
              }
            }}/>
          </div>

          <div className='content'>
            <div className='worksList'>
              <div className='topBar'>
                <img src={siteTitle} className='logo'/>

                <input className='queryBox' onChange={(e) => SetQuery(e.currentTarget.value)}/>
              </div>

              <div className='worksView'>
                {worksView}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

function BookLive(){

  const {activatedSoftwares, SetActivatedSoftwares} = useContext(activatedSoftwaresContext)

  return(
    <>
      {
        (!/Mobi|Android|iPhone/i.test(navigator.userAgent)) &&
        <Draggable handle='.titleBar'>
          <div className='window' style={{width: 400, height: 200}}>
            <div className='titleBar'>
              预约拜年祭
              <button className='closeButton' onClick={() => {
                if (activatedSoftwares.includes("bookLive")){
                  var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                  activatedSoftwaresTemp = activatedSoftwaresTemp.filter((e) => {
                    return e !== "bookLive"
                  })
                  SetActivatedSoftwares(activatedSoftwaresTemp)
                }
              }}/>
            </div>

            <div className='content'>
              <div className='bookLive'>
                <label className='info'>现在订阅【【摆年寄】】， 即刻成为【链接已屏蔽】</label>

                <div className='funcButtons'>
                  <button className='ok'>【好】</button>
                  <button className='cancel' onClick={() => {
                    if (activatedSoftwares.includes("bookLive")){
                      var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                      activatedSoftwaresTemp = activatedSoftwaresTemp.filter((e) => {
                        return e !== "bookLive"
                      })
                      SetActivatedSoftwares(activatedSoftwaresTemp)
                    }
                  }}>【不 克里丝 你不能这样做！】</button>

                  <div className='bigshot'/>
                </div>
              </div>
            </div>
          </div>
        </Draggable>
      }
      {
        (document.body.clientWidth < 767) &&
        <div className='window' style={{width: "calc(100% - 6px)", height: "calc(100% - 76px)"}}>
          <div className='titleBar'>
            预约拜年祭
            <button className='closeButton' onClick={() => {
              if (activatedSoftwares.includes("bookLive")){
                var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                activatedSoftwaresTemp = activatedSoftwaresTemp.filter((e) => {
                  return e !== "bookLive"
                })
                SetActivatedSoftwares(activatedSoftwaresTemp)
              }
            }}/>
          </div>

          <div className='content'>
            <div className='bookLive'>
              <label className='info'>现在订阅【【摆年寄】】， 即刻成为【链接已屏蔽】</label>

              <div className='funcButtons'>
                <button className='ok'>【好】</button>
                <button className='cancel' onClick={() => {
                  if (activatedSoftwares.includes("bookLive")){
                    var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                    activatedSoftwaresTemp = activatedSoftwaresTemp.filter((e) => {
                      return e !== "bookLive"
                    })
                    SetActivatedSoftwares(activatedSoftwaresTemp)
                  }
                }}>【不 克里丝 你不能这样做！】</button>

                <div className='bigshot'/>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}

function About(){
  const {activatedSoftwares, SetActivatedSoftwares} = useContext(activatedSoftwaresContext)

  return(
    <>
      {
        (!/Mobi|Android|iPhone/i.test(navigator.userAgent)) &&
        <Draggable handle='.titleBar'>
          <div className='window' style={{width: 800, height: 600}}>
            <div className='titleBar'>
              关于拜年祭
              <button className='closeButton' onClick={() => {
                if (activatedSoftwares.includes("about")){
                  var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                  activatedSoftwaresTemp = activatedSoftwaresTemp.filter((e) => {
                    return e !== "about"
                  })
                  SetActivatedSoftwares(activatedSoftwaresTemp)
                }
              }}/>
            </div>
    
            <div className='content'>
              <div className='about'>
                <img src={siteTitle} className='logo'/>
                <b>deltarune 2025拜年祭</b>
    
                <b style={{marginTop: 20}}>关于拜年祭</b>
                <label>组织者 B站 @一只Cross骨</label>
    
                <b style={{marginTop: 20}}>关于本网站</b>
                <label>开发者 B站 @辐卡RadTruck</label>
                <label>原创贴图提供者 B站 @yanalsei @Jank000.h @狗与粽子_</label>
                <label>部分贴图来自Toby Fox 的 Deltarune</label>
    
                <b style={{marginTop: 20}}>加入我们</b>
                <label>Q群 638836194</label>
              </div>
            </div>
          </div>
        </Draggable>
      }
      {
        (document.body.clientWidth < 767) &&
        <div className='window' style={{width: "calc(100% - 6px)", height: "calc(100% - 76px)"}}>
          <div className='titleBar'>
            关于拜年祭
            <button className='closeButton' onClick={() => {
              if (activatedSoftwares.includes("about")){
                var activatedSoftwaresTemp = JSON.parse(JSON.stringify(activatedSoftwares))
                activatedSoftwaresTemp = activatedSoftwaresTemp.filter((e) => {
                  return e !== "about"
                })
                SetActivatedSoftwares(activatedSoftwaresTemp)
              }
            }}/>
          </div>
  
          <div className='content'>
            <div className='about'>
              <img src={siteTitle} className='logo'/>
              <b>deltarune 2025拜年祭</b>
  
              <b style={{marginTop: 20}}>关于拜年祭</b>
              <label>组织者 B站 @一只Cross骨</label>
  
              <b style={{marginTop: 20}}>关于本网站</b>
              <label>开发者 B站 @辐卡RadTruck</label>
              <label>原创贴图提供者 B站 @yanalsei @Jank000.h @狗与粽子_</label>
              <label>部分贴图来自Toby Fox 的 Deltarune</label>
  
              <b style={{marginTop: 20}}>加入我们</b>
              <label>Q群 638836194</label>
            </div>
          </div>
        </div>
      }
    </>
  )
}

function App() {

  const [activatedSoftwares, SetActivatedSoftwares] = useState<string[]>([])

  return(
    <div className='app'>

      <activatedSoftwaresContext.Provider value={{activatedSoftwares, SetActivatedSoftwares}}>
        <Desktop/>
        <TaskBar/>
        {
          activatedSoftwares.includes("worksList") &&
          <WorksList/>
        }
        {
          activatedSoftwares.includes("bookLive") &&
          <BookLive/>
        }
        {
          activatedSoftwares.includes("about") &&
          <About/>
        }
      </activatedSoftwaresContext.Provider>
    </div>
  )
}

export default App
