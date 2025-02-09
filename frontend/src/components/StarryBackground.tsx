const StarryBackground = () => {
  return (
    <div className="fixed inset-0 bg-black -z-10">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-blue-900/20" />
    </div>
  );
};

export default StarryBackground;
