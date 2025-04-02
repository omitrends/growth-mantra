import { useState, useEffect } from 'react';
import './JournalHistory.css';
import Sidebar from '../Sidebar';
import React from "react";
import axios from "axios";

const JournalHistory = () => {
  const [journals, setJournals] = useState([]);
  const [filteredJournals, setFilteredJournals] = useState([]);
  const [filter, setFilter] = useState({ dateRange: 'all' });
  const [loading, setLoading] = useState(true);

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' }
  ];

  useEffect(() => {
    const fetchJournals = async () => {
      setLoading(true);
      try {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
          alert("User not logged in. Please log in to view your journal history.");
          return;
        }

        const userResponse = await axios.get("http://localhost:5000/get-user-id", {
          params: { email: storedEmail },
        });

        const UserId = userResponse.data.UserId;

        const response = await axios.get(`http://localhost:5000/logged-journals/${UserId}`);
        setJournals(response.data.journals);
        setFilteredJournals(response.data.journals);
      } catch (error) {
        console.error("Error fetching journals:", error);
        alert("Failed to fetch journals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  useEffect(() => {
    let result = [...journals];

    if (filter.dateRange !== 'all') {
      const today = new Date();
      let startDate = new Date();

      switch (filter.dateRange) {
        case 'week':
          startDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(today.getMonth() - 1);
          break;
        case '3months':
          startDate.setMonth(today.getMonth() - 3);
          break;
        default:
          break;
      }

      result = result.filter(journal => {
        const journalDate = new Date(journal.JournalDate);
        return journalDate >= startDate && journalDate <= today;
      });
    }

    result.sort((a, b) => new Date(b.JournalDate) - new Date(a.JournalDate));
    setFilteredJournals(result);
  }, [filter, journals]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredJournals, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "journal-entries.json";
    link.click();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="history-main">
      <Sidebar />

      <div className="journal-history">
        <h1 className="history-title">Journal History</h1>

        <div className="filter-container">
          <div className="filter-field">
            <label>Date Range</label>
            <select
              name="dateRange"
              value={filter.dateRange}
              onChange={handleFilterChange}
            >
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="journals-container">
          {loading ? (
            <div className="loading">Loading journal entries...</div>
          ) : filteredJournals.length > 0 ? (
            filteredJournals.map((journal, index) => (
              <div key={index} className="journal-card">
                <div className="journal-header">
                  <div className="journal-date">{formatDate(journal.JournalDate)}</div>
                  <div className="journal-mood">{journal.Mood}</div>
                </div>
                <div className="journal-details">
                  <p>
                    <strong>Things To Do:</strong>{" "}
                    {journal.ThingsToDo && JSON.parse(journal.ThingsToDo).filter(task => task.trim() !== "").length > 0
                      ? JSON.parse(journal.ThingsToDo).filter(task => task.trim() !== "").map((task, idx) => (
                          <span key={idx}>{task}{idx < JSON.parse(journal.ThingsToDo).filter(task => task.trim() !== "").length - 1 ? ", " : ""}</span>
                        ))
                      : "No tasks added."}
                  </p>
                  <p><strong>Notes:</strong> {journal.Notes}</p>
                  <p><strong>Sleep Hours:</strong> {journal.SleepHours}</p>
                  <p><strong>Feelings:</strong> {journal.Feelings}</p>
                  <p><strong>Gratitude:</strong> {journal.Gratitude}</p>
                  <p><strong>Affirmations:</strong> {journal.Affirmations}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-journals">
              <p>No journal entries found matching your filters.</p>
            </div>
          )}
        </div>

        <div className="bottom-buttons">
          <button className="journal-button back" onClick={() => window.history.back()}>Back</button>
          <button className="journal-button export" onClick={handleExport}>Export Data</button>
        </div>
      </div>
    </div>
  );
};

export default JournalHistory;