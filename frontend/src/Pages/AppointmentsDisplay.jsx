import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../Assets/CustomerList.css';

const translations = {
  en: {
    title: "Customer List",
    home: "Home",
    appointments: "Appointments",
    about: "About Us",
    contact: "Contact Us",
    logout: "Logout",
    searchPlaceholder: "Search in all columns",
    sortBy: "Sort By",
    id: "ID",
    customerName: "Customer Name",
    carType: "Car Type",
    phoneNumber: "Phone Number",
    address: "Address",
    filterByCar: "Filter by Car",
    edit: "Edit",
    delete: "Delete",
    downloadRecords: "Download Records",
    previous: "Previous",
    next: "Next",
    error: "Error loading data",
    deleteConfirm: "Are you sure you want to delete this appointment?",
    saveSuccess: "Appointment updated successfully",
    deleteSuccess: "Appointment deleted successfully",
    errorOccurred: "An error occurred"
  },
  es: {
    title: "Lista de Clientes",
    home: "Inicio",
    appointments: "Citas",
    about: "Sobre Nosotros",
    contact: "Contáctenos",
    logout: "Cerrar Sesión",
    searchPlaceholder: "Buscar en todas las columnas",
    sortBy: "Ordenar Por",
    id: "ID",
    customerName: "Nombre del Cliente",
    carType: "Tipo de Coche",
    phoneNumber: "Número de Teléfono",
    address: "Dirección",
    filterByCar: "Filtrar por Coche",
    edit: "Editar",
    delete: "Eliminar",
    downloadRecords: "Descargar Registros",
    previous: "Anterior",
    next: "Siguiente",
    error: "Error al cargar datos",
    deleteConfirm: "¿Está seguro de que desea eliminar esta cita?",
    saveSuccess: "Cita actualizada exitosamente",
    deleteSuccess: "Cita eliminada exitosamente",
    errorOccurred: "Ocurrió un error"
}
};

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [search, setSearch] = useState("");
  const [filterCar, setFilterCar] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const rowsPerPage = 3;

  const translate = (key) => translations[currentLanguage][key] || key;

  // Fetch customers from the backend
  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:8080/appointments');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCustomers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    if (window.confirm(translate("deleteConfirm"))) {
      try {
        const response = await fetch(`http://localhost:8080/appointments/appointments/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setCustomers(customers.filter(customer => customer.id !== id));
          alert(translate("deleteSuccess"));
        } else {
          throw new Error('Failed to delete');
        }
      } catch (err) {
        alert(translate("errorOccurred"));
        console.error('Delete error:', err);
      }
    }
  };

  // Update customer
  const handleUpdate = async (customer) => {
    try {
      const response = await fetch(`http://localhost:8080/appointments/appointments/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      
      if (response.ok) {
        const updatedCustomers = customers.map(c => 
          c.id === customer.id ? customer : c
        );
        setCustomers(updatedCustomers);
        setEditingCustomer(null);
        alert(translate("saveSuccess"));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update');
      }
    } catch (err) {
      alert(translate("errorOccurred"));
      console.error('Update error:', err);
    }
  };

  // Filter and sort customers
  const filteredCustomers = customers
    .filter((customer) =>
      [customer.customerName, customer.carType, customer.phoneNumber, customer.address]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((customer) => (filterCar ? customer.carType === filterCar : true))
    .sort((a, b) => {
      if (!sortColumn) return 0;
      return a[sortColumn].localeCompare(b[sortColumn], undefined, { numeric: true });
    });

  const paginatedCustomers = filteredCustomers.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  // Export to CSV
  const handleExportCSV = () => {
    const csvContent = [
      ["ID", "Customer Name", "Car Type", "Phone Number", "Address"],
      ...customers.map((customer) =>
        [customer.id, customer.customerName, customer.carType, customer.phoneNumber, customer.address]
      ),
    ]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customer_list.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{translate("error")}: {error}</div>;

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/home">{translate("home")}</Link></li>
            <li><Link to="/appointments">{translate("appointments")}</Link></li>
            <li><Link to="/about">{translate("about")}</Link></li>
            <li><Link to="/contact">{translate("contact")}</Link></li>
            <li><Link to="/login">{translate("logout")}</Link></li>
          </ul>
        </nav>
      </header>
      
      <h1>{translate("title")}</h1>

      <div className="input-group1">
        <input
          type="text"
          placeholder={translate("searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setSortColumn(e.target.value)}>
          <option value="">{translate("sortBy")}</option>
          <option value="id">{translate("id")}</option>
          <option value="customerName">{translate("customerName")}</option>
          <option value="carType">{translate("carType")}</option>
          <option value="phoneNumber">{translate("phoneNumber")}</option>
          <option value="address">{translate("address")}</option>
        </select>
        <button onClick={handleExportCSV}>{translate("downloadRecords")}</button>
      </div>

      <div className="input-group1">
        <select onChange={(e) => setCurrentLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
        <select onChange={(e) => setFilterCar(e.target.value)}>
          <option value="">{translate("filterByCar")}</option>
          <option value="BMW">BMW</option>
          <option value="KIA">KIA</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>{translate("id")}</th>
            <th>{translate("customerName")}</th>
            <th>{translate("carType")}</th>
            <th>{translate("phoneNumber")}</th>
            <th>{translate("address")}</th>
            <th>{translate("edit")}</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              {editingCustomer?.id === customer.id ? (
                <>
                  <td>
                    <input
                      value={editingCustomer.customerName}
                      onChange={(e) => setEditingCustomer({
                        ...editingCustomer,
                        customerName: e.target.value
                      })}
                    />
                  </td>
                  <td>
                    <input
                      value={editingCustomer.carType}
                      onChange={(e) => setEditingCustomer({
                        ...editingCustomer,
                        carType: e.target.value
                      })}
                    />
                  </td>
                  <td>
                    <input
                      value={editingCustomer.phoneNumber}
                      onChange={(e) => setEditingCustomer({
                        ...editingCustomer,
                        phoneNumber: e.target.value
                      })}
                    />
                  </td>
                  <td>
                    <input
                      value={editingCustomer.address}
                      onChange={(e) => setEditingCustomer({
                        ...editingCustomer,
                        address: e.target.value
                      })}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(editingCustomer)}>Save</button>
                    <button onClick={() => setEditingCustomer(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{customer.customerName}</td>
                  <td>{customer.carType}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button onClick={() => setEditingCustomer(customer)}>
                      {translate("edit")}
                    </button>
                    <button onClick={() => handleDelete(customer.id)}>
                      {translate("delete")}
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          {translate("previous")}
        </button>
        <button
          disabled={(currentPage + 1) * rowsPerPage >= filteredCustomers.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          {translate("next")}
        </button>
      </div>
    </div>
  );
};

export default CustomerList;