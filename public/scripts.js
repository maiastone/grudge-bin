$(document).ready(function() {
	fetchGrudges();
});

function fetchGrudges() {
	axios.get('/api/grudges')
	.then(function (response) {
		appendDOM(response.data);
		countOldOffenders();
	})
	.catch(function(error) {
		console.log('Error receiving grudges');
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
	console.log('hello');
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
		countNewOffender();
  })
  .catch((error) => {
    console.log(error);
  });

  function appendNewGrudge(response) {
    for (let i=0; i<response.data.length; i++) {
      if (newGrudge.name === response.data[i].name) {
        $('.grudge-container').append(`
          <h2 class='name'>${response.data[i].name}</h2>
        `);
      }
    }
  }
}

function countOldOffenders() {
	let count = $('h2').length
	$('.count-container').append(count)
}
