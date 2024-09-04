import { useContext } from 'react';
import { StyleOptionsContext } from '../../../context/StyleOptionsContext';
import TrashBinModal from './trashBin-modal/TrashBinModal';

const TrashBin = () => {
  const { setToolType, setTrashBinModalOpen, trashBinModalOpen } = useContext(StyleOptionsContext);

  const handleTrashBinClick = () => {
    setToolType('eraseAll');
    setTrashBinModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleTrashBinClick}
        id={"eraseAll"}
        className="flex flex-acenter flex-jcenter tool"
       >
        <img src="/assets/trash-bin-icon.svg" alt={"erase all"} />
      </button>

      {trashBinModalOpen && <TrashBinModal />}
    </>
  );
};

export default TrashBin;