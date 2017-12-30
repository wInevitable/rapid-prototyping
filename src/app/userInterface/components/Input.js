import React from 'react'
import { fontFamily, modularScale, palette, } from 'theme/Theme'
import Caption from 'typography/Caption'
import classNames from 'classnames'
import injectSheet from 'react-jss'

const Input = ({
  classes, className, columns, defaultValue, disabled, error, errorClassName,
  hideBottomBorder, id, label, labelClassName, labelStyles, max, maxLength, min,
  name, placeholder, onBlur, onChange, onKeyPress, readOnly, regularLabel, optional,
  rows, step, styles, type, value, wrapperClassName, wrapperStyles,
}) => (
  <div
    className={classNames({
      [classes.defaultWrapperStyles]: true,
      [wrapperClassName]: wrapperClassName,
    })}
    style={wrapperStyles}
  >
    {
      type === 'textarea' ? (
        <textarea
          className={classNames({
            [classes.borderBottomNone]: hideBottomBorder,
            [classes.defaultStyles]: true,
            [className]: className,
          })}
          cols={columns}
          defaultValue={defaultValue}
          id={id}
          maxLength={maxLength}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          required
          rows={rows}
          style={styles}
          type={type}
          value={value}
        />
      ) : (
        <input
          className={classNames({
            [classes.borderBottomNone]: hideBottomBorder,
            [classes.defaultStyles]: true,
            [className]: className,
          })}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id}
          max={max}
          maxLength={maxLength}
          min={min}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          readOnly={readOnly}
          required
          step={step}
          style={styles}
          type={type}
          value={value}
        />
      )
    }
    {
      label ? (
        <label
          className={classNames({
            [classes.defaultLabelStyles]: true,
            [classes.labelWithError]: error,
            [classes.regularLabelStyles]: regularLabel,
            [labelClassName]: labelClassName,
            [classes.requiredLabel]: !optional,
          })}
          htmlFor={id}
          style={labelStyles}
        >
          {label}
          {
            optional ? (
              <Caption className={classes.notRequired}>
                &nbsp;(optional)
              </Caption>
            ) : ''
          }
        </label>
      ) : null
    }
    {
      error ? (
        <span
          className={classNames({
            [classes.inputError]: true,
            [errorClassName]: errorClassName,
          })}
        >
          {error}
        </span>
      ) : null
    }
  </div>
)

const styles = {
  borderBottomNone: {
    borderBottom: 'none !important',
  },
  defaultLabelStyles: {
    bottom: 0,
    color: palette.blue,
    display: 'block',
    fontSize: modularScale.base,
    left: 0,
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    textAlign: 'left',
    // top: '2px', // use when value is not empty
    top: '24px', // use when value is empty
    whiteSpace: 'nowrap',
    width: '100%',
  },
  defaultStyles: {
    background: 'none',
    border: 'none',
    borderBottom: '1px solid rgba(0,0,0, 0.12)',
    display: 'block',
    fontFamily: fontFamily,
    fontSize: modularScale.base,
    margin: 0,
    padding: `${modularScale.minusTwo} 0`,
    textAlign: 'left',
    width: '100%',
    '&:focus': {
      outline: 'none',
    },
  },
  defaultWrapperStyles: {
    boxSizing: 'border-box',
    display: 'block',
    fontSize: modularScale.base,
    margin: 'auto',
    marginBottom: modularScale.baseline,
    marginTop: modularScale.baseline,
    maxWidth: '100%',
    padding: `${modularScale.doubleBaseline} 0`,
    position: 'relative',
    width: modularScale.sixth,
  },
  inputError: {
    color: palette.red,
    display: 'block',
    fontSize: modularScale.minusOne,
    marginTop: '3px',
    position: 'absolute',
  },
  labelWithError: {
    color: palette.red,
  },
  regularLabelStyles: {
    top: '2px',
  },
  requiredLabel: {
    fontWeight: 900,
  },
}

export default injectSheet(styles)(Input)
