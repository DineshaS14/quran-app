import React, { useEffect, useState } from 'react';

interface Edition {
    identifier : string;
    language: string;
    name: string;
    englishName: string;
    format: string;
    type: string;
    direction: string;
} // for the API call type strictliness

interface EditionProps {
    onEditionChange: (selectedEdition: string) => void; // Callback to notify parent
} // For parameter type strictliness

const Edition: React.FC<EditionProps> = ({ onEditionChange }) => {
    const [editions, setEditions] = useState<Edition[]>([]);
    const [selectedEdition, setSelectedEdition] = useState<string>(""); // Track selected edition locally
    // Fetch data from the API
    useEffect(() => {
      const fetchEditions = async () => {
        try {
          const response = await fetch('https://api.alquran.cloud/v1/edition');
          const data = await response.json();

          // Filter editions to only include those with language 'en'
          const filteredEditions = data.data.filter((edition: Edition) => edition.language === 'en');
          setEditions(filteredEditions);
        } catch (error) {
          console.error('Error fetching editions:', error);
       }
    };

      fetchEditions();
    }, []);
    // Handle dropdown value changes
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value; // Get the selected value from the combo box
    setSelectedEdition(selectedValue); // Update the local state
    onEditionChange(selectedValue); // Notify the parent of the change

    // Log for demonstration
    console.log(`Edition Component: Selected value changed to "${selectedValue}"`);
  };
    return (
        <div>
      <h1 className=''>This Part is Under Development</h1>

      {/* Dropdown to select edition */}
      <select value={selectedEdition} onChange={handleSelectChange}>
        <option value="">Select an edition</option>
        {editions.map((edition) => (
          <option key={edition.identifier} value={edition.identifier}>
            {edition.englishName || edition.name}
          </option>
        ))}
      </select>
    </div>
    );
};
export default Edition;