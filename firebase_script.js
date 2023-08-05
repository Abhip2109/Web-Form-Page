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


  let record=[];
  contactFormDB.once("value",function(snapshot){
    var data=snapshot.val();
     for(let i in data){
         record.push(data[i]);
       console.log(data[i]);
     }
     d();
   })
  
 
function d(){

     // Function to create a single record element
     function createRecordElement(record) {
         const recordElement = document.createElement("div");
         recordElement.classList.add("record");
     
         const img=document.createElement("img");
         img.src=`https://firebasestorage.googleapis.com/v0/b/contact-form-12a58.appspot.com/o/images%2F${record.name}.jpeg?alt=media&token=71c77bdc-b23c-479a-8d70-eff9023fbed4`

         const nameElement = document.createElement("h2");
         nameElement.textContent = `Name: ${record.name}`;
     
         const mobileElement = document.createElement("p");
         mobileElement.textContent = `Mobile Number: ${record.phoneNo}`;
     
         const emailElement = document.createElement("p");
         emailElement.textContent = `Email: ${record.emailid}`;
     
         const dobElement = document.createElement("p");
         dobElement.textContent = `DOB: ${record.dob}`;
     
        
         recordElement.appendChild(nameElement);
         recordElement.appendChild(img);
         recordElement.appendChild(mobileElement);
         recordElement.appendChild(emailElement);
         recordElement.appendChild(dobElement);
     
         return recordElement;
     }
     
     // Function to add records to the container
     function addRecordsToContainer(records) {
         const container = document.getElementById("recordContainer");
     
         records.forEach(record => {
             const recordElement = createRecordElement(record);
             container.appendChild(recordElement);
         });
     }
     
     // Call the function to add records to the container
     addRecordsToContainer(record);

  }

 
