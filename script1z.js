document.addEventListener('DOMContentLoaded', () => {
  // Checkbox coloring
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      cb.classList.remove('in-progress');
      if (cb.checked) {
        cb.style.accentColor = 'green';
      } else {
        cb.style.accentColor = '';
      }
    });
  });

  // Add row on Enter key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && document.activeElement.isContentEditable) {
      e.preventDefault();
      const tr = document.activeElement.closest('tr');
      if (tr) {
        const newTr = tr.cloneNode(true);
        newTr.querySelectorAll('[contenteditable]').forEach(cell => {
          cell.textContent = 'New';
        });
        tr.parentNode.insertBefore(newTr, tr.nextSibling);
      }
    }
  });

  // Status toggle button cycling
  const cycleStatus = (btn) => {
    const states = ['Not Started', 'In Progress', 'Completed'];
    const classes = ['status-not-started', 'status-in-progress', 'status-completed'];
    let current = states.indexOf(btn.textContent.trim());
    current = (current + 1) % states.length;
    btn.textContent = states[current];
    btn.className = 'status-toggle ' + classes[current];
  };

  document.querySelectorAll('.status-toggle').forEach(btn => {
    btn.classList.add('status-completed');
    btn.textContent = 'Completed';
    btn.addEventListener('click', () => cycleStatus(btn));
  });

  // Add row buttons
  document.querySelectorAll('.add-row').forEach(btn => {
    btn.addEventListener('click', () => {
      const tableId = btn.getAttribute('data-table');
      const table = document.getElementById(tableId).querySelector('tbody');
      const firstRow = table.rows[0];
      const newRow = firstRow.cloneNode(true);
      newRow.querySelectorAll('[contenteditable]').forEach(cell => {
        cell.textContent = 'New';
      });
      const statusBtn = newRow.querySelector('.status-toggle');
      if (statusBtn) {
        statusBtn.textContent = 'Not Started';
        statusBtn.className = 'status-toggle status-not-started';
        statusBtn.addEventListener('click', () => cycleStatus(statusBtn));
      }
      table.appendChild(newRow);
    });
  });

  // Form submit
  document.getElementById('improvementForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const suggestion = e.target.suggestion.value.trim();
    if (name && suggestion) {
      alert(`Thank you for your suggestion, ${name}!`);
      e.target.reset();
    } else {
      alert('Please fill in both your name and the suggestion.');
    }
  });
});
