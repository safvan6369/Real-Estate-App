import React, { useState, useEffect, useMemo } from 'react';

// --- MOCK DATA ---
// In a real application, this would come from an API.
// Added realistic Chennai locations.
const propertyData = [
  {
    id: 1,
    title: 'Luxury Villa in ECR',
    address: 'East Coast Road, Chennai, Tamil Nadu',
    price: 35000000,
    bedrooms: 5,
    bathrooms: 5,
    area: 4500,
    type: 'Villa',
    imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A stunning sea-facing villa with a private pool and garden. Located in the serene locality of ECR, perfect for a luxurious lifestyle.'
  },
  {
    id: 2,
    title: 'Modern 3BHK Apartment in Adyar',
    address: 'Gandhi Nagar, Adyar, Chennai, Tamil Nadu',
    price: 18000000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1800,
    type: 'Apartment',
    imageUrl: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A spacious and well-ventilated apartment in the heart of Adyar. Comes with premium fittings, a modular kitchen, and 24/7 security.'
  },
  {
    id: 3,
    title: 'Cozy 2BHK in Velachery',
    address: 'Taramani Link Road, Velachery, Chennai, Tamil Nadu',
    price: 8500000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    type: 'Apartment',
    imageUrl: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A compact and affordable 2BHK flat, perfect for small families. Close to IT parks, schools, and shopping malls.'
  },
  {
    id: 4,
    title: 'Independent House in Anna Nagar',
    address: '4th Avenue, Anna Nagar, Chennai, Tamil Nadu',
    price: 25000000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3000,
    type: 'House',
    imageUrl: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A beautiful independent house with a spacious backyard and covered parking. Located in a prime, well-connected residential area.'
  },
  {
    id: 5,
    title: 'Penthouse with Terrace Garden',
    address: 'OMR, Chennai, Tamil Nadu',
    price: 22000000,
    bedrooms: 3,
    bathrooms: 4,
    area: 2500,
    type: 'Penthouse',
    imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Experience panoramic city views from this exclusive penthouse. Features a private terrace garden, jacuzzi, and smart home automation.'
  },
  {
    id: 6,
    title: 'Compact Studio Apartment in T. Nagar',
    address: 'Usman Road, T. Nagar, Chennai, Tamil Nadu',
    price: 6000000,
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    type: 'Apartment',
    imageUrl: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A modern studio apartment ideal for bachelors or young professionals. Located in the bustling commercial hub of T. Nagar.'
  },
  {
    id: 7,
    title: 'Traditional Villa in Mylapore',
    address: 'North Mada Street, Mylapore, Chennai, Tamil Nadu',
    price: 40000000,
    bedrooms: 6,
    bathrooms: 5,
    area: 5000,
    type: 'Villa',
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A grand traditional villa with intricate woodwork and a central courtyard. Experience the cultural richness of Mylapore.'
  },
  {
    id: 8,
    title: 'Gated Community Villa in Sholinganallur',
    address: 'Sholinganallur, OMR, Chennai, Tamil Nadu',
    price: 19500000,
    bedrooms: 4,
    bathrooms: 4,
    area: 2800,
    type: 'Villa',
    imageUrl: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A contemporary villa within a secure gated community. Access to clubhouse, swimming pool, and other modern amenities. Close to IT corridor.'
  }
];

// --- SVG ICONS ---
// Using inline SVGs for icons to keep it a single file.
const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500"><path d="M2 4v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4"/><path d="M2 10h20"/><path d="M10 4v6"/><path d="M14 4v6"/></svg>
);

const BathIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500"><path d="m12 5-1.41 1.41a2 2 0 0 1-2.82 0L6 5"/><path d="M12 19l1.41-1.41a2 2 0 0 1 2.82 0L18 19"/><path d="M17 21H7a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2Z"/><path d="M21 15V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8"/></svg>
);

const AreaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-500"><path d="M3 3v18h18"/><path d="M3 11h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H3"/><path d="M11 21v-8a2 2 0 0 0-2-2H3"/></svg>
);


// --- COMPONENTS ---

const Header = () => (
  <header className="bg-white shadow-md sticky top-0 z-20">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
        <span className="text-blue-600">Dream</span>Home
      </h1>
      <nav>
        <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">For Sale</a>
        <a href="#" className="ml-6 text-gray-600 hover:text-blue-600 font-medium">For Rent</a>
        <a href="#" className="ml-6 text-gray-600 hover:text-blue-600 font-medium">About Us</a>
      </nav>
    </div>
  </header>
);

const SearchBar = ({ filters, setFilters, locations, propertyTypes }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <section className="bg-gray-100 py-6">
      <div className="container mx-auto px-6">
        <div className="bg-white p-4 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <div className="flex flex-col">
            <label htmlFor="location" className="text-sm font-medium text-gray-500 mb-1">Location</label>
            <select
              id="location"
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Locations</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium text-gray-500 mb-1">Price Range</label>
            <select
              id="price"
              name="price"
              value={filters.price}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Any Price</option>
              <option value="0-10000000">Up to ₹1 Crore</option>
              <option value="10000000-20000000">₹1 Crore - ₹2 Crore</option>
              <option value="20000000-Infinity">Above ₹2 Crore</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="bedrooms" className="text-sm font-medium text-gray-500 mb-1">Bedrooms</label>
            <select
              id="bedrooms"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="type" className="text-sm font-medium text-gray-500 mb-1">Property Type</label>
            <select
              id="type"
              name="type"
              value={filters.type}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
               {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

const PropertyCard = ({ property, onSelect }) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      onClick={() => onSelect(property)}
    >
      <img src={property.imageUrl} alt={property.title} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate">{property.title}</h3>
        <p className="text-sm text-gray-600 mb-2 truncate">{property.address}</p>
        <p className="text-2xl font-semibold text-blue-600 mb-4">{formattedPrice}</p>
        <div className="flex justify-between items-center text-sm text-gray-700 border-t pt-3">
          <div className="flex items-center space-x-1">
            <BedIcon />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center space-x-1">
            <BathIcon />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center space-x-1">
            <AreaIcon />
            <span>{property.area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};


const PropertyList = ({ properties, onSelectProperty }) => (
  <div className="container mx-auto px-6 py-8">
     {properties.length > 0 ? (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} />
        ))}
      </div>
     ) : (
      <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-700">No Properties Found</h2>
          <p className="text-gray-500 mt-2">Try adjusting your search filters to find your dream home.</p>
      </div>
     )}
  </div>
);

const PropertyDetailsModal = ({ property, onClose }) => {
  if (!property) return null;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <img src={property.imageUrl} alt={property.title} className="w-full h-64 md:h-80 object-cover rounded-t-lg" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-700 hover:bg-gray-200 transition">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold text-gray-900">{property.title}</h2>
            <p className="text-md text-gray-600 mt-1">{property.address}</p>
            <p className="text-4xl font-bold text-blue-600 my-4">{formattedPrice}</p>
             <div className="flex flex-wrap gap-4 text-center my-6 border-y py-4">
                <div className="flex-1 min-w-[100px]">
                    <div className="text-gray-500 text-sm">Bedrooms</div>
                    <div className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2 mt-1"><BedIcon /> {property.bedrooms}</div>
                </div>
                <div className="flex-1 min-w-[100px]">
                    <div className="text-gray-500 text-sm">Bathrooms</div>
                    <div className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2 mt-1"><BathIcon /> {property.bathrooms}</div>
                </div>
                <div className="flex-1 min-w-[100px]">
                    <div className="text-gray-500 text-sm">Area (sqft)</div>
                    <div className="text-xl font-semibold text-gray-800 flex items-center justify-center gap-2 mt-1"><AreaIcon /> {property.area}</div>
                </div>
                <div className="flex-1 min-w-[100px]">
                    <div className="text-gray-500 text-sm">Type</div>
                    <div className="text-xl font-semibold text-gray-800 mt-1">{property.type}</div>
                </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{property.description}</p>

            <div className="mt-8 text-center">
              <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">Contact Agent</button>
            </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
    <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-6 py-4 text-center">
            <p>&copy; {new Date().getFullYear()} DreamHome Real Estate. All rights reserved.</p>
        </div>
    </footer>
)


// --- MAIN APP COMPONENT ---

export default function App() {
  const [filters, setFilters] = useState({
    location: '',
    price: 'all',
    bedrooms: 'all',
    type: ''
  });

  const [filteredProperties, setFilteredProperties] = useState(propertyData);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Memoize unique locations and property types to avoid recalculating on every render
  const locations = useMemo(() => [...new Set(propertyData.map(p => p.address.split(', ')[1]))], []);
  const propertyTypes = useMemo(() => [...new Set(propertyData.map(p => p.type))], []);


  useEffect(() => {
    let result = propertyData;

    // Location filter
    if (filters.location) {
        result = result.filter(p => p.address.includes(filters.location));
    }
    
    // Property Type filter
    if (filters.type) {
      result = result.filter(p => p.type === filters.type);
    }

    // Price filter
    if (filters.price !== 'all') {
        const [min, max] = filters.price.split('-').map(Number);
        result = result.filter(p => p.price >= min && p.price <= (max || Infinity));
    }
    
    // Bedrooms filter
    if (filters.bedrooms !== 'all') {
        const minBeds = parseInt(filters.bedrooms);
        if (minBeds === 4) { // Handle 4+ case
            result = result.filter(p => p.bedrooms >= minBeds);
        } else {
            result = result.filter(p => p.bedrooms === minBeds);
        }
    }

    setFilteredProperties(result);
  }, [filters]);

  // Effect to handle body scroll when modal is open
  useEffect(() => {
    if (selectedProperty) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProperty]);


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <SearchBar filters={filters} setFilters={setFilters} locations={locations} propertyTypes={propertyTypes} />
        <PropertyList properties={filteredProperties} onSelectProperty={setSelectedProperty} />
      </main>
      <Footer />
      <PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </div>
  );
}