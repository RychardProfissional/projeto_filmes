import { useEffect, useRef, useState } from "react";

export function InputBase({ label, type = 'text', name, defaultValue, className, error, ...props }) {
    return (
        <label className={`flex flex-col gap-1 bg-white rounded-lg ${className}`}>
            <span className="text-sm text-gray-500">{label}:</span>
            <input
                type={type}
                name={name}
                defaultValue={defaultValue}
                className={`px-2 border-2 border-gray-200 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
                {...props}
            />
            {<span className={`text-sm text-red-500 h-3 ${error? "": "opacity-0"}`}>{error}</span>}
        </label>
    );
}

export function InputTextArea({ label, name, defaultValue, className, error, ...props }) {
  return (
      <label className={`flex flex-col gap-1 ${className}`}>
          <span className="text-sm text-gray-700">{label}:</span>
          <textarea
              name={name}
              defaultValue={defaultValue}
              className={`w-full p-1 border-2 border-gray-200 rounded-lg resize-none peer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
              {...props}
          />
          {<span className={`text-sm text-red-500 h-3 ${error? "": "opacity-0"}`}>{error}</span>}
      </label>
  );
}

export function InputSelect({ label, name, options, defaultValue, className, error, ...props }) {
  return (
      <label className={`flex flex-col gap-1 ${className}`}>
          <span className="text-sm text-gray-700">{label}:</span>
          <select
              name={name}
              defaultValue={defaultValue}
              className={`w-full px-2 py-1 border-2 border-gray-200 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''}`}
              {...props}
          >
              {options.map(({ label: optionLabel, value }, index) => (
                  <option key={index} value={value}>
                      {optionLabel}
                  </option>
              ))}
          </select>
          {<span className={`text-sm text-red-500 h-3 ${error? "": "opacity-0"}`}>{error}</span>}
      </label>
  );
}

export function InputDate({ label, name, defaultValue, className, error, ...props }) {
  const formattedDefaultValue = defaultValue ? new Date(defaultValue).toISOString().split('T')[0] : '';

  return (
      <label className={`flex flex-col gap-1 ${className}`}>
          <span className="text-sm text-gray-700">{label}:</span>
          <input
              type="date"
              name={name}
              defaultValue={formattedDefaultValue}
              className={`px-2 border-2 border-gray-200 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
              {...props}
          />
          {<span className={`text-sm text-red-500 h-3 ${error? "": "opacity-0"}`}>{error}</span>}
      </label>
  );
}

export function InputNumber({ label, name, defaultValue, className, error, ...props }) {
  const handleInputChange = (event) => {
      const { value } = event.target;
      event.target.value = value.replace(/[^0-9.]/g, '');
  };

  return (
      <label className={`flex flex-col gap-1 ${className}`}>
          <span className="text-sm text-gray-700">{label}:</span>
          <input
              type="text"
              name={name}
              defaultValue={defaultValue}
              className={`px-2 border-2 border-gray-200 rounded-lg peer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
              onInput={handleInputChange}
              {...props}
          />
          {<span className={`text-sm text-red-500 h-3 ${error? "": "opacity-0"}`}>{error}</span>}
      </label>
  );
}

export function InputMultiSelect({ options = [], label, className, name, defaultValue = [], error, ...props }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
      setSelectedOptions(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
              setIsOpen(false);
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionChange = (value) => {
      setSelectedOptions((prev) => 
          prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
  };

  return (
      <div className={`relative ${className}`} ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700">{label}:</label>
          <button
              type="button"
              onClick={toggleDropdown}
              className="w-full p-2 text-left border"
              {...props}
          >
              Selecione os gêneros
          </button>
          {isOpen && (
              <div className="absolute w-full mt-1 bg-white border">
                  {options.map(({ label, value }) => (
                      <label key={value} className="flex items-center p-2">
                          <input
                              type="checkbox"
                              name={name}
                              value={value}
                              checked={selectedOptions.includes(value)}
                              onChange={() => handleOptionChange(value)}
                          />
                          {label}
                      </label>
                  ))}
              </div>
          )}
          {}
          <input type="hidden" name={name} value={JSON.stringify(selectedOptions)} />
          <span className={`text-sm text-red-500 h-3 ${error ? "" : "opacity-0"}`}>{error}</span>
      </div>
  );
}

