import { useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export const App = () => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const data = ["Россия", "Франция", "Германия", "Италия"];
  

  const showDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    
    const awayDropdown = (event: MouseEvent) => {
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', awayDropdown)

    return () => removeEventListener('click', awayDropdown)
  }, [])

  return (
    <header className="h-15 bg-[#00BFFF] flex items-center pl-50 relative">
      <RiArrowDropDownLine
        size={35}
        color="white"
        className={`cursor-pointer ${isOpen ? 'rotate-180': ''}`}
        onClick={showDropdown}
      />
      {isOpen && (
        <div className="bg-[white] absolute top-10 left-31 shadow-md rounded-[3px]" ref={dropdownRef}>
          {data.map((country, index) => (
            <p className="pl-3 pr-3 pb-0.5 first:pt-1 last:pb-1 cursor-pointer" key={index}>
              {country}
            </p>
          ))}
        </div>
      )}
    </header>
  );
};
