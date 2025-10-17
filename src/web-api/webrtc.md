# WebRTC

## 简介

WebRTC（Web Real-Time Communication，网页实时通信）是一项使网页应用和站点能够在不借助中间件的情况下，直接在浏览器之间捕获和可选择性地传输音频、视频和任意数据的技术。它提供了一系列标准API，使得无需插件或第三方软件即可实现点对点的数据共享和视频通话。

WebRTC 包含多个相互关联的 API 和协议，它们协同工作以实现多媒体通信功能，包括音频和视频会议、文件交换、屏幕共享、身份管理以及与传统电话系统的接口等。

## 核心概念

### RTCPeerConnection

RTCPeerConnection 接口表示本地计算机与远程对等方之间的 WebRTC 连接。它用于处理两个对等方之间的数据流式传输。

```js
// 创建一个新的 RTCPeerConnection 实例
const pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: 'stun:stun.example.com'
    }
  ]
});

// 监听连接状态变化
pc.onconnectionstatechange = event => {
  switch(pc.connectionState) {
    case "connected":
      // 连接已建立
      break;
    case "disconnected":
    case "failed":
      // 连接断开或失败
      break;
    case "closed":
      // 连接已关闭
      break;
  }
};
```

### RTCDataChannel

RTCDataChannel 接口表示连接的两个对等方之间的双向数据通道，可用于传输任意数据。

```js
// 创建数据通道
const dataChannel = pc.createDataChannel("my channel");

// 监听数据通道事件
dataChannel.onopen = event => {
  console.log("数据通道已打开");
  dataChannel.send("Hello, WebRTC!");
};

dataChannel.onmessage = event => {
  console.log("收到消息: " + event.data);
};

dataChannel.onclose = event => {
  console.log("数据通道已关闭");
};
```

### 媒体流和轨道

WebRTC 与媒体捕捉和媒体流 API 结合使用时，可以实现强大的多媒体功能。媒体流可以由任意数量的媒体轨道组成，包括音频、视频和文本轨道。

```js
// 获取本地媒体流
const localStream = await navigator.mediaDevices.getUserMedia({ 
  video: true, 
  audio: true 
});

// 将媒体轨道添加到连接中
localStream.getTracks().forEach(track => {
  pc.addTrack(track, localStream);
});

// 监听远程媒体流
pc.ontrack = event => {
  const remoteStream = event.streams[0];
  // 将远程流连接到页面中的 video 元素
  document.getElementById('remoteVideo').srcObject = remoteStream;
};
```

## WebRTC 协议

### ICE（Interactive Connectivity Establishment）

ICE 是一个允许浏览器和对端浏览器建立连接的协议框架。在网络中，由于防火墙、NAT 等因素，简单的端到端连接往往无法建立，ICE 通过使用 STUN 和 TURN 等技术来解决这些问题。

### STUN（Session Traversal Utilities for NAT）

STUN 允许位于 NAT 后的客户端找出自己的公网地址，并判断出路由器阻止直连的限制方法。

```js
const configuration = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    }
  ]
};

const pc = new RTCPeerConnection(configuration);
```

### TURN（Traversal Using Relays around NAT）

TURN 通过 TURN 服务器中继所有数据的方式来绕过对称型 NAT，是开销较大的解决方案，通常在 STUN 无法工作时使用。

```js
const configuration = {
  iceServers: [
    {
      urls: 'turn:turn.example.com',
      username: 'username',
      credential: 'password'
    }
  ]
};
```

### SDP（Session Description Protocol）

SDP 是一个描述多媒体连接内容的协议，包括分辨率、格式、编码、加密算法等。在 WebRTC 中，SDP 用于描述连接的媒体能力和配置。

## 实际应用

### 建立连接的基本流程

```js
async function startConnection() {
  const pc = new RTCPeerConnection(configuration);
  
  // 获取本地媒体流
  const localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
  document.getElementById('localVideo').srcObject = localStream;
  
  // 添加本地轨道到连接
  localStream.getTracks().forEach(track => {
    pc.addTrack(track, localStream);
  });
  
  // 创建提议
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  
  // 通过信令服务器发送 offer 给对端
  signaling.send({type: 'offer', sdp: offer.sdp});
}

// 处理收到的提议
async function handleOffer(offer) {
  const pc = new RTCPeerConnection(configuration);
  
  // 设置远程描述
  await pc.setRemoteDescription(offer);
  
  // 创建应答
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);
  
  // 通过信令服务器发送应答给对端
  signaling.send({type: 'answer', sdp: answer.sdp});
}
```

### 处理 ICE 候选

```js
// 发送 ICE 候选
pc.onicecandidate = event => {
  if (event.candidate) {
    signaling.send({
      type: 'candidate',
      candidate: event.candidate
    });
  }
};

// 添加收到的 ICE 候选
function handleCandidate(candidate) {
  pc.addIceCandidate(candidate);
}
```

## 配置选项

### RTCPeerConnection 配置

```js
const configuration = {
  // ICE 服务器配置
  iceServers: [
    {
      urls: ['stun:stun.example.com']
    },
    {
      urls: ['turn:turn.example.com'],
      username: 'username',
      credential: 'password'
    }
  ],
  
  // ICE 传输策略
  iceTransportPolicy: 'all', // 'relay' | 'all'
  
  // 捆绑策略
  bundlePolicy: 'balanced', // 'balanced' | 'max-compat' | 'max-bundle'
  
  // RTCP 复用策略
  rtcpMuxPolicy: 'require' // 'negotiate' | 'require'
};
```

## 实例属性和方法

### RTCPeerConnection 主要属性

| 属性 | 描述 |
|------|------|
| connectionState | 连接状态（new, connecting, connected, disconnected, failed, closed） |
| iceConnectionState | ICE 连接状态（new, checking, connected, completed, failed, disconnected, closed） |
| iceGatheringState | ICE 收集状态（new, gathering, complete） |
| signalingState | 信令状态（stable, have-local-offer, have-remote-offer, have-local-pranswer, have-remote-pranswer, closed） |
| localDescription | 本地会话描述 |
| remoteDescription | 远程会话描述 |

### RTCPeerConnection 主要方法

| 方法 | 描述 |
|------|------|
| createOffer() | 创建 SDP 提议 |
| createAnswer() | 创建 SDP 应答 |
| setLocalDescription() | 设置本地会话描述 |
| setRemoteDescription() | 设置远程会话描述 |
| addIceCandidate() | 添加 ICE 候选 |
| createDataChannel() | 创建数据通道 |
| addTrack() | 添加媒体轨道 |
| removeTrack() | 移除媒体轨道 |
| close() | 关闭连接 |

### RTCDataChannel 主要属性

| 属性 | 描述 |
|------|------|
| label | 数据通道标签 |
| ordered | 是否保证传输顺序 |
| readyState | 通道状态（connecting, open, closing, closed） |
| bufferedAmount | 缓冲区中等待发送的字节数 |
| binaryType | 二进制数据类型（blob, arraybuffer） |

### RTCDataChannel 主要方法

| 方法 | 描述 |
|------|------|
| send() | 发送数据 |
| close() | 关闭数据通道 |

## 浏览器兼容性

WebRTC 在现代浏览器中有良好的支持：

```js
// 检查浏览器支持
if (typeof RTCPeerConnection !== 'undefined') {
  // 支持 RTCPeerConnection
  console.log('浏览器支持 RTCPeerConnection');
}

if (typeof RTCDataChannel !== 'undefined') {
  // 支持 RTCDataChannel
  console.log('浏览器支持 RTCDataChannel');
}

// 检查媒体设备支持
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log('浏览器支持 getUserMedia');
}
```

## 安全考虑

1. **HTTPS 要求**：WebRTC 需要在安全上下文（HTTPS）中使用
2. **权限管理**：访问摄像头和麦克风需要用户授权
3. **数据加密**：媒体和数据传输默认使用加密

```js
// 检查是否在安全上下文
if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
  console.warn('WebRTC 需要 HTTPS 环境');
}
```

## 相关资源

- [MDN WebRTC API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)
- [WebRTC 官方网站](https://webrtc.org/)
- [W3C WebRTC Specification](https://w3c.github.io/webrtc-pc/)
- [Can I Use: WebRTC](https://caniuse.com/#feat=rtcpeerconnection)