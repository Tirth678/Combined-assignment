const formPreview = document.getElementById('formPreview');
const fieldButtons = document.querySelectorAll('.field-btn');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');

let fieldCounter = 0;

fieldButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        addField(btn.dataset.type);
    });
});

function addField(type) {
    fieldCounter++;
    const fieldId = `field_${fieldCounter}`;
    
    const field = document.createElement('div');
    field.className = 'form-field';
    field.dataset.fieldId = fieldId;
    field.dataset.fieldType = type;
    
    const emptyState = formPreview.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    let fieldContent = '';
    
    switch (type) {
        case 'text':
        case 'email':
        case 'password':
        case 'number':
        case 'date':
            fieldContent = `
                <div class="form-field-header">
                    <span class="field-type">${type} input</span>
                    <button class="delete-btn" onclick="removeField('${fieldId}')">×</button>
                </div>
                <label class="field-label">
                    <input type="text" placeholder="Enter label text..." onchange="updateLabel('${fieldId}', this.value)">
                </label>
                <input type="${type}" class="field-input" placeholder="Enter ${type}..." disabled>
            `;
            break;
            
        case 'checkbox':
            fieldContent = `
                <div class="form-field-header">
                    <span class="field-type">checkbox</span>
                    <button class="delete-btn" onclick="removeField('${fieldId}')">×</button>
                </div>
                <label class="field-label">
                    <input type="text" placeholder="Enter group label..." onchange="updateLabel('${fieldId}', this.value)">
                </label>
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="${fieldId}_1" disabled>
                        <label for="${fieldId}_1">Option 1</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="${fieldId}_2" disabled>
                        <label for="${fieldId}_2">Option 2</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="${fieldId}_3" disabled>
                        <label for="${fieldId}_3">Option 3</label>
                    </div>
                </div>
            `;
            break;
            
        case 'radio':
            fieldContent = `
                <div class="form-field-header">
                    <span class="field-type">radio button</span>
                    <button class="delete-btn" onclick="removeField('${fieldId}')">×</button>
                </div>
                <label class="field-label">
                    <input type="text" placeholder="Enter group label..." onchange="updateLabel('${fieldId}', this.value)">
                </label>
                <div class="radio-group">
                    <div class="radio-item">
                        <input type="radio" name="${fieldId}" id="${fieldId}_1" disabled>
                        <label for="${fieldId}_1">Option 1</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" name="${fieldId}" id="${fieldId}_2" disabled>
                        <label for="${fieldId}_2">Option 2</label>
                    </div>
                    <div class="radio-item">
                        <input type="radio" name="${fieldId}" id="${fieldId}_3" disabled>
                        <label for="${fieldId}_3">Option 3</label>
                    </div>
                </div>
            `;
            break;
            
        case 'textarea':
            fieldContent = `
                <div class="form-field-header">
                    <span class="field-type">textarea</span>
                    <button class="delete-btn" onclick="removeField('${fieldId}')">×</button>
                </div>
                <label class="field-label">
                    <input type="text" placeholder="Enter label text..." onchange="updateLabel('${fieldId}', this.value)">
                </label>
                <textarea class="field-input" placeholder="Enter your text here..." disabled></textarea>
            `;
            break;
            
        case 'select':
            fieldContent = `
                <div class="form-field-header">
                    <span class="field-type">dropdown</span>
                    <button class="delete-btn" onclick="removeField('${fieldId}')">×</button>
                </div>
                <label class="field-label">
                    <input type="text" placeholder="Enter label text..." onchange="updateLabel('${fieldId}', this.value)">
                </label>
                <select class="field-input" disabled>
                    <option>Select an option...</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </select>
            `;
            break;
    }
    
    field.innerHTML = fieldContent;
    formPreview.appendChild(field);
}

function removeField(fieldId) {
    const field = document.querySelector(`[data-field-id="${fieldId}"]`);
    if (field) {
        field.remove();
        
        if (formPreview.children.length === 0) {
            formPreview.innerHTML = '<p class="empty-state">No fields added yet. Click a button in the sidebar to add form fields.</p>';
        }
    }
}

function updateLabel(fieldId, labelText) {
    const field = document.querySelector(`[data-field-id="${fieldId}"]`);
    if (field) {
        const input = field.querySelector('.field-input');
        if (input) {
            input.placeholder = labelText || input.placeholder;
        }
    }
}

clearBtn.addEventListener('click', () => {
    if (formPreview.children.length > 0) {
        if (confirm('Are you sure you want to clear all fields?')) {
            formPreview.innerHTML = '<p class="empty-state">No fields added yet. Click a button in the sidebar to add form fields.</p>';
        }
    }
});

exportBtn.addEventListener('click', () => {
    const fields = formPreview.querySelectorAll('.form-field');
    
    if (fields.length === 0) {
        alert('No fields to export! Add some fields first.');
        return;
    }
    
    let html = '<form>\n';
    
    fields.forEach(field => {
        const type = field.dataset.fieldType;
        const labelInput = field.querySelector('.field-label input');
        const labelText = labelInput ? labelInput.value || 'Field' : 'Field';
        
        switch (type) {
            case 'text':
            case 'email':
            case 'password':
            case 'number':
            case 'date':
                html += `  <div>\n    <label>${labelText}</label>\n    <input type="${type}" placeholder="Enter ${type}">\n  </div>\n\n`;
                break;
            case 'textarea':
                html += `  <div>\n    <label>${labelText}</label>\n    <textarea placeholder="Enter your text here..."></textarea>\n  </div>\n\n`;
                break;
            case 'select':
                html += `  <div>\n    <label>${labelText}</label>\n    <select>\n      <option>Select an option...</option>\n      <option>Option 1</option>\n      <option>Option 2</option>\n      <option>Option 3</option>\n    </select>\n  </div>\n\n`;
                break;
            case 'checkbox':
                html += `  <fieldset>\n    <legend>${labelText}</legend>\n    <label><input type="checkbox"> Option 1</label>\n    <label><input type="checkbox"> Option 2</label>\n    <label><input type="checkbox"> Option 3</label>\n  </fieldset>\n\n`;
                break;
            case 'radio':
                html += `  <fieldset>\n    <legend>${labelText}</legend>\n    <label><input type="radio" name="${field.dataset.fieldId}"> Option 1</label>\n    <label><input type="radio" name="${field.dataset.fieldId}"> Option 2</label>\n    <label><input type="radio" name="${field.dataset.fieldId}"> Option 3</label>\n  </fieldset>\n\n`;
                break;
        }
    });
    
    html += '</form>';
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form.html';
    a.click();
    URL.revokeObjectURL(url);
});