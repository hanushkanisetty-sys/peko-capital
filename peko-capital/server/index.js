const express = require('express');
const cors = require('cors');

const eligibilityRoutes = require('./routes/eligibility');
const capitalRoutes = require('./routes/capital');
const postpaidRoutes = require('./routes/postpaid');
const checkoutRoutes = require('./routes/checkout');
const notificationsRoutes = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/eligibility', eligibilityRoutes);
app.use('/api/capital', capitalRoutes);
app.use('/api/postpaid', postpaidRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/notifications', notificationsRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
