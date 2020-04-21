module.exports = api => {
  api.cache(true)
  return {
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      '@babel/preset-env',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: false,
        },
      ],
    ],
  }
}
