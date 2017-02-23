$(document).ready(function() {
	fetchGrudges();
	countOffenders();
	countUnforgiven();
});

function fetchGrudges() {
	axios.get('/api/grudges')
	.then(function (response) {
		appendDOM(response.data);
	})
	.catch(function(error) {
		console.log('Error receiving grudges');
	})
}

function countOffenders() {
	axios.get('/api/grudges')
	.then(function (response) {
		$('.count-container').html(`${response.data.length}`);
	})
}

function countUnforgiven() {
	axios.get('/api/grudges')
	.then(function (response) {
		let count = 0;
		let grudges = response.data
		for(let i=0; i<grudges.length; i++) {
			if (grudges[i].forgiven === false) {
				count++;
			}
			console.log(count);
		}
	})
}

function appendDOM(grudges) {
	grudges.map(function(grudge) {
		$('.grudge-container').append(`
			<button class='offender'>
				<h2 class='name'>${grudge.name}</h2>
			</button>`);
	});
}

$('.grudge-container').on('click', 'button', function() {
	axios.get(`/api/grudges/${id}`)
	.then((response) => {
		console.log(response);
	})
})

$('.submit').on('click', function(e) {
	e.preventDefault();
  const newGrudge = {
    name: $('.name-entry').val(),
    offense: $('.offense-entry').val()
  }
  postGrudge(newGrudge);
});

function postGrudge(newGrudge) {
  axios.post('/api/grudges', newGrudge)
  .then((response) => {
    appendNewGrudge(response);
		countOffenders();
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
}
