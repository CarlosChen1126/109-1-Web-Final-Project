# Makerspace 門禁管理系統

## deploy 連結
https://acs-web-final-project.herokuapp.com

## Demo 影片連結
https://www.youtube.com/watch?v=v_JoVTYAjyQ

## 提供一組管理者帳密
* 帳號：ACS
* 密碼：aloha

## 如何使用 軟體端 code
1. yarn

2. 在 .env 中填寫 MONGO_URL

3. yarn start(concurrently frontend and backend)

## 如何使用 硬體端 code
刷入: 
   1. pip install pymongo/pyaudio/pyserial/gtts/numpy/dotenv/time/speech_recognition/subprocess
   2. python3 serialinput.py 
   
刷出: 
   1. pip install pymongo/pyaudio/pyserial/gtts/numpy/dotenv/time/speech_recognition/subprocess
   2. python3 serialinput_out.py


## 描述這個服務在做甚麼
這個服務提供一般使用者及管理者門禁系統，有以下功能：

* 一般使用者
1. 一般使用者註冊，儲存學號在資料庫裡
2. 刷入刷出門禁，並且語音記錄進來的原因
3. 知道目前管理者是誰

* 管理者：
1. 紀錄一般使用者的進出情形及進入原因
2. 顯示在線人員
3. 某時段管理員更改
4. 帳密設定
5. 信箱設定


## 使用/操作方式
* 一般使用者
1. 至使用者註冊頁面填寫帳號、密碼、信箱，系統會寄送驗證信，填寫驗證碼即成功註冊
2. 若要進入 makerspace，將學生證放在刷卡機前面刷卡，硬體會問使用者進來做甚麼，讀取聲音後會將記錄儲存至資料庫，並且登記此人為在線
3. 若離開 makerspace，將學生證方在刷卡機前面刷卡，讀取條碼後會將此人登記為離線

* 管理者
1. 若初次使用網頁，進入管理員登入系統後系統會跳轉至新增管理員帳號密碼
2. 新增完後在管理員登入系統可登入管理頁面
3. 進入管理頁面後系統會通知填寫寄送驗證信的信箱帳密
4. 進入信箱設定設定信箱帳號密碼
5. 至管理端管理介面可以透過學號以及姓名查詢使用者資料，對某一使用者可以查看其所有進出紀錄，並可修改其學號或姓名或直接刪除該筆資料
6. 可進入在線人員頁面查看目前在線人員
7. 可進入修改管理員頁面修改目前管理員
8. 進入帳密設定修改帳號密碼
9. 進入信箱設定修改信箱帳號及信箱密碼


## 其他說明
用 chrome 看效果最佳

## 使用與參考之框架/模組/原始碼
* 前端：React、react-router-dom、material-ui、babel
* 後端：cors、express、babel、mongoose、dotenv、mongoose、node-fetch、nodemon
* 資料庫：MongoDB Atlas
* 硬體端：pyserial、gtts、pyaudio、pymongo、python-dotenv

## 專題製作心得
* 張原嘉
    * 做期末專題最大的困難就是註冊按鈕按下時要預防有人連續按 enter，這會導致連續寄信，另外我們的 loading gif 讓頁面豐富許多，而且我們的 link 上有做一些小巧思，非常的開心，唯一可惜的地方是我們沒有用 websocket，不能及時在瀏覽器上更新資料
    
* 王政邦
   * 第一次做一個包含軟體跟硬體的 project，感覺蠻有趣的，在製作的過程中也學到許多網路服務的實作細節，比較特別的是使用第三方的 api 其實沒有想像中的困難，只要有耐心跟心地善良就可以讓硬體端執行想要它做的事情，也希望未來還有機會做網路服務的相關 project。

* 陳宥辰
   * 這次專題我做的是硬體端的部分，我學到了很多自主學習的部分，也讓我更有信心去面對未知的領域，希望之後如果有其他專題的話，自己不管是硬體端或是軟體端都能有更多的貢獻。

## 使用之第三方套件、框架、程式碼
1. nodemailer 寄信程式
2. wake up dyno 陳柏志助教的 code https://github.com/TobyChen0106/109-1-web-deploy-tutorial
3. 參考 web programming hackathon 第二、第三次的 code
4. 參考電機二手書 EESHB 前端的程式碼
5. icon 及 favicon.ico 由網路上抓取 https://www.flaticon.com/
6. 硬體端部分用了 google api 的語音辨識
7. material-ui 的官方 table 模板

## Contributing 個別貢獻

* 王政邦
1. 管理端管理頁面對於使用者的查詢、修改、刪除
2. rpi 上 google api 語音辨識及語音輸入套件使用
3. 刷卡進出的流程、錯誤處理
4. 顯示使用者的進出記錄
5. 利用 material-ui 來優化表格及輸入框
6. 網頁美化建議
    
* 張原嘉
1. 首頁動畫
2. 註冊功能(加寄送驗證信)
3. 管理員列表及管理員更改
4. 管理員登入系統
5. 在線人員
6. 信箱設定
7. loading gif
8. deploy 到 heroku，根據陳柏志助教的 heroku 教學實施 wake up dyno
9. react router dom 建置前端後端連接

* 陳宥辰
1. rpi 資料儲存到資料
2. 卡片資料從刷卡機置 rpi
2. 硬體配置(rpi、刷卡機、麥克風、喇叭)
3. 語音撥放功能
4. 讀取語音硬體端 + google api 語音辨識
5. 刷卡進出的流程、錯誤處理

## 是否有找外掛
否

## 是否為之前作品/專題的延伸
否

## 對於此課程的建議
無
