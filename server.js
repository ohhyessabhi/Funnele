require('dotenv').config();

const express = require('express');
const path = require('path');

const indexRoutes = require('./routes/index');
const servicesRoutes = require('./routes/services');
const resourcesRoutes = require('./routes/resources');
const contactRoutes = require('./routes/contact');
const logoDataUri = require('./lib/logo-data');

const app = express();
const assetVersion = Date.now();

// ---- View engine ----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ---- Middleware ----
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Make the current path + logo available to every view
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.logoDataUri = logoDataUri;
  res.locals.assetVersion = assetVersion;
  next();
});

// ---- Routes ----
app.use('/', indexRoutes);
app.use('/services', servicesRoutes);
app.use('/resources', resourcesRoutes);
app.use('/contact', contactRoutes);

// ---- 404 ----
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found — Funnele',
    description: 'The page you are looking for does not exist.'
  });
});

// ---- Error handler ----
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong. Please try again shortly.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Funnele site running on port ${PORT}`);
});
