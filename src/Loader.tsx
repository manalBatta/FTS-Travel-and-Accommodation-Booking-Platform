import { motion } from "framer-motion";

function Loader() {
  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
      style={{
        width: 80,
        height: 80,
        backgroundColor: "black",
        borderRadius: 5,
        position:"fixed",
        top:"50%",
        left:"50%",
      }}
    />
  );
}

export default Loader;