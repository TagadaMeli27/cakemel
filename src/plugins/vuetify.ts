import 'vuetify/styles' // le CSS de base de Vuetify
import '@mdi/font/css/materialdesignicons.css' // les icônes
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#A35F12',
          secondary: '#7A5C45',
          background: '#FFFAF2',
          surface: '#FFFFFF',
          error: '#D6456B',
          success: '#2CB8A0',
          warning: '#F58A4B',
          info: '#7A7FE0',
          favori: '#E0453A',
          // couleurs des tags
          tag1: '#E39A2D',
          tag2: '#6E9B6B',
          tag3: '#4F86B0',
          tag4: '#A06CA8',
          tag5: '#B88A4A',
        },
      },
    },
  },
  defaults: {
    VAlert: { variant: 'flat', border: 'start', density: 'comfortable' },
    VAppBar: { color: 'primary', flat: true },
    VCard: { elevation: 1 },
    VTextField: { density: 'comfortable' },
    VTextarea: { density: 'comfortable' },
    VCombobox: { density: 'comfortable' },
  },
})
