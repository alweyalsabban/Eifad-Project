import JobDescriptionCard from "../../search-job/components/JobDescriptionCard";
import JobRequirementsCard from "../../search-job/components/JobRequirementsCard";

function page() {
  return (
    <div>
      <JobDescriptionCard
        title={" الوصف الوظيفي"}
        description="
    نبحث عن مهندس برمجيات أول ذو خبرة للانضمام إلى فريقنا المبتكر في جوجل السعودية.
    ستكون مسؤولاً عن تصميم وتطوير وصيانة تطبيقات قابلة للتوسع تخدم ملايين المستخدمين.
    "
      />

      <JobRequirementsCard
        title={"مخرجات هذه الخطوة"}
        requirements={[
          "خبرة +5 سنوات في تطوير البرمجيات",
          "إتقان قوي لـ React و Node.js",
          "خبرة في منصات السحابة (AWS/GCP)",
          "مهارات ممتازة في حل المشكلات",
          "درجة البكالوريوس في علوم الحاسب أو مجال ذي صلة",
        ]}
      />
    </div>
  );
}

export default page;
