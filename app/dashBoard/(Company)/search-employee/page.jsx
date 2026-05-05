"use client";

import JobSearchBar from "./components/JobSearchBar";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { NamePageContex } from "../../(JobSeekerModel)/context/NamePageContext";
import CandidateSimpleCard from "./components/CandidateSimpleCard";
import { Profile } from "../callFunctionsForCompany";
import { useSearchParams } from "next/navigation";
function buildQuery({ search, location, page }) {
  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (location) params.set("location", location);

  params.set("page", page);
  params.set("per_page", "10");

  // غيّر هذا الرابط عندما تضيف API الحقيقي
  return `/job-seekers?${params.toString()}`;
}

function SearchEmployee() {
  const { setnameOfSideBar, setnumberOfSideBar } = useContext(NamePageContex);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
  });

  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q") || "";

    setFilters((prev) => ({
      ...prev,
      search: q,
    }));
    setnameOfSideBar("البحث عن موظفين");
    setnumberOfSideBar(5);
  }, [setnameOfSideBar, setnumberOfSideBar, searchParams]);

  async function fetchEmployees(pageNumber = 1, reset = false) {
    if (loading) return;
    setLoading(true);

    try {
      const url = buildQuery({
        search: filters.search,
        location: filters.location,
        page: pageNumber,
      });

      const response = await Profile("SearchEmployees", url);

      const list = Array.isArray(response)
        ? response
        : (response?.data ?? response?.items ?? []);

      const meta = response?.meta ?? response;

      setEmployees((prev) => (reset ? list : [...prev, ...list]));

      const currentPage = meta?.current_page ?? pageNumber;
      const lastPage = meta?.last_page ?? pageNumber;

      setHasMore(currentPage < lastPage || list.length === 10);
    } catch (error) {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setEmployees([]);
      setHasMore(true);
      fetchEmployees(1, true);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search, filters.location]);

  useEffect(() => {
    if (page === 1) return;
    fetchEmployees(page, false);
  }, [page]);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const empty = useMemo(
    () => !loading && employees.length === 0,
    [loading, employees.length],
  );

  return (
    <div className="w-[98%] mx-auto mb-40">
      <JobSearchBar filters={filters} setFilters={setFilters} />

      {empty ? (
        <div className="mt-8 text-center text-slate-500">
          لا يوجد موظفون مطابقون للبحث.
        </div>
      ) : (
        employees.map((employee, index) => (
          <CandidateSimpleCard key={index} employee={employee} />
        ))
      )}

      {loading && (
        <div className="mt-6 text-center text-slate-500">
          جاري تحميل الموظفين...
        </div>
      )}

      <div ref={observerRef} className="h-10" />
    </div>
  );
}

export default SearchEmployee;
