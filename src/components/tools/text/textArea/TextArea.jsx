import PropTypes from 'prop-types';

const TextArea = ({ textAreaRef, textAreaOnClickHandler, style }) => {
  return (
    <textarea
      ref={textAreaRef}
      onClick={textAreaOnClickHandler}
      style={style}  // Note: if using CSS modules, inline styles might be replaced
      className="TextArea"
    />
  );
};

TextArea.propTypes = {
  textAreaRef: PropTypes.object,
  textAreaOnClickHandler: PropTypes.func,
  style: PropTypes.object,
};

TextArea.defaultProps = {
  textAreaRef: null,
  textAreaOnClickHandler: () => {},
  style: {},
};

export default TextArea;
