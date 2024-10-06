import { useState, useEffect } from 'react';

type UserFormProps = {
  user?: User | null;
  onSubmit: (user: User) => void;
  onClose: () => void;
};

type Errors = {
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
  address: string;
  company: string;
}

function UserForm({ user, onSubmit, onClose }: UserFormProps) {
  const [formData, setFormData] = useState<User>({
    address: {
      city: '',
      geo: {
        lat: '',
        lng: '',
      },
      street: '',
      suite: '',
      zipcode: '',
    },
    company: {
      bs: '',
      catchPhrase: '',
      name: '',
    },
    email: '',
    id: 0,
    name: '',
    phone: '',
    username: '',
    website: '',
  });
  const [errors, setErrors] = useState<Errors>({
    name: '',
    email: '',
    phone: '',
    username: '',
    website: '',
    address: '',
    company: '',
  });

  useEffect(() => {
    if (user) {
      // Populate form data if editing an existing user
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        username: user.username || '',
        website: user.website || '',
        address: {
          street: user.address.street || '',
          suite: user.address.suite || '',
          city: user.address.city || '',
          zipcode: user.address.zipcode || '',
          geo: {
            lat: user.address.geo.lat || '',
            lng: user.address.geo.lng || '',
          },
        },
        company: {
          name: user.company.name || '',
          catchPhrase: user.company.catchPhrase || '',
          bs: user.company.bs || '',
        },
        id: user.id,
      });
    } else {
      // Generate username for new user
      setFormData(prev => ({
        ...prev,
        username: `USER-${prev.name.toLowerCase().replace(/\s/g, '')}`
      }));
    }
  }, [user]);

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === 'street') setFormData(prev => ({ ...prev, address: { ...prev.address, street: value } }));
    else if(name === 'city') setFormData(prev => ({ ...prev, address: { ...prev.address, city: value } }));
    else if(name === 'companyName') setFormData(prev => ({ ...prev, company: { ...prev.company, name: value } }));
    else setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'name' && !user) {
      // Update username when name changes for new users
      setFormData(prev => ({
        ...prev,
        username: `USER-${value.toLowerCase().replace(/\s/g, '')}`
      }));
    }
  };

  const validateForm = () => {
    let newErrors : Errors = {
      name: '',
      email: '',
      phone: '',
      username: '',
      website: '',
      address: '',
      company: '',
    };
    if (formData.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (formData.website && !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(formData.website)) newErrors.website = 'Website is invalid';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.address.street) newErrors.address = 'Address - Street is required';
    if (!formData.address.city) newErrors.address = 'Address - City is required';
    if (formData.company.name && formData.company.name.length < 3) newErrors.company = 'Company Name is required';
    setErrors(newErrors);
    console.log(Object.keys(newErrors).some((error) => newErrors[error as keyof Errors] !== ''));
    return !Object.keys(newErrors).some((error) => newErrors[error as keyof Errors] !== '');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h2 className="text-lg font-bold mb-4">{user ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.website && <p className="text-red-500 text-xs italic">{errors.website}</p>}
          </div>
          <h3 className="text-lg font-bold mb-4">Address</h3>
          <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.address.street}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
          </div>
          <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.address.city}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
          </div>
          <h3 className='text-lg font-bold mb-4'>Company</h3>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="companyName">
              Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.company.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.company && <p className="text-red-500 text-xs italic">{errors.company}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {user ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;