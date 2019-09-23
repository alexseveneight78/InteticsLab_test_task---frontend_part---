/*
There a 2 workers on a service station that have to log in an application. It is necessary to control a work time and a work service of each worker. Authorisation is controlled by entering first and last name of a worker.
+ Checking for returning clients in database
*/

window.onload = function(){
    let firstNames = ['Bill', 'Garry'];
    let lastNames = ['Holden', 'Bayern'];
    let login = ['CoolGuy', 'admin'];
    let password = ['best90','qwerty'];
    
    let clients = [
      {
        firstName: 'Jason',
        lastName: 'Statham',
        birthDate: '26.07.1967',
        address: 'Derbyshire, England',
        phone: '+44784565989',
        email: 'j.statham@gmail.com',
        cars: [
          {
            make: 'Ferrari',
            model: 'F12 Berlinetta',
            year: 2016,
            vin: 'SDKR567L4JSDF345',
            orders: [
              {
                orderNumber: '#1: Oil change',
                orderDate: '19.04.2016',
                orderAmount: '940$',
                orderStatus: 'In progress'
              },
              {
                orderNumber: '#2: Motor checke',
                orderDate: '19.04.2016',
                orderAmount: '1570$',
                orderStatus: 'In progress'
              },
              {
                orderNumber: '#3: Urgent headlamp change, type F435',
                orderDate: '19.04.2016',
                orderAmount: '0$',
                orderStatus: 'Cancelled (no this type in store)'
              }
            ]
          }, {
            make: 'Audi',
            model: 'RS 6',
            year: 2015,
            vin: 'DSFGLE3245034JTO56',
            orders: [
              {
                orderNumber: '#1: Oil change',
                orderDate: '5.04.2016',
                orderAmount: '400$',
                orderStatus: 'In progress'
              }
            ]
          },
          {
            make: 'Aston Martin',
            model: 'DBS Volante ',
            year: 2012,
            vin: 'DFJW4520RU2H4R2O4J24K2',
            orders: []
          }
        ]
    }, {
        firstName: 'Jackie',
        lastName: 'Chan',
        birthDate: '7.04.1954',
        address: 'Hong-Kong',
        phone: '+8524567919',
        email: 'j.chan@gmail.com',
        cars: [
          {
            make: 'Mitsubishi',
            model: 'FireSports Evo VIII MR',
            year: 2012,
            vin: 'DFLKJ95783HRLTOU4',
            orders: []
          }
        ]
    }, {
        firstName: 'Alexandr',
        lastName: 'Lukashenko',
        birthDate: '31.08.1954',
        address: 'Minsk',
        phone: '+375290000000',
        email: 'a.lukashenko@gmail.com',
        cars: [
          {
          make: 'Tesla',
          model: 'S P100D',
          year: 2018,
          vin: 'SKDJRT352R',
          orders: []
        }
        ]
    }
  ];
    
    localStorage.setItem('firstName', firstNames);
    localStorage.setItem('lastName', lastNames);
    localStorage.setItem('login', login);
    localStorage.setItem('password', password);
    localStorage.setItem('clients', JSON.stringify(clients))
  };
  // Form for authorisation 
  let authWindow = document.querySelector('.modal');
  let firstName = document.querySelector('#firstName');
  let lastName = document.querySelector('#lastName');
  let login = document.querySelector('#login');
  let password = document.querySelector('#password');
  let checkFirstName = localStorage.getItem('firstName').split(',');
  let checkLastName = localStorage.getItem('lastName').split(',');
  let checkLogin = localStorage.getItem('login').split(',');
  let checkPassword = localStorage.getItem('password').split(',');
  let enterButton = document.querySelector('#enter');
  let panelFirstName = document.getElementById('panel-first-name');
  let panelLastName = document.getElementById('panel-last-name');
  
  enterButton.addEventListener('click', () => {
    if(firstName.value === checkFirstName[0] && lastName.value === checkLastName[0] && login.value === checkLogin[0] && password.value === checkPassword[0]) {
        authWindow.style.display = 'none';
        panelFirstName.innerHTML = firstName.value;
        panelLastName.innerHTML = lastName.value;
        firstName.value = '';
        lastName.value = '';
        login.value = '';
        password.value = '';
    }
    if(firstName.value === checkFirstName[1] && lastName.value === checkLastName[1] && login.value === checkLogin[1] && password.value === checkPassword[1]) {
        authWindow.style.display = 'none';
        panelFirstName.innerHTML = firstName.value;
        panelLastName.innerHTML = lastName.value;
        firstName.value = '';
        lastName.value = '';
        login.value = '';
        password.value = '';
    }
  })

  // Check a client by name and surname
  let actualClients = JSON.parse(localStorage.getItem('clients'));
  
  document.getElementById('check_registr_clients').addEventListener('click', () => {
    let clientName = document.querySelector('#client_name');
    let clientSurname = document.querySelector('#client_surname');
    let clientInfo = document.getElementById('client_info');
    let cards = document.getElementById('cards');
    
  
    clientInfo.innerHTML = '';
    cards.innerHTML = '';
    
    for(let client of actualClients) {
      if(clientName.value === client.firstName && clientSurname.value === client.lastName) {
            clientInfo.innerHTML = `<ul>
                 <li>First Name: ${ client.firstName } </li> 
                 <li>Last Name: ${ client.lastName } </li>
                 <li>Date of Birth: ${ client.birthDate} </li>
                 <li>Address: ${ client.address} </li>
                 <li>Phone: ${ client.phone } </li>
                 <li>Email: ${ client.email } </li>
             </ul>`;  
            client.cars.forEach((car) =>  {
                 cards.innerHTML += `<div class="card">
                      <button class="edit">Edit card</button>
                      <label for="toDelete">Delete card</label>
                      <input type="checkbox" class="toDelete">
                      <ul>
                        <li>Make
                          <div contentEditable="false">${ car.make }</div>
                        </li>
                        <li>Model
                          <div contentEditable="false">${ car.model }</div>
                        </li>
                        <li>Year
                          <div contentEditable="false">${ car.year }</div>
                        </li>
                        <li>VIN
                          <div contentEditable="false">${ car.vin }</div>
                        </li>
                      </ul>
                      <h3>List of orders:</h3>
                      <button class="addNewOrder">+</button>
                      <button class="removeOrder">-</button>
                    </div>`;
              if(car.orders.length > 0) {
                car.orders.forEach((order) => {
                  console.dir(order)
                  cards.lastElementChild.innerHTML += `
                    <div class="lists_container">
                      <ol>
                        <input type="checkbox" class="deleteOrder">Delete order
                        <li>Order: 
                          <div contentEditable="true">${ order.orderNumber }</div>
                        </li>
                        <li>Date: 
                          <div contentEditable="true">${ order.orderDate }</div>
                        </li>
                        <li>Order Amount: 
                          <div contentEditable="true">${ order.orderAmount }</div>
                        </li>
                        <li>Order Status: 
                          <div contentEditable="true">${ order.orderStatus }</div>
                        </li>
                      </ol>`
                });
              }
            });

        // Editing an actual card via an attribute contentEditable
            let editButton = document.querySelectorAll('.edit');
              for(let i=0; i < editButton.length; i++) {
                editButton[i].addEventListener('click', () => {
                  let li = cards.children[i].children[3].children;
                  for(let j=0; j < li.length; j++) {
                    li[j].firstElementChild.contentEditable = true;
                  }
                })
              }
        } 
    }
    // add a new order
       let newOrderButtons = document.querySelectorAll('.addNewOrder');
        for(let i=0; i < newOrderButtons.length; i++) {
          newOrderButtons[i].addEventListener('click', () => {
            cards.querySelectorAll('.card')[i].children[cards.querySelectorAll('.card')[i].children.length - 1].insertAdjacentHTML('afterend',`
                    <div class="lists_container">
                      <ol>
                        <input type="checkbox" class="deleteOrder">Delete order
                        <li>Order: 
                          <div contentEditable="true"></div>
                        </li>
                        <li>Date: 
                          <div contentEditable="true"></div>
                        </li>
                        <li>Order Amount: 
                          <div contentEditable="true"></div>
                        </li>
                        <li>Order Status: 
                          <div contentEditable="true"></div>
                        </li>
                      </ol>`)
          })
        }
    // delete an order
    let removeButtons = document.querySelectorAll('.removeOrder');
    
    for(let i=0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener('click', () => {
        let deleteOrder = document.querySelectorAll('.deleteOrder');
        for(let j=0; j < deleteOrder.length; j++) {
          if(deleteOrder[j].checked === true) {
            console.dir(deleteOrder[j]);
            deleteOrder[j].parentElement.remove(deleteOrder[j].parentElement)
          }
        }
      })
    }
  });      
          // A card filed
    let card = `
                  <button class="edit">Edit card</button>
                  <label for="toDelete">Delete card</label>
                  <input type="checkbox" class="toDelete">
                  <ul>
                    <li>Make
                      <div contentEditable="true"></div>
                    </li>
                    <li>Model
                      <div contentEditable="true"></div>
                    </li>
                    <li>Year
                      <div contentEditable="true"></div>
                    </li>
                    <li>VIN
                      <div contentEditable="true"></div>
                    </li>
                  </ul>
                  <h3>List of orders: </h3>
                  <button class="addNewOrder">+</button>
                  <button class="removeOrder">-</button>
                  <div class="lists_container">
                    <ol>
                      <input type="checkbox" class="deleteOrder">Delete order
                      <li>Order : <div contentEditable="true"></div></li>
                      <li>Date: <div contentEditable="true"></div></li>
                      <li>Order Amount: <div contentEditable="true"></div></li>
                      <li>Order Status: <div contentEditable="true"></div></li>
                    </ol>
                  </div>
  `;
        // Creating a new customer card
        let createClient = document.getElementById('create_client');
        let newCustomerForm = document.querySelector('#modal_new_client');
        let close = document.querySelector('.close');
        let modalNewClient = document.querySelector('#modal_new_client');
        let saveNewClient = document.querySelector('#save_new_customer');
  
        createClient.addEventListener('click', () => {
          newCustomerForm.style.display = 'block';
        });
        close.onclick = () => {
          newCustomerForm.style.display = 'none';
        };
        window.onclick = (event) => {
          if(event.target === modalNewClient) {
            newCustomerForm.style.display = 'none';
          }
        };
        saveNewClient.addEventListener('click', () => {
          let obj = {};
          obj.firstName = document.getElementById('new_client_name').value;
          obj.lastName = document.getElementById('new_client_suname').value;
          obj.birthDate = document.getElementById('new_birth').value;
          obj.address = document.getElementById('new_address').value;
          obj.phone = document.getElementById('new_phone').value;
          obj.email = document.getElementById('new_email').value;
          obj.cars = [];
          
          actualClients.push(obj);
          localStorage.removeItem('clients');
          localStorage.setItem('clients', JSON.stringify(actualClients));
          
          document.getElementById('new_client_name').value = '';
          document.getElementById('new_client_suname').value = '';
          document.getElementById('new_birth').value = '';
          document.getElementById('new_address').value = '';
          document.getElementById('new_phone').value = '';
          document.getElementById('new_email').value = '';
          
          newCustomerForm.style.display = 'none';
        })
  
        // adding a new card
        let addButton = document.getElementById('add');
              addButton.addEventListener('click', (e) => {
                let node = document.createElement('div');
                node.setAttribute('class','card');
                cards.append(node);
                cards.childNodes[cards.childNodes.length - 1].innerHTML = card;
                console.dir(event);
                // ADD AN APPROPRIATE DATA TO LOCALSTORAGE
            });
          
        // deleting a card 
           let deleteChosenCards = document.querySelector('#deleteChosenCards');
           
           deleteChosenCards.addEventListener('click', () => {
             let allCards = document.querySelectorAll('.card');
              for(let i=0; i < allCards.length; i++) {
                if(allCards[i].children[2].checked === true) {
                  console.log(allCards[i])
                  cards.removeChild(allCards[i]);
                  // -- DELETE AN APPROPRIATE DATA FROM LOCALSTORAGE --
                }
              }
           });
  
  // Exit 
        let exitButton = document.getElementById('exit');
        exitButton.addEventListener('click', () => {
            authWindow.style.display = 'block';
        })
  
  
  
  
  
  