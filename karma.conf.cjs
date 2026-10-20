// Configuración de Karma: ejecuta las pruebas de Jasmine en Chrome
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    // archivos de prueba
    files: ['src/pruebas/configuracion.js', 'src/pruebas/**/*.spec.jsx'],

    preprocessors: {
      'src/pruebas/configuracion.js': ['webpack'],
      'src/pruebas/**/*.spec.jsx': ['webpack'],
    },

    // webpack + babel para que Karma entienda JSX
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
                // istanbul mide la cobertura solo del código de la app (no de las pruebas)
                plugins: [['istanbul', { exclude: ['src/pruebas/**'] }]],
              },
            },
          },
        ],
      },
    },

    reporters: ['spec', 'coverage'],

    coverageReporter: {
      dir: 'coverage/',
      reporters: [{ type: 'html', subdir: 'html' }, { type: 'text-summary' }, { type: 'text' }],
    },

    browsers: ['ChromeHeadlessSinSandbox'],
    customLaunchers: {
      ChromeHeadlessSinSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    singleRun: true,
  })
}
