"use client";

import JobDetailsHeaderCard from "../components/JobDetailsHeaderCard";
import CompanyAboutCard from "../components/CompanyAboutCard";
import AiMatchCard from "../components/AiMatchCard";
import JobDescriptionCard from "../components/JobDescriptionCard";
import JobRequirementsCard from "../components/JobRequirementsCard";

function page() {
  return (
    <>
      <JobDetailsHeaderCard />
      <CompanyAboutCard />
      <AiMatchCard
        score={92}
        reasons={[
          "مهاراتك في React و Node.js تتطابق تماماً مع متطلبات الوظيفة",
          "لديك خبرة تزيد عن 5 سنوات ذات صلة",
          "موقعك يتطابق مع موقع الوظيفة (الرياض)",
          "خبرتك في تقنيات السحابة تتوافق مع الاحتياجات",
        ]}
      />

      <JobDescriptionCard
        title={" الوصف الوظيفي"}
        description="
نبحث عن مهندس برمجيات أول ذو خبرة للانضمام إلى فريقنا المبتكر في جوجل السعودية.
ستكون مسؤولاً عن تصميم وتطوير وصيانة تطبيقات قابلة للتوسع تخدم ملايين المستخدمين.
"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-10">
        <JobRequirementsCard
          title={"المتطلبات"}
          requirements={[
            "خبرة +5 سنوات في تطوير البرمجيات",
            "إتقان قوي لـ React و Node.js",
            "خبرة في منصات السحابة (AWS/GCP)",
            "مهارات ممتازة في حل المشكلات",
            "درجة البكالوريوس في علوم الحاسب أو مجال ذي صلة",
          ]}
        />

        <JobRequirementsCard
          title={"المسؤوليات"}
          requirements={[
            "تصميم وتطوير تطبيقات ويب قابلة للتوسع",
            "التعاون في فرق متعددة التخصصات",
            "توجيه المطورين المبتدئين",
            "المشاركة في مراجعة الأكواد",
            "المساهمة في التوثيق التقني",
          ]}
        />
      </div>
    </>
  );
}

export default page;
