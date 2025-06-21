import SolutionCard from "./SolutionCard";

const SolutionsSection = () => {
  const solutions = [
    {
      icon: "📤",
      title: "Tải file & tạo Mindmap",
      description: "Upload tài liệu, AI tạo mindmap tự động trong 30 giây",
      tags: ["PDF", "Word", "PowerPoint"],
      iconGradient: "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]",
      tagBg: "bg-[#EEF2FF]",
      tagColor: "text-[#6366F1]"
    },
    {
      icon: "🧩",
      title: "Sơ đồ tư duy thông minh",
      description: "Kết nối kiến thức logic, giao diện trực quan",
      tags: ["Tự động", "Chia sẻ", "Cộng tác"],
      iconGradient: "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]",
      tagBg: "bg-[#F3E8FF]",
      tagColor: "text-[#8B5CF6]"
    },
    {
      icon: "❓",
      title: "Bộ câu hỏi ôn tập",
      description: "AI tạo hàng nghìn câu hỏi đa dạng, độ khó tăng dần",
      tags: ["Trắc nghiệm", "Tự luận", "Phân tích"],
      iconGradient: "bg-gradient-to-r from-[#10B981] to-[#059669]",
      tagBg: "bg-[#ECFDF5]",
      tagColor: "text-[#10B981]"
    },
    {
      icon: "🃏",
      title: "Flashcard thông minh",
      description: "Spaced repetition, ghi nhớ lâu dài hiệu quả",
      tags: ["Khoa học", "Tự động", "Theo dõi"],
      iconGradient: "bg-gradient-to-r from-[#F59E0B] to-[#D97706]",
      tagBg: "bg-[#FFFBEB]",
      tagColor: "text-[#F59E0B]"
    }
  ];

  return (
    <section
      id="solutions"
      className="py-20 bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0]"
    >
      <div className="max-w-7xl mx-auto px-6 max-sm:px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl max-sm:text-3xl font-bold text-[#1E293B] mb-6">
            <span>Giải pháp đột phá từ </span>
            <span className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
              StudyMaster
            </span>
          </h2>
          <p className="text-xl max-sm:text-lg text-[#64748B] max-w-3xl mx-auto">
            Công nghệ AI tiên tiến giúp bạn học thông minh hơn
          </p>
        </div>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-12">
          {solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              icon={solution.icon}
              title={solution.title}
              description={solution.description}
              tags={solution.tags}
              iconGradient={solution.iconGradient}
              tagBg={solution.tagBg}
              tagColor={solution.tagColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SolutionsSection;
