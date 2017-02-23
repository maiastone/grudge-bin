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

function countOffenders() {
	axios.get('/api/grudges')
	.then(function (response) {
		$('.count-container').html(`${response.data.length}`);
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
		$('.unforgiven-container').html(`${count}`);
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
		$('.forgiven-container').html(`${count}`);
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

function appendDOM(grudges) {
	grudges.map(function(grudge) {
		$('.grudge-container').append(`
			<button class='offender'>
				<h2 class='name'>${grudge.name}</h2>
			</button>`);
	});
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
          <button class='offender'>
						<h2 class='name'>${response.data[i].name}</h2>
					</button>
        `);
      }
    }
  }
};
