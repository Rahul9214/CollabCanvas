// eslint-disable-next-line react/prop-types
const Redo = ({ redo }) => {

return (
    <button
      onClick={redo}
      className="redo flex flex-jcenter flex-acenter"
    >
      <img src="/assets/redo-icon.svg" alt={"redo"} />
    </button>
  );
};

export default Redo;