import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative bg-card border border-border rounded-2xl shadow-card w-full max-w-md p-6"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-4">
              {title && (
                <h2 className="text-xl font-semibold text-text-primary">
                  {title}
                </h2>
              )}
              <button
                onClick={onClose}
                className="text-text-secondary hover:text-text-primary transition-colors ml-auto"
                aria-label="Close dialog"
              >
                <FiX size={22} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
