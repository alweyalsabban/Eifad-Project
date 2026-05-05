"use client";

import { forwardRef } from "react";

const ResumePage = forwardRef(function ResumePage({ CVInfo, Profile }, ref) {
  const personal = {
    name: Profile?.FullName,
    title: CVInfo?.Title,
    phone: Profile?.Phone,
    email: Profile?.Email,
    location: Profile?.Location,
    summary: CVInfo?.PersonalSummary,
  };

  const experience = CVInfo?.experiences ?? [];
  const education = CVInfo?.education ?? [];
  const languages = CVInfo?.languages ?? [];
  const skills = CVInfo?.skills ?? [];
  const certifications = CVInfo?.certifications ?? [];

  return (
    <div className="w-full p-10" dir="rtl" ref={ref}>
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
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">
                المهارات
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.SkillID}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium"
                  >
                    {skill.skill.SkillName}
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
                  <div key={item.EducationID}>
                    <h3 className="text-sm font-semibold">{item.DegreeName}</h3>
                    <p className="mt-1 text-sm text-neutral-300">
                      {item.Institution}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {item.GraduationYear}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <br />

            <section>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-neutral-400">
                اللغات
              </h2>
              <div className="space-y-4">
                {languages.map((item) => (
                  <div key={item.LanguageID}>
                    <h3 className="text-sm font-semibold">
                      {item.language.LanguageName}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-300">
                      {item.LanguageLevel}
                    </p>
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
                {experience.map((job) => (
                  <article key={job.ExperienceID}>
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold">
                          {job.Responsibilities}
                        </h3>
                        <p className="text-sm font-medium text-neutral-600">
                          {job.CompanyName}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-semibold text-neutral-500">
                        {job.StartDate?.slice(0, 7)} حتى{" "}
                        {job?.EndDate?.slice(0, 7) || "الآن"}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            {certifications.length > 0 && (
              <section className="mb-8 border-b border-neutral-200 pb-6">
                <h2 className="mb-5 text-xl font-bold">الدورات و الشهادات</h2>
                <div className="space-y-5">
                  {certifications.map((certi) => (
                    <article key={certi.CertificationID}>
                      <h3 className="text-base font-bold">
                        {certi.CertificateName}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-neutral-700">
                        {certi.IssuingOrganization}
                      </p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {CVInfo?.custom_sections?.length > 0 &&
              CVInfo?.custom_sections?.map((item) => (
                <section
                  className="mb-8 border-b border-neutral-200 pb-6"
                  key={item.CustomSectionID}
                >
                  <h2 className="mb-5 text-xl font-bold">{item.Title}</h2>

                  <div className="space-y-5">
                    {Object.values(item.content_data || {}).map(
                      (value, index) => (
                        <article key={index}>
                          <h3 className="text-base font-bold">
                            {String(value)}
                          </h3>
                        </article>
                      ),
                    )}
                  </div>
                </section>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
});

export default ResumePage;
