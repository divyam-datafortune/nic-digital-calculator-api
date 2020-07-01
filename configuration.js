module.exports = {
  PORT: process.env.PORT || 3000,
  PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3000/',

  PDF_OPTIONS: {
    format: "A4",
    displayHeaderFooter: false,
    margin: {
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
    printBackground: true
  },
};
