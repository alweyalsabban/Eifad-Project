"use client";

import { Building2, FileText } from "lucide-react";
import ModalShell from "./ModalShell";

type Company = {
  name: string;
  registrationNumber: string;
  industry: string;
  employees: string;
  website: string;
  documents: { id: number; name: string }[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  company: Company;
};

export default function CompanyProfileModal({ open, onClose, company }: Props) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={company.name}
      icon={<Building2 size={18} />}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-sm">
        <div>
          <p className="text-gray-500">رقم التسجيل</p>
          <p className="font-semibold">{company.registrationNumber}</p>
        </div>

        <div>
          <p className="text-gray-500">Industry</p>
          <p className="font-semibold">{company.industry}</p>
        </div>

        <div>
          <p className="text-gray-500">Website</p>
          <a
            href={company.website}
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            {company.website}
          </a>
        </div>

        <div>
          <p className="text-gray-500">Employees</p>
          <p className="font-semibold">{company.employees}</p>
        </div>
      </div>

      {/* Documents */}
      <div className="mt-6">
        <p className="mb-3 text-sm text-gray-500">المستندات</p>

        <div className="space-y-2">
          {company.documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
            >
              <FileText size={16} />
              <span className="text-sm">{doc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </ModalShell>
  );
}
