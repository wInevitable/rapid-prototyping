import React, { Component, } from 'react'
import { Cell, Grid, } from 'react-mdl'
import { modularScale, palette, zIndex, } from 'theme/Theme'
import classNames from 'classnames'
import injectSheet from 'react-jss'

class AppFooter extends Component {
  render() {
    const { classes, generateHeapID, routeTo, } = this.props

    return (
      <Grid
        className={classNames(
          [classes.footer],
          'footer'
        )}
        noSpacing
        shadow={2}
      >
        <Cell
          col={8}
          phone={2}
          tablet={6}
        >
          <ul className={classes.leftList}>
            <a
              className={classNames(
                classes.link,
                generateHeapID('appFooter-title')
              )}
              href="javascript:void(0)"
              onTouchTap={() => routeTo('landing')}
            >
              wInevitable Rapid Prototyping
            </a>
          </ul>
        </Cell>
        <Cell
          col={4}
          phone={2}
          tablet={2}
         />
      </Grid>
    )
  }
}

const styles = {
  footer: {
    backgroundColor: palette.blue,
    borderTopLeftRadius: modularScale.largeBorderRadius,
    borderTopRightRadius: modularScale.largeBorderRadius,
    color: palette.whitePrimary,
    margin: 'auto',
    minHeight: modularScale.pageMargin,
    zIndex: zIndex.footer,
  },
  leftList: {
    float: 'left',
    margin: 0,
    marginLeft: modularScale.headerMargin,
    marginTop: '32.5px',
    padding: 0,
  },
  link: {
    color: palette.whitePrimary,
    float: 'right',
    textDecoration: 'none',
  },
  '@media (max-width: 450px)': {
    leftList: {
      marginLeft: `${modularScale.doubleBaseline} !important`,
    },
  },
  '@media (max-width: 840px)': {
    footer: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      width: '100%',
    },
    leftList: {
      marginLeft: modularScale.headerMargin,
    },
    link: {
      marginRight: modularScale.baseMargin,
    },
  },
}

export default injectSheet(styles)(AppFooter)
