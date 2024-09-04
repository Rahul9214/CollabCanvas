import PropTypes from "prop-types";

// eslint-disable-next-line react/prop-types
const ColorOptions = ({ state, setState, colorTypes, label }) => {
  return (
    <div className="styling-panel--option_wrapper flex flex-jbetween flex-acenter">
      <label htmlFor="stroke-colors">{label}</label>
      <div className="styling-panel--colors_wrapper flex flex-jbetween flex-acenter">
        {colorTypes.map(({ id, colorType }) => (
          <div
            key={id}
            style={{ background: colorType }}
            onClick={() => setState(colorType)}
            className={`styling-panel--colors_wrapper--color ${
              state === id ? "active" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

ColorOptions.propTypes = {
  state: PropTypes.string.isRequired,
  setState: PropTypes.number.isRequired,
  colorTypes: PropTypes.func.isRequired,
};

export default ColorOptions;
