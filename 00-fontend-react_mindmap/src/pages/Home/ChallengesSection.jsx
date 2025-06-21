import ChallengeCard from "./ChallengeCard";


const ChallengesSection = () => {
  const challenges = [
    {
      icon: "😰",
      title: "Ôn tập cuối kỳ áp lực",
      description: "Thời gian ít, kiến thức nhiều, không biết ưu tiên nội dung nào",
      bgGradient: "bg-gradient-to-br from-[#FEF2F2] to-[#FECACA]",
      borderColor: "border-[#FCA5A5]",
      iconGradient: "bg-gradient-to-r from-[#EF4444] to-[#DC2626]"
    },
    {
      icon: "📚",
      title: "Ôn tập kiểm tra bừa bãi",
      description: "Học thuộc lòng không hiểu bản chất, quên nhanh",
      bgGradient: "bg-gradient-to-br from-[#FFFBEB] to-[#FED7AA]",
      borderColor: "border-[#FDBA74]",
      iconGradient: "bg-gradient-to-r from-[#F59E0B] to-[#D97706]"
    },
    {
      icon: "🗺️",
      title: "Thiếu lộ trình rõ ràng",
      description: "Không có kế hoạch cụ thể, học lung tung",
      bgGradient: "bg-gradient-to-br from-[#F3E8FF] to-[#DDD6FE]",
      borderColor: "border-[#C4B5FD]",
      iconGradient: "bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED]"
    },
    {
      icon: "🧠",
      title: "Khó ghi nhớ lâu dài",
      description: "Học xong quên ngay, không có phương pháp hiệu quả",
      bgGradient: "bg-gradient-to-br from-[#ECFDF5] to-[#BBF7D0]",
      borderColor: "border-[#86EFAC]",
      iconGradient: "bg-gradient-to-r from-[#10B981] to-[#059669]"
    }
  ];

  return (
    <section id="challenges" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 max-sm:px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl max-sm:text-3xl font-bold text-[#1E293B] mb-6">
            Những thách thức khi ôn tập
          </h2>
          <p className="text-xl max-sm:text-lg text-[#64748B] max-w-3xl mx-auto">
            Nhiều sinh viên gặp khó khăn trong việc ôn tập hiệu quả
          </p>
        </div>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-8">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={index}
              icon={challenge.icon}
              title={challenge.title}
              description={challenge.description}
              bgGradient={challenge.bgGradient}
              borderColor={challenge.borderColor}
              iconGradient={challenge.iconGradient}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ChallengesSection;
