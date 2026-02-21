import Header from "../homePage/components/Header";
import Footer from "../homePage/components/Footer";
import SearchSection from "./components/SearchSection";
import ResultSearchSection from "./components/ResultSearchSection";

function JobsPage() {
  return (
    <>
      <Header />
      <SearchSection />
      <ResultSearchSection />
      <Footer />
    </>
  );
}

export default JobsPage;
