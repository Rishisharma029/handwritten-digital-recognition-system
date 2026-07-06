import React from 'react';
import './HistoryCard.css';

/**
 * HistoryCard component - displays a single OCR history entry
 */
const HistoryCard = ({ record, onDelete, onExport, onRetry }) => {
  const { id, file_name, recognized_text, confidence_score, created_at } = record;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return '#4caf50';
    if (confidence >= 0.75) return '#2196f3';
    if (confidence >= 0.5) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className="history-card">
      <div className="history-card-header">
        <h3 className="history-card-title">{file_name}</h3>
        <span className="history-card-date">{formatDate(created_at)}</span>
      </div>

      <div className="history-card-body">
        <div className="history-card-text">
          <p className="history-card-label">Recognized Text:</p>
          <p className="history-card-content">{recognized_text || 'No text recognized'}</p>
        </div>

        <div className="history-card-confidence">
          <p className="history-card-label">Confidence:</p>
          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{
                width: `${confidence_score * 100}%`,
                backgroundColor: getConfidenceColor(confidence_score)
              }}
            />
          </div>
          <span className="confidence-score">{(confidence_score * 100).toFixed(2)}%</span>
        </div>
      </div>

      <div className="history-card-actions">
        <button className="btn-action btn-export" onClick={() => onExport?.(record)}>
          Export
        </button>
        <button className="btn-action btn-retry" onClick={() => onRetry?.(record)}>
          Retry
        </button>
        <button className="btn-action btn-delete" onClick={() => onDelete?.(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
