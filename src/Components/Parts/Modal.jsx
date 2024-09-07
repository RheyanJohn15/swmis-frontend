import { BiX } from "react-icons/bi"; 
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({modalOpen, setModalOpen, content, title}) => {
  return (
    <AnimatePresence>
      {modalOpen && (
        <div 
          className="fixed left-0 top-0 z-[999999] flex h-full min-h-screen w-full items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-5"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="w-full max-w-[570px] rounded-[20px] bg-white dark:bg-dark-2 "
          >
            <div className="flex justify-between p-4 border-b-2 border-grey">
                <p className="text-black text-2xl">{title}</p>
              <p id="closeModal" className="text-black text-2xl p-1 rounded-full cursor-pointer hover:bg-grey/30" onClick={() => setModalOpen(false)}>
                <BiX />
              </p>
            </div>
            {content}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;   