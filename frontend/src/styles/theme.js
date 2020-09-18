import { createMuiTheme } from '@material-ui/core/styles';
import background from '../assets/bg-img.jpg';
import texture from '../assets/texture.png';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
        body: {
          height: '100vh',
          backgroundImage: `url(${texture}),  url(${(background)})`,
          backgroundSize: 'auto, cover',
          backgroundRepeat: 'auto, no-repeat',
          backgroundPosition: 'center',
        },
        '#root': {
          overflowX: 'hidden',
          height: '100vh',
        },
      },
    },
  },
});

export default theme;
