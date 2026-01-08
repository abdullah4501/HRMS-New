import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
}

const allFeatures: SearchResult[] = [
  { id: "1", title: "Pay a Bonus", description: "Process bonus payments for employees", category: "Payroll" },
  { id: "2", title: "Pay Employees", description: "Run regular payroll for all employees", category: "Payroll" },
  { id: "3", title: "Payroll Reports", description: "View and download payroll reports", category: "Reports" },
  { id: "4", title: "Add Employee", description: "Onboard a new team member", category: "HR" },
  { id: "5", title: "Time Off Requests", description: "Manage employee time off", category: "HR" },
  { id: "6", title: "Benefits Enrollment", description: "Manage employee benefits", category: "Benefits" },
  { id: "7", title: "Directory", description: "View all company employees", category: "Directory" },
  { id: "8", title: "Post a Job", description: "Create new job listings", category: "Recruiting" },
  { id: "9", title: "Doc Vault", description: "Access company documents", category: "Documents" },
  { id: "10", title: "Exclusive Perks", description: "View employee perks and discounts", category: "Benefits" },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = allFeatures.filter(
        (feature) =>
          feature.title.toLowerCase().includes(query.toLowerCase()) ||
          feature.description.toLowerCase().includes(query.toLowerCase()) ||
          feature.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder='Search for "pay a bonus"'
          className="w-full h-12 pl-11 pr-4 rounded-full bg-dashboard-search-bg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl shadow-xl border border-border overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-2">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => {
                  setQuery(result.title);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Search size={14} className="text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground">{result.title}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {result.description}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {result.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background rounded-xl shadow-xl border border-border p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <p className="text-muted-foreground text-center">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
