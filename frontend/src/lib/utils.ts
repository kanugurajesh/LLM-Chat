const leftToRight = {
  hidden: {
    x: "-100%", // Start off-screen to the left
    opacity: 0, // Fully transparent
  },
  visible: {
    x: "0%", // Move to its original position
    opacity: 1, // Fully visible
    transition: { duration: 0.5 }, // Duration of the animation
  },
};

export { leftToRight };
