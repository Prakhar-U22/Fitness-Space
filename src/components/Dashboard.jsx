// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  getPatientDashboard,
  updateWellness,
  updateHealthInfo,
} from './utils/helper';
import './Dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [savingWellness, setSavingWellness] = useState(false);
  const [savingHealth, setSavingHealth] = useState(false);
  const [error, setError] = useState(null);

  const [wellness, setWellness] = useState({
    steps: 0,
    activeMinutes: 0,
    sleepHours: 0,
  });

  const [allergies, setAllergies] = useState([]);
  const [medications, setMedications] = useState([]);

  const [form, setForm] = useState({
    steps: '',
    activeMinutes: '',
    sleepHours: '',
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      const res = await getPatientDashboard();
      setLoading(false);
      if (res.error) {
        setError(res.error);
        return;
      }
      const w = res.wellness || {};
      setWellness({
        steps: w.steps || 0,
        activeMinutes: w.activeMinutes || 0,
        sleepHours: w.sleepHours || 0,
      });
      setForm({
        steps: w.steps?.toString() || '',
        activeMinutes: w.activeMinutes?.toString() || '',
        sleepHours: w.sleepHours?.toString() || '',
      });
      setAllergies(res.allergies || []);
      setMedications(res.medications || []);
    };

    load();
  }, []);

  const handleWellnessSave = async (e) => {
    e.preventDefault();
    setSavingWellness(true);
    setError(null);
    const payload = {
      steps: Number(form.steps) || 0,
      activeMinutes: Number(form.activeMinutes) || 0,
      sleepHours: Number(form.sleepHours) || 0,
    };
    const res = await updateWellness(payload);
    setSavingWellness(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    const w = res.wellness || payload;
    setWellness(w);
    setForm({
      steps: w.steps.toString(),
      activeMinutes: w.activeMinutes.toString(),
      sleepHours: w.sleepHours.toString(),
    });
  };

  const handleAddAllergy = async () => {
    const value = window.prompt('Enter allergy name');
    if (!value) return;
    const nextAllergies = [...allergies, value.trim()];
    setSavingHealth(true);
    const res = await updateHealthInfo({
      allergies: nextAllergies,
      medications,
    });
    setSavingHealth(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setAllergies(res.allergies || nextAllergies);
  };

  const handleAddMedication = async () => {
    const value = window.prompt('Enter medication name');
    if (!value) return;
    const nextMedications = [...medications, value.trim()];
    setSavingHealth(true);
    const res = await updateHealthInfo({
      allergies,
      medications: nextMedications,
    });
    setSavingHealth(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setMedications(res.medications || nextMedications);
  };

  if (loading) {
    return (
      <div className="page">
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="header">
        <div>
          <h2 className="m-0">Patient Dashboard</h2>
          <div className="user-subtitle">
            Welcome, {user?.name || user?.email}
          </div>
        </div>
        <button className="logoutBtn" onClick={onLogout}>
          Logout
        </button>
      </header>

      {error && <div className="error">{error}</div>}

      <section className="mt-20">
        <h3 className="sectionTitle">Today&apos;s Wellness</h3>
        <div className="cardGrid">
          <MetricCard label="Steps" value={wellness.steps} unit="steps" />
          <MetricCard label="Active" value={wellness.activeMinutes} unit="mins" />
          <MetricCard label="Sleep" value={wellness.sleepHours} unit="hrs" />
        </div>

        <form className="wellnessForm" onSubmit={handleWellnessSave}>
          <div className="wellnessRow">
            <div className="fieldGroup">
              <label className="label">Steps</label>
              <input
                className="input"
                type="number"
                value={form.steps}
                onChange={(e) =>
                  setForm((f) => ({ ...f, steps: e.target.value }))
                }
                min="0"
              />
            </div>

            <div className="fieldGroup">
              <label className="label">Active Minutes</label>
              <input
                className="input"
                type="number"
                value={form.activeMinutes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, activeMinutes: e.target.value }))
                }
                min="0"
              />
            </div>

            <div className="fieldGroup">
              <label className="label">Sleep (hours)</label>
              <input
                className="input"
                type="number"
                step="0.1"
                value={form.sleepHours}
                onChange={(e) =>
                  setForm((f) => ({ ...f, sleepHours: e.target.value }))
                }
                min="0"
              />
            </div>
          </div>

          <button className="primaryBtn" type="submit" disabled={savingWellness}>
            {savingWellness ? 'Saving...' : 'Save Today\'s Data'}
          </button>
        </form>
      </section>

      <section className="mt-30">
        <h3 className="sectionTitle">Health Information</h3>

        <div className="healthGrid">
          <div className="card">
            <div className="cardHeader">
              <span>Allergies</span>
              <button className="iconBtn" onClick={handleAddAllergy} title="Add allergy">+</button>
            </div>

            {allergies.length === 0 ? (
              <p className="emptyText">No allergies added yet.</p>
            ) : (
              <ul className="chipList">
                {allergies.map((a, idx) => (
                  <li key={idx} className="chip">{a}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="card">
            <div className="cardHeader">
              <span>Medications</span>
              <button className="iconBtn" onClick={handleAddMedication} title="Add medication">+</button>
            </div>

            {medications.length === 0 ? (
              <p className="emptyText">No medications added yet.</p>
            ) : (
              <ul className="chipList">
                {medications.map((m, idx) => (
                  <li key={idx} className="chip">{m}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {savingHealth && (
          <div className="savingText">Saving health info...</div>
        )}
      </section>
    </div>
  );
}

function MetricCard({ label, value, unit }) {
  return (
    <div className="card">
      <div className="metricLabel">{label}</div>
      <div className="metricValue">
        {value} <span className="metricUnit">{unit}</span>
      </div>

      <div className="progressOuter">
        <div
          className="progressInner"
          style={{
            width: `${Math.min(100, (Number(value) || 0) / 100 * 10)}%`,
          }}
        />
      </div>
    </div>
  );
}
