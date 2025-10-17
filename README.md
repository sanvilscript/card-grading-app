# PrimeVault - Card Grading Tools

Professional card grading tools powered by AI for Trading Card Game (TCG) and Sports Cards.

![PrimeVault](https://img.shields.io/badge/version-1.1-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Features

### Three Analysis Modes

1. **Centering Analysis**
   - Left/Right ratio measurement
   - Top/Bottom ratio measurement
   - Centering grade (1-10 scale)
   - Visual centering overlay

2. **Complete Grading**
   - Final grade (1-10 scale)
   - Condition assessment (Gem Mint, Mint, Near Mint, etc.)
   - Individual grades:
     - Corners (4 corners analyzed)
     - Edges (4 edges analyzed)
     - Surface quality
     - Centering
   - Card metadata:
     - Category (TCG/Sport Card)
     - Damage detection
     - Autograph detection
     - Side identification (Front/Back)
   - Detailed centering metrics (pixels, offsets)

3. **Condition Check**
   - Quick condition assessment
   - TCGPlayer scale (5 levels)
   - Card category identification
   - Probability scores

## 🚀 Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **API**: Ximilar Card Grading API v2
- **Image Processing**: HEIC support via heic2any

## 📱 Features

- ✅ Dark theme UI
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Collapsible sidebar navigation
- ✅ HEIC image format support
- ✅ Real-time image preview
- ✅ Detailed analysis results
- ✅ Professional visualizations

## 🎨 UI/UX

- Modern dark theme with gradient accents
- Intuitive sidebar navigation
- Mobile-friendly hamburger menu
- Touch-optimized controls
- Smooth animations and transitions
- Color-coded results for easy reading

## 📋 Supported Image Formats

- PNG
- JPG/JPEG
- HEIC (automatically converted)

## 🔧 Setup

1. Clone the repository:
```bash
git clone https://github.com/sanvilscript/card-grading-app.git
cd card-grading-app/cctools
```

2. Configure your API token:
```bash
# Copy the example config file
cp config.example.js config.js

# Edit config.js and add your Ximilar API token
# Get your token from: https://app.ximilar.com
```

3. Open `index.html` in your browser or serve with a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

4. Upload a card image and select your analysis mode!

### 🔐 API Token Security

- The `config.js` file contains your API token and is **ignored by git**
- Never commit `config.js` to the repository
- Use `config.example.js` as a template for new installations
- Keep your API token private and secure

## 📊 API Integration

This tool uses the [Ximilar Card Grading API](https://docs.ximilar.com/collectibles/card-grading) for professional card analysis.

### Endpoints Used:
- `/v2/centering` - Centering analysis
- `/v2/grade` - Complete grading
- `/v2/condition` - Condition assessment

## 🎯 Use Cases

- Pre-grading assessment before professional submission
- Card collection management
- Buy/sell decision support
- Quality control for card dealers
- Educational tool for collectors

## 📱 Mobile Support

Fully responsive design with:
- Collapsible sidebar for mobile devices
- Touch-friendly controls
- Optimized layouts for all screen sizes
- Native HEIC support for iPhone photos

## 🔐 Security

- Client-side image processing
- Secure API communication
- No image storage on servers
- Privacy-focused design

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 👨‍💻 Powered by

**Sanvil** - Professional card grading solutions

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support or questions, please open an issue on GitHub.

---

**Version**: 1.1  
**Last Updated**: October 2025  
**Status**: Active Development
