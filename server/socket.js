/*
 * @Author: ryuusennka
 * @Date: 2021-03-19 14:24:59
 * @LastEditors: ryuusennka
 * @LastEditTime: 2021-03-23 03:49:41
 * @FilePath: /quick-test/server/socket.js
 * @Description:
 */
const socketIo = require('socket.io');
const parse = require('url-parse');
const users = [];

module.exports = function (server) {
  const io = socketIo(server);
  io.on('connection', function (socket) {
    var url = parse(socket.handshake.headers.referer, true);
    // 获取连接用的username，和进入的chatroom
    const { username, chatroom } = url.query;
    const id = socket.id;
    const currentUser = { id, username, chatroom };
    // 将用户添加到用户组
    users.push(currentUser);

    socket.emit('welcome', {
      message: `欢迎${username} 来到 ${chatroom} 聊天室`,
      chatroom,
      users: users.filter(user => user.chatroom === chatroom), // 返回当前聊天室的用户
    });
    socket.join(chatroom);
    socket.in(chatroom).emit('userLogin', {
      message: `${username} 登录了 ${chatroom} 聊天室`,
      users: users.filter(user => user.chatroom === chatroom), // 返回当前聊天室的用户
    });
    socket.on('chatMessage', ({ message }) => {
      io.in(chatroom).emit('chatMessage', {
        username,
        message,
        date: new Date().toString(),
      });
    });

    socket.on('disconnect', () => {
      // 移除已经离开的用户
      users.splice(users.indexOf(currentUser), 1);
      socket.in(chatroom).emit('userLeave', {
        message: `${username} 退出了 ${chatroom}`,
        users: users.filter(user => user.chatroom === chatroom), // 返回当前聊天室的用户
      });
    });
  });
};
