import classes from './TextError.module.scss'

const TextError = ({ children, ...props }) => {
	return (
		<h3 className={classes.text} {...props}>
			{children}
		</h3>
	)
}

export default TextError
