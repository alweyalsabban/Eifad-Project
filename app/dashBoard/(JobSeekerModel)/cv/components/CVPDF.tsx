export default function ResumePage() {
  const personal = {
    name: "اسمك الكامل",
    title: "Frontend Developer | Next.js Developer",
    phone: "+967 7XX XXX XXX",
    email: "you@example.com",
    location: "اليمن - عدن",
    website: "portfolio.com",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
    summary:
      "مطور واجهات أمامية متخصص في بناء تطبيقات ويب حديثة باستخدام Next.js و React، مع اهتمام كبير بالأداء وتجربة المستخدم وبناء واجهات قابلة للتوسع والطباعة بشكل احترافي.",
  };

  const experience = [
    {
      role: "Next.js Developer",
      company: "اسم الشركة",
      period: "2023 - الآن",
      points: [
        "تطوير تطبيقات ويب حديثة باستخدام Next.js و TypeScript.",
        "تحسين الأداء ورفع Core Web Vitals وتقليل زمن التحميل.",
        "بناء مكونات UI قابلة لإعادة الاستخدام وتدعم التوسع.",
      ],
    },
    {
      role: "Frontend Developer",
      company: "اسم الشركة السابقة",
      period: "2021 - 2023",
      points: [
        "تنفيذ صفحات responsive متوافقة مع مختلف الأجهزة.",
        "ربط الواجهات مع REST APIs وإدارة الحالة داخل التطبيق.",
        "التعاون مع فرق التصميم والباكند لتسليم الميزات بجودة عالية.",
      ],
    },
  ];

  const education = [
    {
      degree: "بكالوريوس تقنية معلومات",
      school: "اسم الجامعة",
      period: "2017 - 2021",
    },
  ];

  const skills = [
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML",
    "CSS",
    "REST API",
    "Git",
    "Responsive Design",
  ];

  const projects = [
    {
      name: "لوحة تحكم إدارية",
      description:
        "بناء لوحة تحكم باستخدام Next.js مع صفحات ديناميكية، جداول، وإدارة صلاحيات المستخدمين.",
    },
    {
      name: "موقع شركة احترافي",
      description:
        "تطوير موقع سريع ومتجاوب يدعم SEO والتصدير والطباعة بجودة عالية.",
    },
  ];

  return (
    <div className="w-full p-10">
      <div className="mx-auto w-full max-w-[210mm] overflow-hidden rounded-3xl bg-white shadow-2xl print:max-w-none print:rounded-none print:shadow-none">
        <div className="grid min-h-[297mm] grid-cols-1 md:grid-cols-[320px_1fr] print:min-h-0 print:grid-cols-[320px_1fr]">
          <aside className="bg-neutral-900 px-8 py-10 text-white print:px-7 print:py-8">
            <div className="mb-8 border-b border-white/15 pb-6">
              <h1 className="text-3xl font-extrabold tracking-tight">
                {personal.name}
              </h1>
              <p className="mt-2 text-sm font-medium text-neutral-300">
                {personal.title}
              </p>
            </div>

            <section className="mb-8">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">
                معلومات التواصل
              </h2>
              <div className="space-y-2 text-sm leading-6 text-neutral-200">
                <p>{personal.phone}</p>
                <p>{personal.email}</p>
                <p>{personal.location}</p>
                <p>{personal.website}</p>
                <p>{personal.linkedin}</p>
                <p>{personal.github}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">
                المهارات
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">
                التعليم
              </h2>
              <div className="space-y-4">
                {education.map((item) => (
                  <div key={item.degree}>
                    <h3 className="text-sm font-semibold">{item.degree}</h3>
                    <p className="mt-1 text-sm text-neutral-300">
                      {item.school}
                    </p>
                    <p className="text-xs text-neutral-400">{item.period}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          <section className="px-8 py-10 text-neutral-800 print:px-7 print:py-8">
            <section className="mb-8 border-b border-neutral-200 pb-6">
              <h2 className="mb-4 text-xl font-bold">الملخص المهني</h2>
              <p className="text-sm leading-7 text-neutral-700">
                {personal.summary}
              </p>
            </section>

            <section className="mb-8 border-b border-neutral-200 pb-6">
              <h2 className="mb-5 text-xl font-bold">الخبرات العملية</h2>
              <div className="space-y-6">
                {experience.map((job, index) => (
                  <article key={index}>
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold">{job.role}</h3>
                        <p className="text-sm font-medium text-neutral-600">
                          {job.company}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-neutral-500">
                        {job.period}
                      </span>
                    </div>
                    <ul className="list-inside list-disc space-y-1 text-sm leading-7 text-neutral-700 marker:text-neutral-400">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="mb-8 border-b border-neutral-200 pb-6">
              <h2 className="mb-5 text-xl font-bold">المشاريع</h2>
              <div className="space-y-5">
                {projects.map((project) => (
                  <article key={project.name}>
                    <h3 className="text-base font-bold">{project.name}</h3>
                    <p className="mt-2 text-sm leading-7 text-neutral-700">
                      {project.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  );
}
