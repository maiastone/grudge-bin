$(document).ready(function() {
	fetchGrudges();
	makeAllCounts();
});

function fetchGrudges() {
	axios.get('/api/grudges')
	.then(function (response) {
		appendDOM(response.data);
	})
	.catch(function(error) {
		console.log('Error receiving grudges');
	})
};

function countGrudges() {
	axios.get('/api/grudges')
	.then(function (response) {
		$('.count-container').html(`Total offenders to date: ${response.data.length}`);
	})
};

function countUnforgiven() {
	axios.get('/api/grudges')
	.then(function (response) {
		let allGrudges = response.data;
		let count = countUnforgivenGrudges(allGrudges)
		$('.unforgiven-container').html(`The number of people still on the list: ${count}`);
	});
};

function countForgiven() {
	axios.get('/api/grudges')
	.then(function (response) {
		let allGrudges = response.data;
		let count = countForgivenGrudges(allGrudges)
		$('.forgiven-container').html(`The number of redeemed people: ${count}`);
	 })
	 .catch((error) => {
		console.log(error);
	 });
};

function makeAllCounts() {
	countGrudges();
	countUnforgiven();
	countForgiven();
};

$('.submit').on('click', function(e) {
	e.preventDefault();
  const newGrudge = {
    name: $('.name-entry').val(),
    offense: $('.offense-entry').val()
  };
  postGrudge(newGrudge);
	clearInputs();
});

function clearInputs() {
	$('.name-entry').val(''),
	$('.offense-entry').val('')
};

function postGrudge(newGrudge) {
  axios.post('/api/grudges', newGrudge)
  .then((response) => {
    appendNewGrudge(response);
		makeAllCounts();
  })
  .catch((error) => {
    console.log(error);
  });

  function appendNewGrudge(response) {
    for (let i=0; i<response.data.length; i++) {
      if (newGrudge.name === response.data[i].name) {
        $('.grudge-container').append(`
					<ul>
          <li id=${response.data[i].id} class='offender' class='name'>${response.data[i].name}</li>
					</ul>
        `);
      }
    }
  }
};

$('.grudge-container').on('click', 'li', function(e) {
	$('.unique-grudge-container').css('visibility', 'visible');
	let id = e.target.id;
	axios.get(`/api/grudges/${id}`)
	.then(function (response) {
		appendDetails(response)
	})
	.catch(function (error) {
		console.log(error);
	});
});

function appendDetails(response) {
	$('.unique-grudge-container').html('');
	$('.unique-grudge-container').append(renderGrudge(response));
};

$('.unique-grudge-container').on('click', '.forgive', function(e) {
	let id = e.target.id
	axios.patch(`/api/grudges/${id}`)
  .then(function(response) {
		makeAllCounts();
	})
	.catch((error) => {
    console.log(error);
	});
});

$('.sort-name').on('click', function() {
	sortGrudgesNames()
});

$('.sort-date').on('click', function() {
	sortGrudgesDates()
});

function sortGrudgesNames() {
	axios.get('/api/grudges')
	.then(function (response) {
		console.log(response);
		let unsortedGrudges = response.data;
		let sortedGrudges = sortNames(unsortedGrudges)
		appendDOM(sortedGrudges);
	})
	.catch((error) => {
    console.log(error);
  });
};

function sortGrudgesDates() {
	axios.get('/api/grudges')
	.then(function (response) {
		let unsortedGrudges = response.data;
		let sortedGrudges = sortDates(unsortedGrudges)
		appendDOM(sortedGrudges);
	})
	.catch((error) => {
    console.log(error);
  });
};
