# Bright Bytes Frontend

This directory contains the frontend files for Bright Bytes.

## Structure

- `index.html` - Main HTML page
- `css/style.css` - Responsive styling
- `js/main.js` - JavaScript logic and API communication

## Features

- Responsive design (mobile-first)
- Dark mode theme
- Real-time API communication
- Form validation
- Error handling
- Navigation between sections

## Development

The frontend uses vanilla HTML, CSS, and JavaScript - no build tools required!

Just open `index.html` in a browser (with backend running) to see it in action.

## API Communication

The frontend communicates with the backend at `http://localhost:5000/api/`.

All requests include proper error handling and status feedback to the user.

## Styling

Uses CSS variables for theming. Modify colors in `style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... more variables */
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires ES6+ JavaScript support.
