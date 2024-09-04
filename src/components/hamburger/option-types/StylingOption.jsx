import PropTypes from "prop-types";

const StylingOption = ({ id, value, onChange }) => {
  return (
    <div className="styling-panel--option_wrapper flex flex-jbetween flex-acenter">
      <label htmlFor={id}>{id}</label>
      <div className="styling-panel--option_wrapper--range flex flex-jend">
        <input
          type="range"
          id={id}
          min={1}
          max={100}
          value={value}
          onChange={onChange}
          aria-label={`${id} range input`}
        />
        <span>{value}</span>
      </div>
    </div>
  );
};

StylingOption.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StylingOption;
