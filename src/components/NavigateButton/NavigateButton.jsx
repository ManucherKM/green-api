import classes from "./NavigateButton.module.scss";

const NavigateButton = ({ children, ...props }) => {
  return (
    <button className={classes.button} {...props}>
      {children}
    </button>
  );
};

export default NavigateButton;
