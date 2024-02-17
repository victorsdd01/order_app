
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        primary: '#022865',
        secondary: '#24479A',
        accent: '#1685C5',
        'light-blue': '#92C9E2',
        'pale-blue': '#B2E2F8',
        error: '#BA0000',
        warning: '#F3BF38',
        info: '#00bcd4',
        success: '#1A9D05',
        black: '#000000',
        'dark-gray': '#666666',
        gray: '#B3B3B3',
        'light-gray': '#E9E9E9',
        white: '#FFF',
        'light-black': '#2e2929',
        'light-primary': '#0228650d',
      },
    },
  },
})
