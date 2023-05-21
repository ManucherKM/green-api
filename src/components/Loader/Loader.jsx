import Spinner from '../Spinner/Spinner'
import classes from './Loader.module.scss'

const Loader = () => {
	return (
		<div className={classes.wrapper}>
			<Spinner />
		</div>
	)
}

export default Loader
