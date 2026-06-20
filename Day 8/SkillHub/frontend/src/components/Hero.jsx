import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Hero() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Learn Modern Technology</h1>
      <p>
        Build Real World Applications using React, Java, Node JS and MERN Stack
      </p>
      <button onClick={() => navigate(user ? "/course-details" : "/login")}>
        Start Learning
      </button>
    </motion.section>
  );
}

export default Hero;
