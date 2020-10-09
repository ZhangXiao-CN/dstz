const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  // 去除项目中的 console.* 的调用
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 产品发布时的插件
    ...prodPlugins,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
