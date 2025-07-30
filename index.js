// const express = require('express');
// const cors = require('cors');
// const fs = require('fs');
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());

// // Route to serve JSON data from player.json
// app.get('/api/data', (req, res) => {
//   fs.readFile('./player.json', (err, jsonData) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error reading file' });
//     }
//     res.setHeader('Content-Type', 'application/json');
//     res.send(jsonData);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`API running at http://localhost:${PORT}/api/data`);
// });


const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/data', (req, res) => {
  fs.readFile('./player.json', (err, jsonData) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error reading file' });
    }

    let players;
    try {
      players = JSON.parse(jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return res.status(500).json({ message: 'Error parsing data' });
    }

    // Check for role query param
    if (req.query.role) {
      const roleQuery = req.query.role.toLowerCase();
      players = players.filter(player =>
        player.personalInformation &&
        player.personalInformation.roleType &&
        player.personalInformation.roleType.toLowerCase().includes(roleQuery)
      );
    }

    res.setHeader('Content-Type', 'application/json');
    res.json(players);
  });
});

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}/api/data`);
});
