const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose').default; // Import mongoose for database integration
const path = require('path'); // Import path for file path handling

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the "frontend" directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Connect to MongoDB (replace the URL and database name with your own)
mongoose.connect('mongodb://127.0.0.1:27017/Volunteering_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the Event schema
const eventSchema = new mongoose.Schema({
    name: String,
    date: String,
    locations: String,
    volunteersNeeded: String,
    imageUrl: String,
    details: String,
    category: String,
});

// Create the Event model
const Event = mongoose.model('Event', eventSchema);

// Routes
// Get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a new event
app.post('/api/events', async (req, res) => {
    const newEvent = new Event(req.body);

    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Invalid data' });
    }
});



const volunteerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    gender: String,
    age: Number,
    address: String
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
const nodemailer = require('nodemailer');

// Add a new volunteer
app.post('/api/volunteers', async (req, res) => {
    const newVolunteer = new Volunteer(req.body);

    try {
        await newVolunteer.save();
        res.status(201).json(newVolunteer);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Invalid data' });
    }

    });

    // Send a response to the frontend




const AddeventSchema = new mongoose.Schema({
    name: String,
    date: String,
    locations: String,
    volunteersNeeded: String,
    imageUrl: String,
    details: String,
    category: String,
});

const AddEvent = mongoose.model('Event-Add', AddeventSchema);

// Add a new event
app.post('/api/Add-events', async (req, res) => {
    const newEvent = new Event(req.body);

    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Define the User schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String, // 'admin' or 'volunteer
    // role: String, // Add a role field for user type
});

// Create the User model
const User = mongoose.model('User', userSchema);
app.post('/api/create-account', (req, res) => {
  const { username, password } = req.body;

  // Create a new user and save it to the database
  const newUser = new User({ username, password });

  newUser.save()
    .then(() => {
      // Redirect to the 'event.html' page
      res.status(201).redirect('/events.html');
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'Error creating account' });
    });
});


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Check the database for the user
  User.findOne({ username, password })
    .then((user) => {
      if (user) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.status(401).json({ success: false, message: 'Incorrect username or password' });
      }
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: 'An error occurred during login.' });
    });
});





// ... Other routes ...

// Route for events.html
app.get('/events.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'events.html'));
});

app.get('/about-us.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'about-us.html'));
});



app.get('/contact-us.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'contact-us.html'));
});

app.get('/faq-help.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'faq-help.html'));
});

app.get('/volunteer-registration.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'volunteer-registration.html'));
});

app.get('/background-events.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'volunteer-registration.html'));
});
  app.get('/create-account.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'create-account.html'));
  });
    app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'login.html'));
  });
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
