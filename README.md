# AI-Powered Data Workspace Website

An exact replica of the Paradigm AI website with modern design, interactive elements, and responsive layout.

## Features

- **Hero Section**: Dark-themed hero with animated grid background and interactive mouse effects
- **Workspace Section**: Two-column layout showcasing data transformation capabilities
- **Features Grid**: Interactive feature cards with hover effects
- **Solutions Platform**: Tabbed interface showing different industry solutions
- **Security Section**: Enterprise-grade security features with dark theme
- **Testimonials**: Customer quotes with company logos
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Technologies Used

- **HTML5**: Semantic markup with proper accessibility
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript**: Interactive functionality and animations
- **CSS Modules**: Component-based styling approach

## File Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling
├── script.js           # Interactive functionality
└── README.md          # Project documentation
```

## Key Interactive Features

### Hero Grid Animation
- Interactive grid with mouse tracking
- Radial gradient mask following cursor
- Smooth hover effects and transitions

### Solutions Tabs
- Dynamic content switching
- Active state management
- Smooth transitions between sections

### Scroll Animations
- Intersection Observer for smooth reveals
- Parallax effects on hero section
- Staggered animations for feature cards

## Running the Website

### Option 1: Direct File Opening
Simply double-click `index.html` or open it in your browser.

### Option 2: Local Server (Recommended)
For the best experience, serve the files through a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Browser Compatibility

- Chrome/Chromium (Recommended)
- Firefox
- Safari
- Edge

## Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px  
- **Mobile**: 767px and below

## CSS Variables

The design system uses CSS custom properties for consistent theming:

```css
--color-black: #080B12
--color-blue: #0a33ff
--color-surface-gray: #F6F7F8
--font-atacama: Atacama Trial VAR
--font-neue-montreal: PP Neue Montreal
--section-gap: 120px
```

## Customization

### Colors
Update CSS variables in the `:root` selector to change the color scheme.

### Typography  
The website uses three main font families. Update the font variables to use different fonts.

### Layout
Grid and flexbox layouts can be modified by updating the respective CSS classes.

## Performance Features

- Debounced resize handlers
- Intersection Observer for efficient scroll animations  
- CSS-only hover effects where possible
- Optimized grid cell generation

## Future Enhancements

- [ ] Add actual font files
- [ ] Include real product screenshots
- [ ] Add more interactive animations
- [ ] Implement dark/light theme toggle
- [ ] Add form functionality
- [ ] Include analytics tracking

## License

This is a design replica created for educational/demonstration purposes.