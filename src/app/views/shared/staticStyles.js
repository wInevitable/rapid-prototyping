import { headlineFontFamily, modularScale, palette, } from 'theme/Theme.js'

const staticStyles = {
  block: {
    display: 'block',
  },
  bold: {
    fontWeight: 900,
  },
  card: {
    animation: 'fade-in 1s ease forwards',
    margin: 'auto',
    padding: modularScale.quadrupleBaseline,
    paddingTop: modularScale.baseline,
    borderRadius: modularScale.largeBorderRadius,
    transformStyle: 'preserve-3d',
    width: '100%',
  },
  checkbox: {
    marginRight: modularScale.baseline,
  },
  clearfix: {
    clear: 'both',
  },
  content: {
    animation: 'fade-in 1s ease forwards',
    display: 'block',
    margin: 'auto',
    marginBottom: modularScale.doubleBaseline,
    marginTop: '110px',
    minHeight: modularScale.minHeight,
    textAlign: 'center',
    width: '80%',
  },
  doubleBaselineMarginTop: {
    marginTop: modularScale.doubleBaseline,
  },
  error: {
    animation: 'fade-in 1s ease forwards',
    color: palette.red,
    fontSize: modularScale.base,
  },
  fontIconWrapper: {
    backgroundColor: palette.blue,
    borderRadius: modularScale.largeBorderRadius,
    color: palette.whitePrimary,
    cursor: 'pointer',
    display: 'block',
    height: '110px',
    margin: 'auto',
    padding: modularScale.baseline,
    position: 'relative',
    textAlign: 'center',
    width: '110px',
  },
  form: {
    animation: 'fade-in 1s ease forwards',
    margin: 'auto',
  },
  header: {
    animation: 'fade-in 1s ease forwards',
    fontFamily: headlineFontFamily,
    textAlign: 'center',
  },
  icon: {
    marginRight: modularScale.doubleBaseline,
  },
  link: {
    color: palette.blue,
  },
  noLeadMargin: {
    marginTop: 0,
  },
  noTrailingMargin: {
    marginBottom: 0,
  },
  radio: {
    marginRight: modularScale.baseline,
  },
  siteName: {
    color: palette.blue,
  },
  subheader: {
    animation: 'fade-in 1s ease forwards',
    margin: `0 auto ${modularScale.tripleBaseline}`,
  },
  table: {
    backgroundColor: 'rgba(238, 238, 238, 1) !important',
    borderRadius: modularScale.largeBorderRadius,
    fontSize: modularScale.baseFontSize,
  },
  title: {
    animation: 'fade-in 1s ease forwards',
    margin: `${modularScale.tripleBaseline} 0`,
  },
  '@media (max-width: 416px)': {
    card: {
      paddingLeft: modularScale.doubleBaseline,
      paddingRight: modularScale.doubleBaseline,
    },
    content: {
      width: '100%',
    },
    textField: {
      width: modularScale.sixth,
    },
  },
}

export default staticStyles
