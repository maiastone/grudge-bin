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

function appendDOM(grudges) {
	grudges.map(function(grudge) {
		$('.grudge-container').append(`
			<ul>
			<li id=${grudge.id} class='offender' class='name'>${grudge.name}</li>
			<ul>`);
	});
};

function countOffenders() {
	axios.get('/api/grudges')
	.then(function (response) {
		$('.count-container').html(`Total offenders to date: ${response.data.length}`);
	})
};

function countUnforgiven() {
	axios.get('/api/grudges')
	.then(function (response) {
		let count = 0;
		for(let i=0; i<response.data.length; i++) {
			if (response.data[i].forgiven === false) {
				count++;
			}
		}
		$('.unforgiven-container').html(`The number of people still on the list: ${count}`);
	});
};

function countForgiven() {
	axios.get('/api/grudges')
	.then(function (response) {
		let count = 0;
		for(let i=0; i<response.data.length; i++) {
			if (response.data[i].forgiven === true) {
				count++;
			}
		}
		$('.forgiven-container').html(`The number of redeemed people: ${count}`);
	})
	.catch((error) => {
		console.log(error);
	});
};

function makeAllCounts() {
	countOffenders();
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
	$('.unique-grudge-container').append(`
		<h3>${response.data[0].name}</h3>
		<h3>${response.data[0].offense}</h3>
		<h3>${response.data[0].date}</h3>
		<button id=${response.data[0].id} class='forgive'>Forgive</button>
	`)
};

$('.unique-grudge-container').on('click', 'button', function(e) {
	let id = e.target.id
	axios.patch(`/api/grudges/${id}`)
  .then(function(response) {
		makeAllCounts();
	})
	.catch((error) => {
    console.log(error);
	})
})

$('.sort-name').on('click', function() {
	sortOffendersNames()
})
$('.sort-date').on('click', function() {
	sortOffendersDates()
})

function sortOffendersNames() {
	axios.get('/api/grudges')
	.then(function (response) {
		let sortedOffenders = response.data;
		sortedOffenders.sort(function (a, b) {
			var x = a.name.toLowerCase();
			var y = b.name.toLowerCase();
			if(x < y) return -1;
			if(x > y) return 1;
			return 0;
		})
		$('.grudge-container').html('');
		appendDOM(sortedOffenders);
	})
	.catch((error) => {
    console.log(error);
  });
};

function sortOffendersDates() {
	axios.get('/api/grudges')
	.then(function (response) {
		let sortedOffenders = response.data;
		sortedOffenders.sort(function (a, b) {
			var x = a.date;
			var y = b.date;
			if(x < y) return -1;
			if(x > y) return 1;
			return 0;
		})
		$('.grudge-container').html('');
		appendDOM(sortedOffenders);
	})
	.catch((error) => {
    console.log(error);
  });
};
