// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import colors from 'vuetify/util/colors'


import {createVuetify} from 'vuetify'


export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          gray_1: colors.grey.lighten4
        },
      },
      dark: {
        colors: {
          gray_1: colors.grey.darken4
        }
      },
    },
  },
})
