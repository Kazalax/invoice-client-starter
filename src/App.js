/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PersonIndex from "./persons/PersonIndex";
import PersonDetail from "./persons/PersonDetail";
import PersonForm from "./persons/PersonForm";

import StatisticsIndex from "./statistics/StatisticsIndex";

import InvoiceDetail from "./invoices/InvoiceDetails";
import InvoiceIndex from "./invoices/InvoiceIndex";
import InvoiceForm from "./invoices/InvoiceForm"

function App() {
  return (
    <Router>
    <div className="container">
      {/* Navbar placed at the top */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
        <Link className="navbar-brand" to="/">
          Účetní aplikace
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/persons" className="nav-link">
                Osoby
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/invoices" className="nav-link">
                Faktury
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/invoices/statistics" className="nav-link">
                Statistiky
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main content with routes */}
      <Routes>
        {/* Redirect from the root path to /persons */}
        <Route path="/" element={<Navigate to="/persons" replace />} />

        {/* Persons Routes */}
        <Route path="/persons" element={<PersonIndex />} />
        <Route path="/persons/show/:id" element={<PersonDetail />} />
        <Route path="/persons/create" element={<PersonForm />} />
        <Route path="/persons/edit/:id" element={<PersonForm />} />

        {/* Invoices Routes */}
        <Route path="/invoices" element={<InvoiceIndex />} />
        <Route path="/invoices/show/:id" element={<InvoiceDetail />} />
        <Route path="/invoices/create" element={<InvoiceForm />} />
        <Route path="/invoices/edit/:id" element={<InvoiceForm />} />

        {/* Statistics Route */}
        <Route path="/invoices/statistics" element={<StatisticsIndex />} />
      </Routes>
    </div>
  </Router>
);
}

export default App;