import classes from './sigiel.module.css';

const Sigiel = props => {
  return (
    <div className={classes.sigiel}>
      <p>{props.chapter}</p>
      <div>
        <p>{props.book}</p>
        <p>{props.verse}</p>
      </div>
    </div>
  );
};

export default Sigiel;
