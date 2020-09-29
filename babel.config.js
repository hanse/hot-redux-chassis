module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: false,
        modules: false
      }
    ],
    '@babel/preset-react',
    [
      '@babel/preset-typescript',
      {
        onlyRemoveTypeImports: true
      }
    ]
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
  ],
  env: {
    development: {
      plugins: ['@babel/plugin-transform-react-jsx-source']
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current'
            }
          }
        ],
        '@babel/preset-react'
      ],
      plugins: [
        'dynamic-import-node',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties'
      ]
    }
  }
};
