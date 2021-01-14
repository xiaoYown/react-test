### `yarn install`

### `yarn start`

### `yarn test`

### `yarn build`

### 目录结构

```
.
├── const                                             // webpack 配置文件
├── scripts                                           // 开发, 打包, 测试 执行脚本
├── config                                            // 项目配置文件
├── dist                                              // build目录
└── src
    ├── @datasource                                   // 初始数据存放
    ├── @types                                        // 自定义通用类型存放
    ├── controller                                    // 状态控制 以及 带状态高阶组件
    ├── extensions                                    // 扩展功能接入系统控制
    │   ├── built-in                                  // 内置扩展
    │   └── external                                  // 外部扩展
    ├── libs                                          // 基础功能
    │   ├── base                                      // 基础功能类存放
    │   ├── components                                // 基础功能组件
    │   └── synthetic-event                           // 事件池
    ├── structure                                     // 编辑页结构
    │   ├── DispalyView                               // 编辑页内容显示 view
    │   ├── EditPanelView                             // 编辑栏 view
    │   ├── SidebaseView                              // 侧边栏 view
    │   ├── SidebaseChildView                         // 侧边栏-子窗口 view
    │   └── ToolbarView                               // 工具栏 view
    └── utils                                         // 通用工具
```
