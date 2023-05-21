import { forwardRef } from 'react'
import classes from './Input.module.scss'

const Input = forwardRef((props, ref) => {
	return <input ref={ref} className={classes.input} {...props} />
})

export default Input
