import { useContext } from 'react';
import PropTypes from 'prop-types';
import { StyleOptionsContext } from '../../../../context/StyleOptionsContext';

const TrashBinModal = () => {
  const { setTrashBinModalOpen, setToolType, setElements } = useContext(StyleOptionsContext);

  const handleCancel = () => {
    setTrashBinModalOpen(false);
    setToolType('pencil');
  };

  const handleAccept = () => {
    setTrashBinModalOpen(false);
    setElements([]);
    setToolType('pencil');
  };

  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal-background position-fixed flex flex-jcenter flex-acenter"
      onClick={handleCancel}
    >
      <div className="modal-container flex flex-dcolumn" onClick={handleStopPropagation}>
        <div className="title-close-button flex flex-jend">
          <button onClick={handleCancel}>X</button>
        </div>
        <div className="modal-container-title display-iblock text-acenter">
          <h1>Clean All</h1>
        </div>
        <div className="modal-container-body flex flex-jcenter flex-acenter text-acenter">
          <p>Are you sure you want to clean everything?</p>
        </div>
        <div className="modal-container-footer flex flex-jcenter flex-acenter">
          <button onClick={handleCancel} id="cancel-button">
            Cancel
          </button>
          <button onClick={handleAccept} id="accept-button">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

TrashBinModal.propTypes = {
    setTrashBinModalOpen: PropTypes.func.isRequired,
    setToolType: PropTypes.func.isRequired,
    setElements: PropTypes.func.isRequired,
  };

  export default TrashBinModal;
