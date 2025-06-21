
const SolutionCard = ({ icon, title, description, tags, iconGradient, tagBg, tagColor }) => {
  const handleCardHover = (e, isEntering) => {
    if (isEntering) {
      e.target.style.transform = 'translateY(-10px)';
      e.target.style.boxShadow = '0 35px 60px -12px rgba(99, 102, 241, 0.3)';
    } else {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    }
  };

  return (
    <div
      className="bg-white p-8 rounded-3xl shadow-2xl border border-[#E2E8F0] transition-all duration-300"
      onMouseEnter={(e) => handleCardHover(e, true)}
      onMouseLeave={(e) => handleCardHover(e, false)}
    >
      <div className={`w-20 h-20 ${iconGradient} rounded-3xl flex items-center justify-center mb-6 shadow-xl`}>
        <span className="text-4xl">{icon}</span>
      </div>

      <h3 className="text-3xl max-sm:text-2xl font-bold text-[#1E293B] mb-4">
        {title}
      </h3>

      <p className="text-lg text-[#64748B] mb-6">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={`px-3 py-1 ${tagBg} ${tagColor} rounded-full text-sm font-medium`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SolutionCard;
