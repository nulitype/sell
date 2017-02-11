module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'object-shorthand': 0,
    'func-names': 0,
    'no-plusplus': 0,
    'prefer-const': 0,
    'no-alert': 0,
    'no-shadow': 0,
    'arrow-body-style': 0,
    'prefer-default-export': 0,
    'prefer-template': 0,
    'no-restricted-syntax': 0,
    'no-mixed-operators': 0,
  }
}
