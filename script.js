const firebaseConfig = {
    //   copy your firebase config informations
    apiKey: "AIzaSyBkHpZXV6SonDkkbRsCXhSnzjGOROI6C_4",
    authDomain: "contact-form-12a58.firebaseapp.com",
    databaseURL: "https://contact-form-12a58-default-rtdb.firebaseio.com",
    projectId: "contact-form-12a58",
    storageBucket: "contact-form-12a58.appspot.com",
    messagingSenderId: "633102938675",
    appId: "1:633102938675:web:b28a37d39cd32127dbe946"
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  var storage=firebase.storage();
  // reference your database
  var contactFormDB = firebase.database().ref("contactForm");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var name = getElementVal("name");
    var phoneNo= getElementVal("phoneNo");
    var emailid = getElementVal("emailid");
    var dob=getElementVal("dob")
  
    saveMessages(name,phoneNo, emailid, dob);
  
    //   enable alert
    document.querySelector(".alert").style.display = "block";
  
    //   remove the alert
    setTimeout(() => {
      document.querySelector(".alert").style.display = "none";
    }, 3000);
  
    //   reset the form
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (name,phoneNo, emailid,dob) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      name: name,
      phoneNo:phoneNo,
      emailid: emailid,
      dob:dob
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };

  

  contactFormDB.once("value",function(snapshot){
    var data =snapshot.val();
    for(let i in data){
      console.log(data[i]);
    }
  })

  


  function uploadImage() {
    var fileInput = document.getElementById('imageInput');
    var file = fileInput.files[0];
    var storageRef = storage.ref('images/' + file.name);

    // Upload the file to Firebase Storage
    var task = storageRef.put(file);

    task.on(
      'state_changed',
      null,
      function (error) {
        // Handle unsuccessful uploads
        console.error('Error uploading image:', error);
      },
      function () {
        // Handle successful uploads
        console.log('Image uploaded successfully');
        // Get the download URL of the uploaded image
        task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('Image URL:', downloadURL);
          displayImageLink(downloadURL); // Call function to display the image link
        });
      }
    );
  }

  function displayImageLink(url) {
    // Create an anchor tag to display the image link
    var link = document.createElement('a');
    link.href = url;
    link.textContent = 'Download Image'; // Text for the link

    // Append the link to a container in your HTML
    var linkContainer = document.getElementById('linkContainer');
    linkContainer.appendChild(link);
  }