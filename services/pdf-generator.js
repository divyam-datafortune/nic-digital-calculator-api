/* eslint-disable max-len */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const puppeteer = require('puppeteer');
const awsHandler = require('./aws');

const config = require('../configuration');

const images = ['bar-chart.png', 'stars.png', 'graph.png'];

/**
 * Custom Handlebars
 */
handlebars.registerHelper('inc', (value) => parseInt(value, 10) + 1);
handlebars.registerHelper('img', (value) => {
  const image = `data:image/png;base64,${fs
    .readFileSync(
      path.join(process.cwd(), './templates/images/', images[value]),
    )
    .toString('base64')}`;
  return image;
});

/**
 * Compiles HBS file
 * @param pdfData - object sent from frontend application
 */
function compileHbs(pdfData) {
  const assessmentHbs = fs.readFileSync(
    path.join(process.cwd(), './templates/assessment.hbs'),
  );
  const styleSheet = fs.readFileSync(
    path.join(process.cwd(), './templates/styles/bootstrap.min.css'),
  );
  const styleSheet2 = fs.readFileSync(
    path.join(process.cwd(), './templates/styles/style.css'),
  );
  const logo = `data:image/png;base64,${fs
    .readFileSync(path.join(process.cwd(), './templates/images/Logo.png'))
    .toString('base64')}`;
  const banner = `data:image/png;base64,${fs
    .readFileSync(
      path.join(process.cwd(), './templates/images/home-banner.png'),
    )
    .toString('base64')}`;
  const female = `data:image/png;base64,${fs
    .readFileSync(
      path.join(process.cwd(), './templates/images/photo-female.png'),
    )
    .toString('base64')}`;
  const idea = `data:image/png;base64,${fs
    .readFileSync(path.join(process.cwd(), './templates/images/idea.png'))
    .toString('base64')}`;
  const template = handlebars.compile(assessmentHbs.toString());

  return template({
    idea,
    css: styleSheet.toString(),
    css2: styleSheet2.toString(),
    logo,
    banner,
    female,
    images,
    pdfData,
    filesRoot: `${config.PUBLIC_URL}`,
  });
}
/**
 *
 * @param req - request data
 * @returns {Promise<void>}
 */
module.exports.generate = async (req) => {
  const html = compileHbs(req.body.pdfData);

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf(config.PDF_OPTIONS);
  const filePath = await awsHandler.uploadPdfBuffer(pdfBuffer);
  await browser.close();

  return filePath;
};
