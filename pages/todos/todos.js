// pages/todos/todos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputData:'',
    leftCount:0,
    toTods:[
      {
        toggled:false,
        content:'Learning HTML'
      },
      {
        toggled: false,
        content: 'Learning CSS'
      },
      {
        toggled: false,
        content: 'Learning JS'
      },
    ],
    logs:[],
    allSelected:false
  },

  save: function () {
    wx.setStorageSync('todo_list', this.data.toTods)
    wx.setStorageSync('todo_logs', this.data.logs)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var todos = this.data.toTods
    var count = todos.filter( item => !item.toggled).length
    this.setData({
      leftCount: count
    }, function () { console.log('todos', this.data.toTods) })
    this.save()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  inputHandler: function (e) {
    console.log('value', e.detail.value)
    this.setData({
      inputData: e.detail.value
    })
  },
  toggleIcon:function (e) {
    var index = e.currentTarget.dataset.index
    console.log('index', index)
    var todos = this.data.toTods
    todos[index].toggled = !todos[index].toggled
    var count = todos.filter(item => !item.toggled).length
    this.setData({ 
      toTods: todos,
      leftCount: count,
    }, function(){ console.log('todos', this.data.toTods)})
    this.save()
  },
  addTodoHandle: function (e) {
    console.log('addTodoHandle', e.detail.value)
    var todos = this.data.toTods
    var logs = this.data.logs
    todos.push({
      toggled: false,
      content: e.detail.value,
      cleared: false
    })
    logs.push({
      timeStamp: new Date(),
      action: 'Add',
      name: 'add one todo'
    })
    this.setData({
      toTods: todos,
      inputData: '',
      logs: logs,
      leftCount: this.data.leftCount+1
    })
    this.save()
  },
  selectAll: function () {
    var todos = this.data.toTods
    var logs = this.data.logs
    var allSelected = !this.data.allSelected
    todos.map(
      item => {
        item.toggled = allSelected
      }
    )
    logs.push({
      timeStamp: new Date(),
      action: allSelected? 'Finished' : 'Restart',
      name: 'Completed todos'
    })
    this.setData({
      allSelected: allSelected,
      logs: logs,
      toTods: todos,
      leftCount: allSelected ? 0 : todos.length
    }, function () { console.log('todos', this.data.toTods) })
    this.save()
  },
  clearAll: function () {
    var todos = this.data.toTods
    var logs = this.data.logs
    var remains= []
    todos.map(
      (item,i) => {
        if(!item.toggled){
          remains.push(item)
        }
      }
    )
    logs.push({
      timeStamp: new Date(),
      action:'Clear All',
      name:'clear Completed todos'
    })
    this.setData({
      logs: logs,
      toTods: remains,
      leftCount: remains.length
    }, function () { console.log('todos', this.data.toTods) })
    this.save()
  },
  clearOne: function (e) {
    var index = e.currentTarget.dataset.curindex
    console.log('index', index)
    var todos = this.data.toTods
    var logs = this.data.logs
    todos.splice(index,1)
    logs.push({
      timeStamp: new Date(),
      action: 'Remove',
      name: 'remove a finished one'
    })
    this.setData({
      logs: logs,
      toTods: todos,
    }, function () { console.log('todos', this.data.toTods) })
    this.save()
  }
})