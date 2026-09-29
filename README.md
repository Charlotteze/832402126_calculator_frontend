# Calculator Frontend（学号_calculator_frontend）

Front-End and Back-End Separation Calculator System — Frontend (Web) 前后端分离计算器系统·前端

## 项目介绍

前后端分离计算器系统的 Web 前端，负责用户交互与信息展示：
- 计算器界面与按键交互
- 表达式输入
- 计算请求发送（`fetch` 调用后端 API）
- 计算结果展示
- 计算历史展示与删除

**前端不包含任何计算逻辑**。所有表达式都在后端完成校验、解析与计算，前端仅展示后端返回的结果。

## 技术栈

- HTML5
- CSS3
- 原生 JavaScript（fetch API）
- 无需 Node.js / npm / 构建工具

## 运行环境

- 任意现代浏览器（推荐 Microsoft Edge / Google Chrome）
- 需要后端服务处于运行状态

## 启动方法

方式一（最简）：直接用浏览器打开 `src/index.html`。

方式二（本地静态服务器）：

```bash
python -m http.server 5500
# 浏览器访问 http://localhost:5500/src/index.html
```

## 配置说明

文件：`src/js/api.js`

```js
const API_BASE = 'http://localhost:8080/api';
```

`API_BASE` 为后端服务地址。部署到公网后，将其修改为后端实际地址（例如 `https://your-backend.xxx/api`）。

## 功能

- 基本四则运算：+ − × ÷
- 复合表达式：运算符优先级、括号、一元正负号（如 `-5`、`3×-2`）、小数
- 错误提示：除零、非法表达式、后端离线
- 计算历史展示（数据来自后端数据库，刷新不丢失）
- 单条历史删除、清空全部
- 键盘快捷键（附加功能）：`0-9 + - * / ( ) Enter Backspace Esc`

## 前后端连接

页面通过 `fetch` 调用后端 API（跨域已由后端 CORS 配置放开）。测试流程：

1. 启动后端（`mvn spring-boot:run`，监听 8080）
2. 打开 `src/index.html`
3. 输入表达式，按 `=`，结果由后端返回

## 目录结构

```
src/
├── index.html       # 页面结构（计算器面板 + 历史面板）
├── css/style.css    # 样式
└── js/
    ├── api.js       # fetch 封装（calculate / history / delete / clear）
    └── calculator.js# 交互逻辑（按键、表达式拼接、渲染）
```
