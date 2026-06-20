import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const api = axios.create({ baseURL: '/api/v1/admin', withCredentials: true });

const TABS = ['Overview', 'Users', 'NGOs', 'Tickets'];

export default function AdminDashboard() {
  const [tab, setTab] = useState('Overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleAuthError = useCallback((err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      setError('Your admin session is invalid or expired. Please log in again.');
    } else {
      setError(err?.response?.data?.message || 'Something went wrong.');
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const { data } = await api.get('/stats');
      setStats(data.data);
    } catch (err) {
      handleAuthError(err);
    }
  }, [handleAuthError]);

  const loadList = useCallback(async (which, kw = '') => {
    setLoading(true);
    setError('');
    try {
      const { data } = await api.get(`/${which}`, { params: { keyword: kw } });
      if (which === 'users') setUsers(data.data);
      if (which === 'ngos') setNgos(data.data);
      if (which === 'tickets') setTickets(data.data);
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  }, [handleAuthError]);

  useEffect(() => { loadStats(); }, [loadStats]);

  useEffect(() => {
    setKeyword('');
    if (tab === 'Users') loadList('users');
    if (tab === 'NGOs') loadList('ngos');
    if (tab === 'Tickets') loadList('tickets');
  }, [tab, loadList]);

  const onSearch = (e) => {
    e.preventDefault();
    if (tab === 'Users') loadList('users', keyword);
    if (tab === 'NGOs') loadList('ngos', keyword);
    if (tab === 'Tickets') loadList('tickets', keyword);
  };

  const changeRole = async (id, role) => {
    try {
      await api.patch(`/users/${id}/role`, { role });
      loadList('users', keyword);
      loadStats();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to change role');
    }
  };

  const removeItem = async (which, id, label) => {
    if (!window.confirm(`Delete this ${label}? This cannot be undone.`)) return;
    try {
      await api.delete(`/${which}/${id}`);
      loadList(which, keyword);
      loadStats();
    } catch (err) {
      alert(err?.response?.data?.message || `Failed to delete ${label}`);
    }
  };

  const StatCard = ({ label, value, accent }) => (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col">
      <span className={`text-3xl font-bold ${accent}`}>{value}</span>
      <span className="text-gray-500 mt-1 text-sm uppercase tracking-wide">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">PhilantroHub · Admin</h1>
        <div className="flex gap-3">
          <button onClick={() => navigate('/')} className="text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded">
            View Site
          </button>
          <button onClick={() => { logout(); navigate('/login'); }} className="text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded">
            Log out
          </button>
        </div>
      </header>

      <nav className="bg-white border-b px-6 flex gap-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition ${
              tab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="p-6">
        {error && (
          <div className="mb-4 bg-red-100 text-red-700 px-4 py-3 rounded">{error}</div>
        )}

        {tab === 'Overview' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats ? (
              <>
                <StatCard label="Total Users" value={stats.users.total} accent="text-indigo-600" />
                <StatCard label="Donors" value={stats.users.donors} accent="text-green-600" />
                <StatCard label="NGO Accounts" value={stats.users.ngo} accent="text-blue-600" />
                <StatCard label="Admins" value={stats.users.admins} accent="text-purple-600" />
                <StatCard label="Listed NGOs" value={stats.ngos} accent="text-pink-600" />
                <StatCard label="Fundraising Tickets" value={stats.tickets} accent="text-amber-600" />
              </>
            ) : (
              <p className="text-gray-500">Loading stats…</p>
            )}
          </div>
        )}

        {tab !== 'Overview' && (
          <form onSubmit={onSearch} className="mb-4 flex gap-2">
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={`Search ${tab.toLowerCase()}…`}
              className="border rounded px-3 py-2 w-full max-w-sm"
            />
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              Search
            </button>
          </form>
        )}

        {loading && <p className="text-gray-500">Loading…</p>}

        {tab === 'Users' && !loading && (
          <Table headers={['Username', 'Email', 'Role', 'Mobile', 'Actions']}>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="px-4 py-2">{u.username}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">
                  <span className="inline-block px-2 py-1 text-xs rounded bg-gray-200">{u.role}</span>
                </td>
                <td className="px-4 py-2">{u.mobileNo}</td>
                <td className="px-4 py-2 flex flex-wrap gap-2">
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="User">User</option>
                    <option value="NGO">NGO</option>
                    <option value="Admin">Admin</option>
                  </select>
                  <button
                    onClick={() => removeItem('users', u._id, 'user')}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        )}

        {tab === 'NGOs' && !loading && (
          <Table headers={['Name', 'Category', 'Email', 'Owner', 'Actions']}>
            {ngos.map((n) => (
              <tr key={n._id} className="border-t">
                <td className="px-4 py-2">{n.name}</td>
                <td className="px-4 py-2">{n.category}</td>
                <td className="px-4 py-2">{n.email}</td>
                <td className="px-4 py-2">{n.createdBy?.username || '—'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => removeItem('ngos', n._id, 'NGO')}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        )}

        {tab === 'Tickets' && !loading && (
          <Table headers={['Cause', 'Amount', 'NGO', 'Created', 'Actions']}>
            {tickets.map((t) => (
              <tr key={t._id} className="border-t">
                <td className="px-4 py-2">{t.cause}</td>
                <td className="px-4 py-2">₹{t.amount}</td>
                <td className="px-4 py-2">{t.ngo?.name || '—'}</td>
                <td className="px-4 py-2">{t.createdAt ? new Date(t.createdAt).toLocaleDateString() : '—'}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => removeItem('tickets', t._id, 'ticket')}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </main>
    </div>
  );
}

function Table({ headers, children }) {
  const rows = React.Children.toArray(children);
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length ? rows : (
            <tr>
              <td colSpan={headers.length} className="px-4 py-6 text-center text-gray-400">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
