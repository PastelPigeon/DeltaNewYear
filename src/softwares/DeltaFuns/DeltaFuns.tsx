import { useState } from "react"
import "./DeltaFuns.css"
import announcements from "./announcements.json"
import testPosts from "./test-posts.json"

export default function DeltaFuns(){
  const [announcementCount, setAnnouncementCount] = useState<number>(0)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  setTimeout(() => {
    if (announcementCount == announcements.length - 1){
      setAnnouncementCount(0)
    } else {
      setAnnouncementCount(announcementCount + 1)
    }
  }, 10000)

  return(
    <div className="deltaFuns">
      <img className="headImg" src={new URL("./assets/headImg.png",import.meta.url).href}/>
      
      <div className="announcementBar">
        {
          <label className="announcement">{announcements[announcementCount]}</label>
        }
      </div>

      <div className="contentContainer">
        <div className="categories">
          <label>分区</label>

          <div className="categoriesList">
            <button data-style="transparent" data-isSelected={selectedCategory == "all" ? true : false} onClick={() => {setSelectedCategory("all")}}>
              <div className="point"></div>
              <label className="text">全部</label>
            </button>
            <button data-style="transparent" data-isSelected={selectedCategory == "new-year" ? true : false} onClick={() => {setSelectedCategory("new-year")}}>
              <div className="point"></div>
              <label className="text">DR拜年祭</label>
            </button>
            <button data-style="transparent" data-isSelected={selectedCategory == "animation" ? true : false} onClick={() => {setSelectedCategory("animation")}}>
              <div className="point"></div>
              <label className="text">DR手书</label>
            </button>
            <button data-style="transparent" data-isSelected={selectedCategory == "fanmade" ? true : false} onClick={() => {setSelectedCategory("fanmade")}}>
              <div className="point"></div>
              <label className="text">DR同人宣传</label>
            </button>
            <button data-style="transparent" data-isSelected={selectedCategory == "game" ? true : false} onClick={() => {setSelectedCategory("game")}}>
              <div className="point"></div>
              <label className="text">DR游戏讨论</label>
            </button>
          </div>
        </div>

        <div className="posts">
          <div className="top">
            <label>帖子</label>
            <button className="addButton">＋添加</button>
          </div>

          <div className="postsList">
            {
              selectedCategory == "all" ?
              testPosts.map((post) => {
                return(
                  <div className="post">
                    <div className="uploader">
                      <img className="avater" src={new URL(post.uploader.avater, import.meta.url).href}/>
                      <label className="name">{post.uploader.name}</label>
                    </div>
                    <div className="postContent">
                      <label className="title">{post.title}</label>
                      <label className="contentText">{post.content}</label>
                      <label className="category" onClick={() => {setSelectedCategory(post.category)}}>{post.category == "new-year" ? "拜年祭" : post.category == "animation" ? "DR手书" : post.category == "fanmade" ? "DR同人宣传" : post.category == "game" && "DR游戏讨论"}</label>
                    </div>
                  </div>
                )
              }) :
              testPosts.map((post) => {
                if (post.category == selectedCategory){
                  return(
                    <div className="post">
                      <div className="uploader">
                        <img className="avater" src={new URL(post.uploader.avater, import.meta.url).href}/>
                        <label className="name">{post.uploader.name}</label>
                      </div>
                      <div className="postContent">
                        <label className="title">{post.title}</label>
                        <label className="contentText">{post.content}</label>
                        <label className="category" onClick={() => {setSelectedCategory(post.category)}}>{post.category == "new-year" ? "拜年祭" : post.category == "animation" ? "DR手书" : post.category == "fanmade" ? "DR同人宣传" : post.category == "game" && "DR游戏讨论"}</label>
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}