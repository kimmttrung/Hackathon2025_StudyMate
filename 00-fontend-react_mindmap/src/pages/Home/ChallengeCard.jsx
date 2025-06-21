

const ChallengeCard = ({ icon, title, description, bgGradient, borderColor, iconGradient }) => {
    const handleCardHover = (e, isEntering, rotation) => {
        if (isEntering) {
            e.target.style.transform = `translateY(-8px) rotate(${rotation}deg)`;
            e.target.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.15)';
        } else {
            e.target.style.transform = 'translateY(0) rotate(0deg)';
            e.target.style.boxShadow = 'none';
        }
    };

    return (
        <div
            className={`${bgGradient} p-8 rounded-3xl border ${borderColor} transition-all duration-300`}
            onMouseEnter={(e) => handleCardHover(e, true, Math.random() > 0.5 ? 1 : -1)}
            onMouseLeave={(e) => handleCardHover(e, false, 0)}
        >
            <div className={`w-16 h-16 ${iconGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <span className="text-3xl">{icon}</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1E293B] mb-4">
                {title}
            </h3>
            <p className="text-[#64748B] leading-relaxed">
                {description}
            </p>
        </div>
    );
}

export default ChallengeCard;
